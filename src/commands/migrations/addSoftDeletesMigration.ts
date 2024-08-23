import { Logger } from "@atherjs/ather";
import { writeFile } from "fs/promises";

export async function makeAddSoftDeletesMigration(tableName: string) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_add_soft_deletes_to_${tableName}_table`;

  const migrationContent = `
  import { Schema, Blueprint } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function adds soft deletes to the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.addSoftDeletes("${tableName}", (table: Blueprint) => {
      table.softDeletes();
    });
  }
  
  /**
   * Reverse the migrations.
   *
   * This function drops the soft deletes from the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.dropSoftDeletes("${tableName}");
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  Logger.success(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
