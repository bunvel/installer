import { Logger } from "@atherjs/ather";
import { Command } from "../Command";
import { refreshMigrations } from "./migrate/refreshMigrations";

export default class RefreshMigrationCommand extends Command {
  signature = "migrate:refresh";
  description = "Refresh all the migrations";

  async handle(): Promise<void> {
    try {
      await refreshMigrations();
      process.exit(0);
    } catch (error) {
      Logger.error("Error refreshing migrations:", error);
    }
  }
}
