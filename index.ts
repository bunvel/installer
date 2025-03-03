#!/usr/bin/env bun

import chalk from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import CreateProjectCommand from "./src/commands/CreateProjectCommand";
import UpgradeCommand from "./src/commands/UpgradeVersionCommand";
import { VersionCommand } from "./src/commands/VersionCommand";

async function main() {
  const program = new Command();
  const createProjectCommand = new CreateProjectCommand();
  const upgradeCommand = new UpgradeCommand();
  const versionCommand = new VersionCommand();

  // 🌟 Display Welcome Banner
  console.log(
    chalk.blueBright(
      figlet.textSync("Bunvel", {
        font: "Big",
        horizontalLayout: "fitted",
      })
    )
  );

  console.log(chalk.cyan("🚀 Fast. Minimal. Bun-powered framework.\n"));

  // 📦 Command: Create Project
  program
    .command("create <name>")
    .description("✨ Create a new Bunvel project")
    .action((name) => {
      createProjectCommand.handle(name);
    });

  // ⬆️ Command: Upgrade Project
  program
    .command("upgrade")
    .description("🔼 Upgrade your Bunvel installation")
    .action(() => {
      upgradeCommand.handle();
    });

  // 📌 Command: Version
  program
    .command("version")
    .description("📌 Display the current Bunvel version")
    .action(() => {
      versionCommand.handle();
    });

  // 📖 Global Help
  program.addHelpText(
    "after",
    chalk.gray(`
Examples:
  ${chalk.green("bunvel create my-app")}    Create a new project
  ${chalk.green("bunvel upgrade")}          Upgrade to the latest version
  ${chalk.green("bunvel version")}          Display the current version

`)
  );

  program.parse(process.argv);

  // 📢 Show help if no args are provided
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main().catch(console.error);
