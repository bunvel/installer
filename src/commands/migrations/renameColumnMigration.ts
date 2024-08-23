import { writeFile } from "fs/promises";
import { logSuccess } from "../../../utils/Helpers";

export async function makeRenameColumnMigration(
  tableName: string,
  oldColumnName: string,
  newColumnName: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_rename_${tableName}_to_${oldColumnName}_in_${newColumnName}_table`;

  const migrationContent = `
  import { Schema } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function renames the ${oldColumnName} column to ${newColumnName} in the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.renameColumn("${tableName}", "${oldColumnName}", "${newColumnName}");
  }
  
  /**
   * Reverse the migrations.
   *
   * This function renames the ${newColumnName} column back to ${oldColumnName} in the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.renameColumn("${tableName}", "${newColumnName}", "${oldColumnName}");
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  logSuccess(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
