#!/usr/bin/env bun

import { Command } from "commander";
import CreateProjectCommand from "./src/commands/CreateProjectCommand";
import UpgradeCommand from "./src/commands/UpgradeVersionCommand";

async function main() {
  const program = new Command();
  const createProjectCommand = new CreateProjectCommand();
  const upgradeCommand = new UpgradeCommand();

  // Command 1: Create Project
  program
    .command("create")
    .description("Create a new Ather project")
    .option("-n, --name <name>", "Project name")
    .action((options) => {
      createProjectCommand.handle(options.name);
    });

  // Command 2: Generate Config
  program
    .command("config")
    .description("Generate configuration file")
    .action(() => {
      upgradeCommand.handle();
    });

  program.parse(process.argv);

  // If no command is provided, show help
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main().catch(console.error);
