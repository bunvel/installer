import { installPackages } from "./install";

export async function installDependencies(basePath: string, db: string) {
  await installPackages(basePath, ["typescript", "@types/bun"], true);
  await installPackages(basePath, ["@bunvel/framework@^1"]);

  if (db == "mysql") {
    await installPackages(basePath, ["mysql2"]);
  }

  if (db == "postgresql") {
    await installPackages(basePath, ["pg"]);
  }
}
