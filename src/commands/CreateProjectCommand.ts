import { cancel, intro, isCancel, outro, select, text } from "@clack/prompts";
import { exec } from "child_process";
import { mkdir, writeFile } from "fs/promises";
import { Command } from "../Command";
import { installPackages } from "../utils/install";
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

    const projectType = await select({
      message: "Pick a Project type.",
      options: [
        { value: "full", label: "Full", hint: "recommended" },
        { value: "slim", label: "Slim" },
      ],
    });

    if (isCancel(projectType)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    let db: string = "";
    if (projectType == "full") {
      db = (await select({
        message: "Pick a Database type.",
        options: [
          { value: "mysql", label: "MySQL", hint: "recommended" },
          { value: "postgresql", label: "PostgreSQL" },
          { value: "sqlite", label: "SQLite" },
        ],
      })) as string;
    }else{
      db = "sqlite";
    }

    console.log(`🛠️ Creating project '${projectName}'...\n`);

    await this.createDirectories(projectName);

    await this.createFiles(projectName, db);

    console.log("📦 Installing dependencies...");
    await this.installDependencies(projectName, db);

    console.log("🔧 Initializing git repository...\n");
    await this.initializeGitRepository(projectName);

    // Enhanced outro message
    outro(`🎉 Project '${projectName}' created successfully! 🚀

      You're all set to dive into development. Here are the next steps:
      1. Navigate to your project directory: cd ${projectName}
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

  private async createDirectories(name: string) {
    const directories = [
      "",
      "app/controllers",
      "app/models",
      "database/migrations",
      "database/seeders",
      "database/factories",
      "routes",
      "config",
      "test",
    ];
    await Promise.all(
      directories.map((dir) => mkdir(`${name}/${dir}`, { recursive: true }))
    );
    console.log("📁 Directories created successfully!\n");
  }

  private async createFiles(name: string, db: string) {
    const files = [
      { path: ".gitignore", content: createGitIgnore() },
      { path: "README.md", content: createReadme() },
      { path: "package.json", content: createPackageJson(name) },
      { path: "index.ts", content: createIndexContent() },
      { path: ".env", content: createEnv(name, db) },
      { path: "vel.ts", content: createCli() },
      { path: ".env.example", content: createExampleEnv() },
      { path: "test/example.test.ts", content: createExampleTest() },
      { path: "config/app.ts", content: createAppConfig() },
      { path: "config/database.ts", content: createDatabaseConfig() },
      { path: "config/logging.ts", content: createLogConfig() },
      { path: "routes/api.ts", content: createRoutesApiContent() },
      {
        path: "app/controllers/Controller.ts",
        content: createControllerContent(),
      },
    ];

    await Promise.all(
      files.map((file) =>
        writeFile(`${name}/${file.path}`, file.content.trim())
      )
    );
    console.log("📝 Files created successfully!\n");
  }

  private async installDependencies(name: string, db: string) {
    await installPackages(name, ["typescript", "@types/bun"], true);
    await installPackages(name, ["@bunvel/framework"]);

    if (db == "mysql") {
      await installPackages(name, ["mysql2"]);
    }

    if (db == "postgresql") {
      await installPackages(name, ["pg"]);
    }
  }

  private async initializeGitRepository(projectName: string) {
    return new Promise<void>((resolve, reject) => {
      exec(`git init ${projectName}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Failed to initialize git repository: ${stderr}`);
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });
  }
}
