// src/console/CommandLoader.ts
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { Command } from "./Command";

export class CommandLoader {
  static async load(commandsPath: string): Promise<Command[]> {
    const commands: Command[] = [];

    if (!existsSync(commandsPath)) {
      console.log(`Commands directory does not exist: ${commandsPath}`);
      return commands;
    }

    const files = readdirSync(commandsPath);

    for (const file of files) {
      if (file.endsWith(".ts") || file.endsWith(".js")) {
        const filePath = join(commandsPath, file);

        try {
          const module = await import(filePath);
          const CommandClass = module.default;

          if (
            typeof CommandClass === "function" &&
            CommandClass.prototype instanceof Command
          ) {
            const command = new CommandClass();
            commands.push(command);
          } else {
            console.log(`File ${file} does not export a valid Command class`);
          }
        } catch (error) {
          console.error(`Error loading command from ${file}:`, error);
        }
      }
    }

    return commands;
  }
}
