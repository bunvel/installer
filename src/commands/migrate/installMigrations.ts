import { Blueprint } from "../../../database/Blueprint";
import { DB } from "../../../database/Database";
import { Schema } from "../../../database/Schema";

export async function installMigrations() {
  await DB.setupDatabaseConnection();

  const tableExists = await Schema.hasTable("migrations");
  if (!tableExists) {
    await Schema.createTable("migrations", (table: Blueprint) => {
      table.increments("id");
      table.string("migration");
      table.integer("batch");
    });
  }
}
