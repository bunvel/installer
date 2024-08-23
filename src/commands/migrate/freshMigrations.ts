import { DB, Logger } from "@atherjs/ather";

export async function freshMigrations() {
  try {
    await DB.setupDatabaseConnection();

    await DB.dropAllTables();

    Logger.error("Fresh the migrations");
  } catch (error) {
    console.error("Error performing fresh migration:", error);
  } finally {
    await DB.close();
  }
}
