import { intro, outro, text } from "@clack/prompts";
import { exec } from "child_process";
import { Command as CommanderCommand } from "commander";
import { mkdir, writeFile } from "fs/promises";
import { Command } from "../Command";
import { installPackages } from "../utils/install";
import { createAppConfig } from "./create/createAppConfig";
import { createControllerContent } from "./create/createControllerContent";
import { createDatabaseConfig } from "./create/createDatabaseConfig";
import { createEnv, createExampleEnv } from "./create/createEnv";
import { createGitIgnore } from "./create/createGitignore";
import { createIndexContent } from "./create/createIndexContent";
import { createPackageJson } from "./create/createPackageJson";
import { createReadme } from "./create/createReadme";
import { createRoutesApiContent } from "./create/createRoutesApiContent";

export default class CreateProjectCommand extends Command {
  signature = "create [name]"; // Make 'name' optional
  description = "Create a new project with user input";

  async handle(name?: string): Promise<void> {
    // Enhanced intro message
    intro(`🚀 Welcome to the AtherJS Project Creator! 🎉
    
Get ready to kickstart your next big project with ease and efficiency. Let's create something amazing!\n\n`);

    let projectName = name;
    // Prompt for project name if not provided
    if (!projectName) {
      const response = await text({
        placeholder: "project_name",
        message: "Enter the project name:",
      });
      projectName = response.toString().trim();
    }

    // Convert project name to the desired format
    projectName = this.formatProjectName(projectName);

    if (!this.isValidProjectName(projectName)) {
      console.error(
        "🚫 Invalid project name. It must start with an alphabet and can only contain alphabets, numbers, and underscores."
      );
      return;
    }
    console.log(`📛 Project Name: ${projectName}`);

    // const projectType = await select({
    //   message: "Pick a Project type.",
    //   options: [
    //     { value: "full", label: "Full", hint: "recommended" },
    //     { value: "slim", label: "Slim" },
    //   ],
    // });

    // if (isCancel(projectType)) {
    //   cancel("Operation cancelled.");
    //   process.exit(0);
    // }

    // let db;
    // let installDependencies;
    // if (projectType == "full") {
    //   db = await select({
    //     message: "Pick a Database type.",
    //     options: [
    //       { value: "mysql", label: "MySQL", hint: "recommended" },
    //       { value: "postgresql", label: "PostgreSQL" },
    //       { value: "mariadb", label: "MariaDB" },
    //       { value: "mssql", label: "MsSQL" },
    //       { value: "sqlite3", label: "SQLite" },
    //     ],
    //   });

    //   installDependencies = true;
    // }

    // if (isCancel(db)) {
    //   cancel("Operation cancelled.");
    //   process.exit(0);
    // }

    let db;
    let installDependencies = true;
    console.log(`🛠️ Creating project '${projectName}'...\n`);

    console.log("📁 Creating directories...");
    await this.createDirectories(projectName);

    console.log("📝 Creating files...");
    await this.createFiles(projectName);

    if (installDependencies) {
      console.log("📦 Installing dependencies...");
      await this.installDependencies(projectName, db);
    }

    console.log("🔧 Initializing git repository...\n");
    await this.initializeGitRepository(projectName);

    // Enhanced outro message
    outro(`🎉 Project '${projectName}' created successfully! 🚀

You're all set to dive into development. Here are the next steps:
1. Navigate to your project directory: cd ${projectName}
2. Start the development server: bun run dev
3. Access your API at: [http://localhost:8000/api](http://localhost:8000/api)

🚀 Happy coding! May your code be bug-free and your coffee be strong! ☕\n\n`);
  }

  protected configureCommand(command: CommanderCommand): void {}

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
      "app/Controllers",
      "app/Models",
      "database/migrations",
      "database/seeders",
      "database/factories",
      "routes",
      "config",
    ];
    for (const dir of directories) {
      await mkdir(`${name}/${dir}`, { recursive: true });
      process.stdout.write(".");
    }
    console.log(" Done!\n");
  }

  private async createFiles(name: string) {
    const files = [
      { path: ".gitignore", content: createGitIgnore() },
      { path: "README.md", content: createReadme() },
      { path: "package.json", content: createPackageJson(name) },
      { path: "index.ts", content: createIndexContent() },
      { path: ".env", content: createEnv(name) },
      { path: ".env.example", content: createExampleEnv() },
      { path: "config/app.ts", content: createAppConfig() },
      { path: "config/database.ts", content: createDatabaseConfig() },
      { path: "routes/api.ts", content: createRoutesApiContent() },
      {
        path: "app/Controllers/Controller.ts",
        content: createControllerContent(),
      },
    ];

    for (const file of files) {
      await writeFile(`${name}/${file.path}`, file.content.trim());
      process.stdout.write(".");
    }
    console.log(" Done!\n");
  }

  private async installDependencies(name: string, db: any) {
    const dbDependencies = {
      mysql: "mysql2",
      postgresql: "pg",
      mariadb: "mariadb",
      mssql: "mssql",
      sqlite3: "sqlite3",
    };
    if (db) {
      const dbKey = db as keyof typeof dbDependencies;
      await installPackages(name, [dbDependencies[dbKey]]);
    }

    await installPackages(
      name,
      ["typescript", "@types/node", "bun-types"],
      true
    );
    await installPackages(name, ["@atherjs/ather"]);
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
