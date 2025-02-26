import { exec } from "child_process";
import { Command } from "../Command";

export default class UpgradeCommand extends Command {
  signature = "upgrade";
  description = "Upgrade Bunvel to the latest version";

  async handle(): Promise<void> {
    try {
      // Check if 'bun' is installed
      await this.checkBunInstalled();

      console.log("🚀 Upgrading @bunvel/installer to the latest version...");
      await this.runCommand("bun update --latest @bunvel/installer");

      console.log("✅ Bunvel upgraded successfully!");
    } catch (error) {
      console.error("❌ Error during upgrade:", error);
      process.exit(1);
    }

    process.exit(0);
  }

  private async checkBunInstalled(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec("bun --version", (error) => {
        if (error) {
          reject("Bun is not installed. Please install it from https://bun.sh");
        } else {
          resolve();
        }
      });
    });
  }

  private async runCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(stderr || error.message);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });
  }
}
