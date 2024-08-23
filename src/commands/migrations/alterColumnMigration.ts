import { writeFile } from "fs/promises";
import { logSuccess } from "../../../utils/Helpers";

export async function alterColumnMigration(
  tableName: string,
  columnName: string,
  newDataType: string,
  oldDataType: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_change_${columnName}_type_in_${tableName}_table`;

  const migrationContent = `
import { Schema, Blueprint } from "@atherjs/ather";

/**
 * Run the migrations.
 *
 * This function changes the data type of the ${columnName} column in the ${tableName} table.
 */
export async function up() {
  await Schema.alterColumn("${tableName}", (table: Blueprint) => {
    table.${newDataType}("${columnName}");
  });
}

/**
 * Reverse the migrations.
 *
 * This function reverts the ${columnName} column in the ${tableName} table to its original data type.
 */
export async function down() {
  await Schema.alterColumn("${tableName}", (table: Blueprint) => {
    table.${oldDataType}("${columnName}");
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
