import { writeFile } from "fs/promises";
import { logSuccess } from "../../../utils/Helpers";

export async function makeAddForeignKeyMigration(
  tableName: string,
  foreignKey: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0];
  const migrationName = `${timestamp}_add_${foreignKey}_foreign_to_${tableName}_table`;

  const migrationContent = `
  import { Schema, Blueprint } from "@atherjs/ather";
  
  /**
   * Run the migrations.
   *
   * This function adds a foreign key (${foreignKey}) to the ${tableName} table.
   *
   */
  export async function up() {
    await Schema.addForeignKey("${tableName}", "${foreignKey}", (table: Blueprint) => {
      table.integer("${foreignKey}").unsigned().references("id").inTable("referenced_table");
    });
  }
  
  /**
   * Reverse the migrations.
   *
   * This function drops the foreign key (${foreignKey}) from the ${tableName} table.
   *
   */
  export async function down() {
    await Schema.dropForeignKey("${tableName}", "${foreignKey}");
  }
  `;

  await writeFile(
    `database/migrations/${migrationName}.ts`,
    migrationContent.trim()
  );
  logSuccess(`Schema '${migrationName}' created successfully.`);
  process.exit(0);
}
