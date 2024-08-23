import { Logger } from "@atherjs/ather";
import { writeFile } from "fs/promises";

export async function makeAddIndexMigration(
  tableName: string,
  columnName: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_add_index_to_${columnName}_on_${tableName}_table`;

  const migrationContent = `
  import { Schema } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function adds an index to the ${columnName} column on the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.addIndex("${tableName}", "${columnName}");
  }
  
  /**
   * Reverse the migrations.
   *
   * This function drops the index on the ${columnName} column from the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.dropIndex("${tableName}", "${columnName}");
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  Logger.success(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
