import { Command as CommanderCommand } from "commander";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { ModelOptions } from "../../type";
import { logSuccess } from "../../utils/Helpers";
import { pluralize } from "../../utils/pluralize";
import { Command } from "../Command";
import MakeControllerCommand from "./MakeControllerCommand";
import MakeFormRequestCommand from "./MakeFormRequestCommand";
import { makeCreateTableMigration } from "./migrations/createTableMigration";

export default class MakeModelCommand extends Command {
  signature = "make:model <name>";
  description = "Create a new model with optional migration and controller";

  async handle(name: string, options?: ModelOptions): Promise<void> {
    const tableName = pluralize(name).toLowerCase();

    // Read the model stub file
    const stubPath = join(__dirname, "stubs", "model.stub");
    let modelContent = await readFile(stubPath, "utf-8");

    // Replace placeholders with actual values
    modelContent = modelContent
      .replace(/{{name}}/g, name)
      .replace(/{{tableName}}/g, tableName);

    // Write the model file to the appropriate location
    await writeFile(`app/Models/${name}.ts`, modelContent.trim());
    logSuccess(`Model '${name}' created successfully.`);

    // Optionally create migration
    if (options?.migration) {
      await makeCreateTableMigration(tableName);
    }

    // Optionally create controller
    if (options?.controller) {
      const controllerCommand = new MakeControllerCommand();
      await controllerCommand.handle(name, { resource: options.resource });
    }

    // Optionally create request class
    if (options?.request) {
      const formRequestCommand = new MakeFormRequestCommand();
      await formRequestCommand.handle(name);
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    command
      .option("-m, --migration", "Create a corresponding migration file")
      .option("-c, --controller", "Create a corresponding controller")
      .option("-r, --resource", "Generate a resource controller")
      .option("-R, --request", "Create a corresponding request class");
  }
}
