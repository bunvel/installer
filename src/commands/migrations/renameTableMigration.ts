import { writeFile } from "fs/promises";
import { logSuccess } from "../../../utils/Helpers";

export async function makeRenameTableMigration(
  oldTableName: string,
  newTableName: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_rename_${oldTableName}_to_${newTableName}_table`;

  const migrationContent = `
  import { Schema } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function renames the ${oldTableName} table to ${newTableName}.
   *
   */
  export async function up() {
    await Schema.renameTable("${oldTableName}", "${newTableName}");
  }
  
  /**
   * Reverse the migrations.
   *
   * This function renames the ${newTableName} table back to ${oldTableName}.
   *
   */
  export async function down() {
    await Schema.renameTable("${newTableName}", "${oldTableName}");
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  logSuccess(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
