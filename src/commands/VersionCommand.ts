import chalk from "chalk";
import { exec } from "child_process";
import os from "os";
import path from "path";
import { promisify } from "util";
import { Command } from "../Command";
import { PACKAGE_NAME } from "../utils/constant";

const execPromise = promisify(exec);

export class VersionCommand extends Command {
  signature = "version";
  description = "Display the current Bunvel version";

  async handle(): Promise<void> {
    try {
      await this.checkBunInstalled();

      const currentVersion = await this.getInstalledVersion(PACKAGE_NAME);
      console.log(`Bunvel version: ${chalk.green(currentVersion)}`);
    } catch (error) {
      console.error("❌ Error checking version:", error);
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
        if (await Bun.file(packageJsonPath).exists()) {
          const packageJson = await Bun.file(packageJsonPath).json();
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
}
