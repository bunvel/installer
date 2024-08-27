import { Command } from "../Command";
import { statusMigrations } from "./migrate/statusMigrations";

export default class StatusMigrationCommand extends Command {
  signature = "migrate:status";
  description = "Check the status of migrations";

  async handle(): Promise<void> {
    await statusMigrations();
    process.exit(0);
  }
}
