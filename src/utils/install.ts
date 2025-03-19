import { execSync } from "child_process";
import { DB_PACKAGES, FRAMEWORK_NAME } from "./constant";

export async function installDependencies(basePath: string, db: string) {
  const commonPackages = ["typescript", "@types/bun"];
  const dbPackages: Record<string, string> = DB_PACKAGES;

  const packages = [FRAMEWORK_NAME];

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
    console.log(`Successfully installed: ${packageList}\n`);
  } catch (error) {
    console.error(`Error installing packages: ${packageList}\n`, error);
  }
}
