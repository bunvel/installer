import { DB, Logger } from "@atherjs/ather";
import { installMigrations } from "./installMigrations";

export async function freshMigrations() {
  try {
    await DB.setupDatabaseConnection();

    await DB.dropAllTables();

    await installMigrations();

    Logger.success("Freshed the migrations");
  } catch (error) {
    console.error("Error performing fresh migration:", error);
  } finally {
    await DB.close();
  }
}
