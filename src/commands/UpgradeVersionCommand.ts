import { Command } from "../Command";
import VersionCommand from "./GetVersionCommand";

export default class UpgradeCommand extends Command {
  signature = "upgrade";
  description = "Upgrade Ather.js to the latest version";

  async handle(): Promise<void> {
    const versionCommand = new VersionCommand();
    await versionCommand.upgradePackage();
    process.exit(0);
  }
}
