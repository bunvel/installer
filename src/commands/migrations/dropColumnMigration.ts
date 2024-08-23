import { writeFile } from "fs/promises";
import { logSuccess } from "../../../utils/Helpers";

export async function makeDropColumnMigration(
  tableName: string,
  columnName: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_drop_${columnName}_from_${tableName}_table`;

  const migrationContent = `
  import { Schema, Blueprint } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function drops the ${columnName} column from the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.dropColumn("${tableName}", "${columnName}");
  }
  
  /**
   * Reverse the migrations.
   *
   * This function adds the ${columnName} column back to the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.addColumn("${tableName}", (table: Blueprint) => {
      table.string("${columnName}");
    });
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  logSuccess(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
