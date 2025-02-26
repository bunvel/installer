import { Command } from "../Command";

export default class UpgradeCommand extends Command {
  signature = "upgrade";
  description = "Upgrade Bunvel to the latest version";

  async handle(): Promise<void> {
    // const versionCommand = new VersionCommand();
    // await versionCommand.upgradePackage();
    process.exit(0);
  }
}
