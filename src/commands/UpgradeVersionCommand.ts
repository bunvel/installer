import chalk from "chalk";
import { exec } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
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
      const latestVersion = await this.getLatestVersionFromNpm(
        "@bunvel/installer"
      );

      if (currentVersion === latestVersion) {
        console.log(
          `✅ You already have the latest version: ${chalk.green(
            currentVersion
          )}`
        );
        process.exit(0);
      }

      console.log(
        `⬆️  Upgrading from ${chalk.green(currentVersion)} to ${chalk.green(
          latestVersion
        )}...`
      );
      await this.runCommand("bun install -g @bunvel/installer@latest");
      console.log(
        `✅ Successfully upgraded to @bunvel/installer v${chalk.green(
          latestVersion
        )}`
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
      // Try multiple possible paths for global packages
      const { stdout: bunPath } = await execPromise("bun pm bin -g");
      const globalDir = path.dirname(bunPath.trim());

      // Possible paths based on different OS configurations
      const possiblePaths = [
        // Standard path mentioned by you
        path.join(
          globalDir,
          "install",
          "global",
          "node_modules",
          pkg,
          "package.json"
        ),
        // Direct node_modules path
        path.join(globalDir, "node_modules", pkg, "package.json"),
        // Linux/Mac path
        path.join(
          os.homedir(),
          ".bun",
          "install",
          "global",
          "node_modules",
          pkg,
          "package.json"
        ),
      ];

      for (const packageJsonPath of possiblePaths) {
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, "utf8")
          );
          return packageJson.version || "unknown";
        }
      }

      // If we reach here, try one more approach using "bun pm ls" (if available)
      try {
        const { stdout } = await execPromise(`bun pm ls ${pkg}`);
        const versionMatch = stdout.match(
          new RegExp(`${pkg}@(\\d+\\.\\d+\\.\\d+)`)
        );
        if (versionMatch && versionMatch[1]) {
          return versionMatch[1];
        }
      } catch {
        // Silent catch if bun pm ls doesn't work
      }

      return "not installed";
    } catch (error) {
      throw new Error(`Failed to fetch installed version of ${pkg}: ${error}`);
    }
  }

  private async getLatestVersionFromNpm(pkg: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(`https://registry.npmjs.org/${pkg}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data["dist-tags"].latest);
        })
        .catch((error) => {
          reject(error);
        });
    });
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
