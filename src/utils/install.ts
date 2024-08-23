import { execSync } from "child_process";

export async function installPackages(
  projectPath: string,
  packages: string[],
  dev = false
) {
  const packageList = packages.join(" ");
  const command = `bun add ${dev ? "-d " : ""}${packageList}`;

  try {
    console.log(`Installing ${dev ? "dev" : "default"} packages...`);
    execSync(command, { cwd: projectPath, stdio: "inherit" });
    console.log(`${dev ? "Dev" : "Default"} packages installed successfully.`);
  } catch (error) {
    console.error(
      `${dev ? "Dev" : "Default"} package installation failed:`,
      error
    );
  }
}
