import fs from "fs/promises";
import path from "path";
import { DB } from "../../../database/Database";
import { logSuccess } from "../../../utils/Helpers";
export async function resetMigrations() {
  try {
    await DB.setupDatabaseConnection();

    const migrationFiles = await fs.readdir(
      path.join(process.cwd(), "database/migrations")
    );
    for (const file of migrationFiles) {
      const migrationPath = path.join(
        process.cwd(),
        "database/migrations",
        file
      );
      const migration = await import(migrationPath);
      if (
        typeof migration.down === "function" &&
        migration.down.toString().includes("dropTable")
      ) {
        await migration.down();
      }

      // Delete entries from the migrations table
      await DB.query("DELETE FROM migrations");

      logSuccess("Reset all migrations");
    }
  } catch (error) {
    console.error("Error resetting migrations:", error);
  } finally {
    await DB.close();
  }
}
