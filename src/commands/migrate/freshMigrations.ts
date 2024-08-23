import { DB } from "../../../database/Database";
import { logSuccess } from "../../../utils/Helpers";

export async function freshMigrations() {
  try {
    await DB.setupDatabaseConnection();

    await DB.dropAllTables();

    logSuccess("Fresh the migrations");
  } catch (error) {
    console.error("Error performing fresh migration:", error);
  } finally {
    await DB.close();
  }
}
