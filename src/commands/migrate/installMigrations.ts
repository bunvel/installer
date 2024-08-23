import { Blueprint, DB, Schema } from "@atherjs/ather";

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
