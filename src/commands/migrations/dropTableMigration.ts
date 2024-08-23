import { Logger } from "@atherjs/ather";
import { writeFile } from "fs/promises";

export async function makeDropTableMigration(tableName: string) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_drop_${tableName}_table`;

  const migrationContent = `
  import { Schema, Blueprint } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function drops the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.dropTable("${tableName}");
  }
  
  /**
   * Reverse the migrations.
   *
   * This function recreates the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.createTable("${tableName}", (table: Blueprint) => {
      table.increments("id");
    });
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  Logger.success(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
