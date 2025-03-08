import { execSync } from "child_process";

export async function installDependencies(basePath: string, db: string) {
  const commonPackages = ["typescript", "@types/bun"];
  const dbPackages: Record<string, string> = {
    mysql: "mysql2",
    postgresql: "pg",
  };

  const packages = ["@bunvel/framework"];

  if (db in dbPackages) {
    packages.push(dbPackages[db]);
  }

  await installPackages(basePath, commonPackages, true); // Install dev packages
  await installPackages(basePath, packages); // Install regular packages
}

export async function installPackages(
  projectPath: string,
  packages: any[],
  dev = false
) {
  if (!packages.length) return;

  const packageList = packages.join(" ");
  const command = `bun add ${dev ? "-d " : ""}${packageList}`;

  try {
    console.log(
      `Installing ${dev ? "dev" : "default"} packages: ${packageList}`
    );
    execSync(command, { cwd: projectPath, stdio: "inherit" });
    console.log(`Successfully installed: ${packageList}`);
  } catch (error) {
    console.error(`Error installing packages: ${packageList}\n`, error);
  }
}
