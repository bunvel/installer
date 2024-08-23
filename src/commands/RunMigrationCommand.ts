import { Logger } from "@atherjs/ather";
import { Command, CommanderCommand } from "../Command";
import { runMigrations } from "./migrate/runMigrations";

export default class RunMigrationsCommand extends Command {
  signature = "migrate:run";
  description = "Run all pending migrations";

  async handle(): Promise<void> {
    try {
      await runMigrations();
      process.exit(0);
    } catch (error) {
      Logger.error("Error running migrations:", error);
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    // No additional options required for this command
  }
}
