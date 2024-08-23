import { confirm, outro, spinner } from "@clack/prompts";
import { spawn } from "bun";
import chalk from "chalk";
import { Command as CommanderCommand } from "commander";
import figlet from "figlet";
import fs from "fs/promises";
import fetch from "node-fetch";
import path from "path";
import { Command } from "../Command";

const packageName = "@atherjs/ather";

export default class VersionCommand extends Command {
  signature = "version";
  description = "Display the current version and check for updates";

  async handle(options: { upgrade?: boolean }): Promise<void> {
    console.log(
      chalk.green(
        figlet.textSync("AtherJs", {
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    );

    const s = spinner();
    s.start("🔍 Checking version...");

    const currentVersion = await this.getCurrentVersion();
    const latestVersion = await this.getLatestVersion();
    s.stop("✅ Version check complete!");

    console.log(chalk.cyan(`📦 Current version: ${currentVersion}`));
    console.log(chalk.cyan(`🌐 Latest version: ${latestVersion}`));

    if (currentVersion !== latestVersion) {
      const shouldUpgrade = await confirm({
        message: `🚀 A new version (${latestVersion}) is available! Would you like to upgrade?`,
        initialValue: true,
      });

      if (shouldUpgrade) {
        await this.upgradePackage();
      } else {
        outro(
          chalk.yellow(
            "⚠️ You chose not to upgrade. Run 'ather upgrade' later if you change your mind."
          )
        );
      }
    } else {
      outro(chalk.green("🎉 You are using the latest version!"));
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    command
      .option("-u, --upgrade", "Upgrade to the latest version if available")
      .alias("v") // Alias to support `ather -v`
      .action((options) => this.handle(options));
  }

  private async getCurrentVersion(): Promise<string> {
    try {
      const homeDir = process.env.HOME || process.env.USERPROFILE;
      if (!homeDir) {
        throw new Error("❌ Unable to determine home directory.");
      }

      const possiblePaths = [
        path.join(
          homeDir,
          ".bun",
          "install",
          "global",
          "node_modules",
          packageName,
          "package.json"
        ),
        path.join(
          homeDir,
          ".bun",
          "install",
          "global",
          packageName,
          "package.json"
        ),
        path.join(homeDir, ".bun", "bin", packageName, "package.json"),
      ];

      for (const possiblePath of possiblePaths) {
        try {
          const packageJson = JSON.parse(
            await fs.readFile(possiblePath, "utf8")
          );
          return packageJson.version;
        } catch (error) {
          // Continue to the next path if this one fails
        }
      }
    } catch (error) {
      console.error(chalk.red("💥 Error reading package.json:"), error);
    }

    return "unknown";
  }

  private async getLatestVersion(): Promise<string> {
    try {
      const response = await fetch(`https://registry.npmjs.org/${packageName}`);
      const data = (await response.json()) as {
        "dist-tags": { latest: string };
      };
      return data["dist-tags"].latest;
    } catch (error) {
      console.error(chalk.red("💥 Error fetching latest version:"), error);
      return "unknown";
    }
  }

  public async upgradePackage(): Promise<void> {
    const latestVersion = await this.getLatestVersion();

    const maxRetries = 3;
    let attempt = 0;

    const s = spinner();

    while (attempt < maxRetries) {
      try {
        s.start(`⬆️ Upgrading to version ${latestVersion}...`);

        console.log(chalk.blue("🔄 Installing @atherjs/ather..."));
        const proc = spawn([
          "bun",
          "install",
          "-g",
          `@atherjs/ather@${latestVersion}`,
        ]);

        const text = await new Response(proc.stdout).text();
        console.log(text);

        await proc.exited;
        s.stop("✅ Upgrade complete!");

        console.log(
          chalk.green(
            `🎉 @atherjs/ather has been successfully upgraded to version ${latestVersion}.`
          )
        );
        return; // Exit if successful
      } catch (error) {
        const err = error as Error;
        if (err.message.includes("EBUSY")) {
          console.error(
            chalk.yellow(
              `⚠️ Attempt ${attempt + 1}: EBUSY error encountered. Retrying...`
            )
          );
          attempt++;
          // Wait a moment before retrying
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          s.stop();
          console.error(chalk.red("💥 Error during upgrade:"), error);
          break;
        }
      }
    }

    if (attempt === maxRetries) {
      console.error(
        chalk.red(
          "❌ Failed to upgrade @atherjs/ather after multiple attempts. Please close any open processes that might be using the files and try again."
        )
      );
    }
  }
}
