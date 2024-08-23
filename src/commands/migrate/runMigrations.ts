import { DB, Logger } from "@atherjs/ather";
import fs from "fs/promises";
import path from "path";

import { installMigrations } from "./installMigrations";

export async function runMigrations() {
  try {
    await DB.setupDatabaseConnection();

    const migrationFiles = await fs.readdir(
      path.join(process.cwd(), "database/migrations")
    );

    const sortedMigrations = migrationFiles
      .filter((file) => file.endsWith(".ts"))
      .sort((a, b) => {
        const timestampA = parseInt(a.split("_")[0]);
        const timestampB = parseInt(b.split("_")[0]);
        return timestampA - timestampB;
      });

    await installMigrations();

    // Retrieve all migration records from the database in a single query
    const existingMigrations = await DB.table("migrations")
      .select("migration")
      .get();

    // Create a set of already run migrations for quick lookup
    const runMigrations = new Set(
      existingMigrations.map((record: any) => record.migration)
    );

    // Get the latest batch number and increment it for the new batch
    const latestBatch = await DB.table("migrations").max("batch");
    const nextBatch = (latestBatch || 0) + 1;

    for (const migrationFile of sortedMigrations) {
      // Check if the 'up' method exists
      const migrationPath = path.join(
        process.cwd(),
        "database/migrations",
        migrationFile
      );
      const migration = await import(migrationPath);

      if (typeof migration.up !== "function") {
        continue;
      }

      // Check if the migration has already been run
      if (!runMigrations.has(migrationFile)) {
        await migration.up();
        await DB.table("migrations").insert([
          {
            migration: migrationFile,
            batch: nextBatch,
          },
        ]);
        console.log(`Completed migration: ${migrationFile}`);
      }
    }

    Logger.success("All migrations completed successfully.");
  } catch (error) {
    console.error("Error running migrations:", error);
  } finally {
    await DB.close();
  }
}
