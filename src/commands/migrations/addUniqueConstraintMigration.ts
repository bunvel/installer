import { writeFile } from "fs/promises";
import { logSuccess } from "../../../utils/Helpers";

export async function makeAddUniqueConstraintMigration(
  tableName: string,
  columnName: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_add_unique_constraint_to_${columnName}_on_${tableName}_table`;

  const migrationContent = `
  import { Schema } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function adds a unique constraint to the ${columnName} column on the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.addUniqueConstraint("${tableName}", "${columnName}");
  }
  
  /**
   * Reverse the migrations.
   *
   * This function drops the unique constraint from the ${columnName} column on the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.dropUniqueConstraint("${tableName}", "${columnName}");
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  logSuccess(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
