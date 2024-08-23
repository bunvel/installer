import { Logger } from "@atherjs/ather";
import { Command, CommanderCommand } from "../Command";
import { freshMigrations } from "./migrate/freshMigrations";

export default class FreshMigrationsCommand extends Command {
  signature = "migrate:fresh";
  description = "Drop all tables and re-run all migrations";

  async handle(): Promise<void> {
    try {
      await freshMigrations();
      process.exit(0);
    } catch (error) {
      Logger.error("Error refreshing migrations:", error);
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    // No additional options required for this command
  }
}
