import { exec } from "child_process";
import { promisify } from "util";
import { Command } from "../Command";

const execPromise = promisify(exec);

export default class UpgradeCommand extends Command {
  signature = "upgrade";
  description = "Upgrade Bunvel to the latest version";

  async handle(): Promise<void> {
    try {
      await this.checkBunInstalled();

      console.log("🚀 Checking for updates to @bunvel/installer...");

      const currentVersion = await this.getInstalledVersion(
        "@bunvel/installer"
      );
      const latestVersion = await this.getLatestVersion("@bunvel/installer");

      if (currentVersion === latestVersion) {
        console.log(
          `✅ You already have the latest version: ${currentVersion}`
        );
        process.exit(0);
      }

      console.log(
        `⬆️  Upgrading from ${currentVersion} to ${latestVersion}...`
      );
      await this.runCommand("bun update --latest @bunvel/installer");
      console.log(
        `✅ Successfully upgraded to @bunvel/installer v${latestVersion}`
      );
    } catch (error) {
      console.error("❌ Error during upgrade:", error);
      process.exit(1);
    }
  }

  private async checkBunInstalled(): Promise<void> {
    try {
      await execPromise("bun --version");
    } catch {
      throw new Error(
        "Bun is not installed. Please install it from https://bun.sh"
      );
    }
  }

  private async getInstalledVersion(pkg: string): Promise<string> {
    try {
      const { stdout } = await execPromise(`bun pm ls ${pkg} --json`);
      const result = JSON.parse(stdout);
      return result?.dependencies?.[pkg]?.version || "unknown";
    } catch {
      throw new Error(`Failed to fetch installed version of ${pkg}`);
    }
  }

  private async getLatestVersion(pkg: string): Promise<string> {
    try {
      const { stdout } = await execPromise(`bun pm info ${pkg} --json`);
      const result = JSON.parse(stdout);
      return result.version || "unknown";
    } catch {
      throw new Error(`Failed to fetch latest version of ${pkg}`);
    }
  }

  private async runCommand(command: string): Promise<void> {
    try {
      const { stdout, stderr } = await execPromise(command);
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    } catch (error) {
      throw new Error(`Command failed: ${command}`);
    }
  }
}
