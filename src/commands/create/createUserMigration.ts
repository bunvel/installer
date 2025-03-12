export function createUserMigration() {
  return `
import type { Blueprint } from "@bunvel/framework";
import { Migration } from "@bunvel/framework";

export default class Users extends Migration {
  async up(): Promise<void> {
    await this.schema.create('users', (table: Blueprint) => {
      table.increments('id');
      table.string('name');
      table.string("email").unique("email");
      table.string('password');
      
      table.timestamps();
    });
  }

  async down(): Promise<void> {
    await this.schema.dropIfExists('users');
  }
}
    `;
}
