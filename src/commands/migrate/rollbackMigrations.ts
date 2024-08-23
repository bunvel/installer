import path from "path";
import { DB } from "../../../database/Database";
import { logInfo, logSuccess } from "../../../utils/Helpers";

export async function rollbackMigrations() {
  try {
    await DB.setupDatabaseConnection();

    const latestBatch = await DB.table("migrations").max("batch");
    if (latestBatch) {
      const migrationsToRollback = await DB.table("migrations")
        .where("batch", "=", latestBatch)
        .select("migration")
        .get();

      for (const migration of migrationsToRollback) {
        const migrationPath = path.join(
          process.cwd(),
          "database/migrations",
          migration.migration
        );
        const migrationModule = await import(migrationPath);
        if (typeof migrationModule.down === "function") {
          await migrationModule.down();
          await DB.table("migrations")
            .where("migration", "=", migration.migration)
            .delete();
        }
      }
      logSuccess(`Rolled back batch ${latestBatch}.`);
    } else {
      logInfo("No migrations to rollback.");
    }
  } catch (error) {
    console.error("Error rolling back migrations:", error);
  } finally {
    await DB.close();
  }
}
