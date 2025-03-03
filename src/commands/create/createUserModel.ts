export default function createUserModel() {
  return `
import { Model } from "@bunvel/framework";

export default class User extends Model {

  public static tableName = "users";
  
}
    `;
}
