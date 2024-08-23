import { Logger } from "@atherjs/ather";
import { Command, CommanderCommand } from "../Command";
import { resetMigrations } from "./migrate/resetMigrations";

export default class ResetMigrationCommand extends Command {
  signature = "migrate:reset";
  description = "Roll back all migrations";

  async handle(): Promise<void> {
    try {
      await resetMigrations();
      process.exit(0);
    } catch (error) {
      Logger.error("Error resetting migrations:", error);
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    // No additional options required for this command
  }
}
