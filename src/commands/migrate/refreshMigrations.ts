import fs from "fs/promises";
import path from "path";
import { DB } from "../../../database/Database";
import { logSuccess } from "../../../utils/Helpers";
import { runMigrations } from "./runMigrations";

export async function refreshMigrations() {
  try {
    await DB.setupDatabaseConnection();

    // Disable foreign key checks (specific to MySQL)
    await DB.query("SET FOREIGN_KEY_CHECKS = 0");

    // Get all migration files
    const migrationFiles = await fs.readdir(
      path.join(process.cwd(), "database/migrations")
    );

    // Sort migration files based on dependency order if needed
    // For now, we assume they are in the correct order

    // Drop all tables
    for (const file of migrationFiles.reverse()) {
      // Reverse to drop in correct order
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
    }

    // Re-enable foreign key checks
    await DB.query("SET FOREIGN_KEY_CHECKS = 1");

    // Delete entries from the migrations table
    await DB.query("DELETE FROM migrations");

    // Re-run all migrations
    await runMigrations();

    logSuccess("Refreshed all migrations");
  } catch (error) {
    console.error("Error performing fresh migration:", error);
  } finally {
    await DB.close();
  }
}
