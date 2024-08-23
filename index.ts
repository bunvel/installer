#!/usr/bin/env bun

import { Command } from "commander";
import { join } from "path";
import { CommandLoader } from "./src/CommandLoader";

async function main() {
  const program = new Command();

  // Load built-in commands
  const builtInCommandsPath = join(__dirname, "src", "console", "commands");
  const builtInCommands = await CommandLoader.load(builtInCommandsPath);

  // Load user-defined commands
  // const userCommandsPath = join(process.cwd(), "commands");
  // const userCommands = await CommandLoader.load(userCommandsPath);

  // Configure all commands
  [...builtInCommands].forEach((command) => {
    command.configure(program);
  });

  program.parse(process.argv);

  // If no command is provided, show help
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main().catch(console.error);
