import { input, select } from "@inquirer/prompts";
import { Command as CommanderCommand } from "commander";
import { Command } from "../Command";
import { makeAddColumnMigration } from "./migrations/addColumnMigration";
import { makeAddForeignKeyMigration } from "./migrations/addForeignKeyMigration";
import { makeAddIndexMigration } from "./migrations/addIndexMigration";
import { makeAddSoftDeletesMigration } from "./migrations/addSoftDeletesMigration";
import { makeAddTimestampsMigration } from "./migrations/addTimestampsMigration";
import { makeAddUniqueConstraintMigration } from "./migrations/addUniqueConstraintMigration";
import { alterColumnMigration } from "./migrations/alterColumnMigration";
import { makeCreateTableMigration } from "./migrations/createTableMigration";
import { makeDropColumnMigration } from "./migrations/dropColumnMigration";
import { makeDropTableMigration } from "./migrations/dropTableMigration";
import { makeRenameColumnMigration } from "./migrations/renameColumnMigration";
import { makeRenameTableMigration } from "./migrations/renameTableMigration";

type MigrationAction =
  | "create_table"
  | "drop_table"
  | "add_column"
  | "drop_column"
  | "rename_column"
  | "alter_column"
  | "rename_table"
  | "add_index"
  | "add_foreign_key"
  | "add_unique_constraint"
  | "add_timestamps"
  | "add_soft_deletes";

export default class MakeMigrationCommand extends Command {
  signature = "make:migration <tableName>";
  description = "Create a new migration for a specific table";

  async handle(tableName: string): Promise<void> {
    if (!tableName) {
      throw new Error("Table name is required.");
    }

    const action = await select({
      message: "Select the migration action",
      choices: [
        { name: "Create Table", value: "create_table" },
        { name: "Drop Table", value: "drop_table" },
        { name: "Add Column", value: "add_column" },
        { name: "Drop Column", value: "drop_column" },
        { name: "Rename Column", value: "rename_column" },
        { name: "Alter Column", value: "alter_column" },
        { name: "Rename Table", value: "rename_table" },
        { name: "Add Index", value: "add_index" },
        { name: "Add Foreign Key", value: "add_foreign_key" },
        { name: "Add Unique Constraint", value: "add_unique_constraint" },
        { name: "Add Timestamps", value: "add_timestamps" },
        { name: "Add Soft Deletes", value: "add_soft_deletes" },
      ],
    });

    const migrationActions: Record<MigrationAction, () => Promise<void>> = {
      create_table: async () => await makeCreateTableMigration(tableName),
      drop_table: async () => await makeDropTableMigration(tableName),
      add_column: async () => {
        const columnName = await input({ message: "Enter the column name:" });
        const dataType = await input({
          message: "Enter the column type:",
          default: "string",
        });
        await makeAddColumnMigration(tableName, columnName, dataType);
      },
      drop_column: async () => {
        const columnName = await input({ message: "Enter the column name:" });
        await makeDropColumnMigration(tableName, columnName);
      },
      rename_column: async () => {
        const oldColumnName = await input({
          message: "Enter the old column name:",
        });
        const newColumnName = await input({
          message: "Enter the new column name:",
        });
        await makeRenameColumnMigration(
          tableName,
          oldColumnName,
          newColumnName
        );
      },
      alter_column: async () => {
        const columnName = await input({ message: "Enter the column name:" });
        const newDataType = await input({
          message: "Enter the new data type:",
          default: "string",
        });
        const oldDataType = await input({
          message: "Enter the old data type:",
          default: "string",
        });
        await alterColumnMigration(
          tableName,
          columnName,
          newDataType,
          oldDataType
        );
      },
      rename_table: async () => {
        const newTableName = await input({
          message: "Enter the new table name:",
        });
        await makeRenameTableMigration(tableName, newTableName);
      },
      add_index: async () => {
        const columnName = await input({
          message: "Enter the column name to index:",
        });
        await makeAddIndexMigration(tableName, columnName);
      },
      add_foreign_key: async () => {
        const columnName = await input({
          message: "Enter the column name for the foreign key:",
        });
        await makeAddForeignKeyMigration(tableName, columnName);
      },
      add_unique_constraint: async () => {
        const columnName = await input({
          message: "Enter the column name for the unique constraint:",
        });
        await makeAddUniqueConstraintMigration(tableName, columnName);
      },
      add_timestamps: async () => await makeAddTimestampsMigration(tableName),
      add_soft_deletes: async () =>
        await makeAddSoftDeletesMigration(tableName),
    };

    if (migrationActions[action as MigrationAction]) {
      await migrationActions[action as MigrationAction]();
    } else {
      throw new Error(`Unknown action: ${action}`);
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    // Additional configurations for the command if needed
  }
}
