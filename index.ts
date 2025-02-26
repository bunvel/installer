#!/usr/bin/env bun

import chalk from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import CreateProjectCommand from "./src/commands/CreateProjectCommand";
import UpgradeCommand from "./src/commands/UpgradeVersionCommand";

async function main() {
  const program = new Command();
  const createProjectCommand = new CreateProjectCommand();
  const upgradeCommand = new UpgradeCommand();

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

  // 📖 Global Help
  program.addHelpText(
    "after",
    chalk.gray(`
Examples:
  ${chalk.green("bunvel create my-app")}    Create a new project
  ${chalk.green("bunvel upgrade")}         Upgrade to the latest version

Docs: https://bunvel.dev
`)
  );

  program.parse(process.argv);

  // 📢 Show help if no args are provided
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main().catch(console.error);
