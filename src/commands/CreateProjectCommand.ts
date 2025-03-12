import { cancel, intro, isCancel, outro, select, text } from "@clack/prompts";
import { mkdir } from "node:fs/promises";
import { Command } from "../Command";
import { installDependencies } from "../utils/install";
import { initializeGitRepository } from "../utils/intialize-git";
import { createAppConfig } from "./create/createAppConfig";
import { createCli } from "./create/createCli";
import { createControllerContent } from "./create/createControllerContent";
import { createDatabaseConfig } from "./create/createDatabaseConfig";
import { createEnv, createExampleEnv } from "./create/createEnv";
import { createExampleTest } from "./create/createExampleTest";
import { createGitIgnore } from "./create/createGitignore";
import { createIndexContent } from "./create/createIndexContent";
import { createLogConfig } from "./create/createLoggingConfig";
import { createPackageJson } from "./create/createPackageJson";
import { createReadme } from "./create/createReadme";
import { createRoutesApiContent } from "./create/createRoutesApiContent";
import { createUserController } from "./create/createUserController";
import { createUserMigration } from "./create/createUserMigration";
import { createUserModel } from "./create/createUserModel";
import { createTsconfig } from "./create/tsconfig";

export default class CreateProjectCommand extends Command {
  signature = "create [name]"; // Make 'name' optional
  description = "Create a new project with user input";

  async handle(name?: string): Promise<void> {
    // Enhanced intro message
    intro(`🚀 Welcome to the Bunvel Project Creator! 🎉`);

    let projectName = name;
    while (!projectName) {
      const response = await text({
        placeholder: "project_name",
        message: "Enter the project name:",
      });
      projectName = this.formatProjectName(response.toString().trim());

      if (!this.isValidProjectName(projectName)) {
        console.error(
          "🚫 Invalid project name. It must start with an alphabet and can only contain alphabets, numbers, and underscores."
        );
        projectName = "";
      }
    }

    console.log(`📛 Project Name: ${projectName}`);

    const db = (await select({
      message: "Pick a Database type.",
      options: [
        { value: "mysql", label: "MySQL", hint: "recommended" },
        { value: "postgresql", label: "PostgreSQL" },
        { value: "sqlite", label: "SQLite" },
      ],
    })) as string;

    if (isCancel(db)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    const { parentDir, projectDir } = this.extractProjectPath(projectName);

    console.log(`🛠️ Creating project '${projectDir}'...
`);

    await this.createDirectories(parentDir, projectDir);

    await this.createFiles(`${parentDir}/${projectDir}`, projectDir, db);

    console.log("📦 Installing dependencies...");
    await installDependencies(`${parentDir}/${projectDir}`, db);

    console.log("🔧 Initializing git repository...\n");
    await initializeGitRepository(`${parentDir}/${projectDir}`);

    // Enhanced outro message
    outro(`🎉 Project '${projectDir}' created successfully! 🚀

      You're all set to dive into development. Here are the next steps:
      1. Navigate to your project directory: cd ${parentDir}/${projectDir}
      2. Start the development server: bun run dev
      3. Access your API at: [http://localhost:8000/api]
      
      🚀 Happy coding! May your code be bug-free and your coffee be strong! ☕\n\n`);
  }

  private isValidProjectName(name: string): boolean {
    // Regex to validate project name
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    return regex.test(name);
  }

  private formatProjectName(name: string): string {
    // Convert camelCase to snake_case and lowercase the string
    return name
      .replace(/([a-z])([A-Z])/g, "$1_$2") // Convert camelCase to snake_case
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .toLowerCase(); // Convert to lowercase
  }

  private extractProjectPath(name: string) {
    const parts = name.split("/");
    const projectDir = parts.pop() as string;
    const parentDir = parts.join("/") || ".";
    return { parentDir, projectDir };
  }

  private async createDirectories(parentDir: string, projectDir: string) {
    const basePath = `${parentDir}/${projectDir}`;
    const directories = [
      "",
      "app/controllers",
      "app/models",
      "database/migrations",
      "routes",
      "config",
      "test",
    ];
    await Promise.all(
      directories.map((dir) => mkdir(`${basePath}/${dir}`, { recursive: true }))
    );
    console.log("📁 Directories created successfully!\n");
  }

  private async createFiles(basePath: string, projectDir: string, db: string) {
    const files = [
      { path: ".gitignore", content: createGitIgnore() },
      { path: "tsconfig.json", content: createTsconfig() },
      { path: "README.md", content: createReadme() },
      { path: "package.json", content: createPackageJson(projectDir) },
      { path: "index.ts", content: createIndexContent() },
      { path: ".env", content: createEnv(projectDir, db) },
      { path: "vel.ts", content: createCli() },
      { path: ".env.example", content: createExampleEnv() },
      { path: "test/example.test.ts", content: createExampleTest() },
      { path: "config/app.ts", content: createAppConfig() },
      { path: "config/database.ts", content: createDatabaseConfig() },
      { path: "config/logging.ts", content: createLogConfig() },
      { path: "routes/api.ts", content: createRoutesApiContent() },
      {
        path: "app/controllers/controller.ts",
        content: createControllerContent(),
      },
      {
        path: "app/controllers/UserController.ts",
        content: createUserController(),
      },
      {
        path: "app/models/User.ts",
        content: createUserModel(),
      },
      {
        path: "database/migrations/000000000000_create_user_table.ts",
        content: createUserMigration(),
      },
    ];

    await Promise.all(
      files.map((file) =>
        Bun.write(`${basePath}/${file.path}`, file.content.trim())
      )
    );
    console.log("📝 Files created successfully!\n");
  }
}
