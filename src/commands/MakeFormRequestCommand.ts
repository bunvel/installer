import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { logSuccess } from "../../utils/Helpers";
import { Command, CommanderCommand } from "../Command";

export default class MakeFormRequestCommand extends Command {
  signature = "make:request <name>";
  description = "Create a new form request class";

  async handle(name: string): Promise<void> {
    const stubPath = join(__dirname, "stubs", "formRequest.stub");

    // Read the stub file
    let formRequestContent = await readFile(stubPath, "utf-8");
    formRequestContent = formRequestContent.replace(/{{name}}/g, name);

    const requestsDir = join(process.cwd(), "app/Requests");
    const filePath = join(requestsDir, `${name}Request.ts`);

    // Ensure the requests directory exists
    await this.ensureDirectory(requestsDir);

    // Write the form request class to the file
    await writeFile(filePath, formRequestContent.trim());
    logSuccess(`Form request '${name}Request' created successfully.`);
  }

  protected async ensureDirectory(dir: string): Promise<void> {
    try {
      await mkdir(dir, { recursive: true });
    } catch (error) {
      // Handle the error if directory creation fails
      console.error(`Failed to create directory '${dir}':`, error);
    }
  }

  protected configureCommand(command: CommanderCommand): void {
    // Add any options or arguments if needed
  }
}
