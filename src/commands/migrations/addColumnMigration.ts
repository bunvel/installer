import { Logger } from "@atherjs/ather";
import { writeFile } from "fs/promises";

export async function makeAddColumnMigration(
  tableName: string,
  columnName: string,
  dataType: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_add_${columnName}_to_${tableName}_table`;

  const migrationContent = `
  import { Schema, Blueprint } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function adds the ${columnName} column to the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.addColumn("${tableName}", (table: Blueprint) => {
      table.${dataType}("${columnName}");
    });
  }
  
  /**
   * Reverse the migrations.
   *
   * This function drops the ${columnName} column from the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.dropColumn("${tableName}", "${columnName}");
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  Logger.success(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
