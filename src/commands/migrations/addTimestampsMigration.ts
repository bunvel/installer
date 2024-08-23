import { Logger } from "@atherjs/ather";
import { writeFile } from "fs/promises";

export async function makeAddTimestampsMigration(tableName: string) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_add_timestamps_to_${tableName}_table`;

  const migrationContent = `
  import { Schema, Blueprint } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function adds timestamps to the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.addTimestamps("${tableName}", (table: Blueprint) => {
      table.timestamps();
    });
  }
  
  /**
   * Reverse the migrations.
   *
   * This function drops the timestamps from the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.dropTimestamps("${tableName}");
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  Logger.success(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
