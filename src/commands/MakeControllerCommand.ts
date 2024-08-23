import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { logSuccess } from "../../utils/Helpers";
import { Command, CommanderCommand } from "../Command";
import MakeFormRequestCommand from "./MakeFormRequestCommand"; // Import the request command

export default class MakeControllerCommand extends Command {
  signature = "make:controller <name>";
  description = "Create a new controller with an optional form request class";

  async handle(
    name: string,
    options: { resource?: boolean; request?: boolean }
  ): Promise<void> {
    const stubPath = join(
      __dirname,
      "stubs",
      options.resource ? "resourceController.stub" : "basicController.stub"
    );

    let controllerContent = await readFile(stubPath, "utf-8");
    controllerContent = controllerContent.replace(/{{name}}/g, name);

    const filePath = join(
      process.cwd(),
      "app/Controllers",
      `${name}Controller.ts`
    );
    await writeFile(filePath, controllerContent);
    logSuccess(`Controller '${name}' created successfully.`);

    // Optionally create request class
    if (options?.request) {
      const formRequestCommand = new MakeFormRequestCommand();
      await formRequestCommand.handle(name);
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    command
      .option("-r, --resource", "Create a resource controller")
      .option("-R, --request", "Create a corresponding form request class"); // Add the new option
  }
}
