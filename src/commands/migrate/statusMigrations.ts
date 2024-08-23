import chalk from "chalk";
import fs from "fs/promises";
import { RowDataPacket } from "mysql2";
import path from "path";
import { DB } from "../../../database/Database";
import { DatabaseException } from "../../../Exception";
import { logError } from "../../../utils/Helpers";

export async function statusMigrations(): Promise<void> {
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

    const res = await DB.query(`SHOW TABLES LIKE 'migrations'`);

    if (res.length < 1) {
      console.log("No migrations found.");
      throw new DatabaseException("Table not found.");
    } else {
      const existingMigrations = await DB.table("migrations")
        .select("migration", "batch")
        .get();

      const runMigrations = new Set(
        existingMigrations.map((record: any) => record.migration)
      );

      const migrationNameWidth = 80; // Fixed width for migration name
      const batchNumberWidth = 5; // Fixed width for batch number
      const statusWidth = 10; // Fixed width for status

      // Print migration status in a tabular format
      console.log("\nMigration Status:");
      const borderLine = `+${"-".repeat(batchNumberWidth + 2)}+${"-".repeat(
        migrationNameWidth + 2
      )}+${"-".repeat(statusWidth + 2)}+`;
      console.log(borderLine);
      console.log(
        `| Batch${" ".repeat(
          batchNumberWidth - 5
        )} | Migration Name${" ".repeat(
          migrationNameWidth - 14
        )} | Status${" ".repeat(statusWidth - 6)} |`
      );
      console.log(borderLine);

      sortedMigrations.forEach((migrationFile) => {
        const migrationName = migrationFile.padEnd(migrationNameWidth, " ");
        const isMigrated = runMigrations.has(migrationFile);
        const migrationStatus = isMigrated
          ? chalk.green("Migrated")
          : chalk.red("Pending");
        const status = migrationStatus.padEnd(
          statusWidth + (migrationStatus.length - (isMigrated ? 8 : 7)), // Adjusting the length for chalk colors
          " "
        );
        const batchNumber = isMigrated
          ? existingMigrations
              .find((m: RowDataPacket) => m.migration === migrationFile)
              ?.batch.toString() || "N/A"
          : "N/A";

        console.log(
          `| ${batchNumber.padStart(
            batchNumberWidth,
            " "
          )} | ${migrationName} | ${status} |`
        );
      });

      console.log(borderLine);
    }
  } catch (error) {
    logError(`Error retrieving migration status: ${error}`);
  } finally {
    await DB.close();
  }
}
