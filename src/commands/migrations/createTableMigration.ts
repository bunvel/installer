import { Logger } from "@atherjs/ather";
import { writeFile } from "fs/promises";

export async function makeCreateTableMigration(tableName: string) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_create_${tableName}_table`;

  const migrationContent = `
import { Schema, Blueprint } from "@atherjs/ather";

/**
 * Run the migrations.
 *
 * This function creates the ${tableName} table.
 *
 */
export async function up() {
  await Schema.createTable("${tableName}", (table: Blueprint) => {
    table.increments("id");
    table.timestamps()
  });
}

/**
 * Reverse the migrations.
 *
 * This function drops the ${tableName} table.
 *
 */
export async function down() {
  await Schema.dropTable("${tableName}");
}
`;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  Logger.success(`Schema '${migrationName}' created successfully.`);
}
