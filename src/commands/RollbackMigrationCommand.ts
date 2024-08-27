import { Logger } from "@atherjs/ather";
import { Command } from "../Command";
import { rollbackMigrations } from "./migrate/rollbackMigrations";

export default class RollbackMigrationsCommand extends Command {
  signature = "migrate:rollback";
  description = "Roll back the latest batch of migrations";

  async handle(): Promise<void> {
    try {
      await rollbackMigrations();
      process.exit(0);
    } catch (error) {
      Logger.error("Error rolling back migrations:", error);
    }
  }
}
