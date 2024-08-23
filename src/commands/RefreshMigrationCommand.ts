import { Command, CommanderCommand } from "../Command";
import { refreshMigrations } from "./migrate/refreshMigrations";

export default class RefreshMigrationCommand extends Command {
  signature = "migrate:refresh";
  description = "Refresh all the migrations";

  async handle(): Promise<void> {
    try {
      await refreshMigrations();
      process.exit(0);
    } catch (error) {
      console.error("Error refreshing migrations:", error);
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    // No additional options required for this command
  }
}
