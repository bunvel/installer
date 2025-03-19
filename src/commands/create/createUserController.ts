export function createUserController() {
  return `
import type { Context } from "@bunvel/framework";
import Controller from "./controller";

export default class UserController extends Controller {
  static async index() {
    throw new Error("Method not implemented.");
  }

  static async show({ req }: Context) {
    throw new Error("Method not implemented.");
  }

  static async store({ body }: Context) {
    throw new Error("Method not implemented.");
  }

  static async update({ req, body }: Context) {
    throw new Error("Method not implemented.");
  }

  static async destroy({ req }: Context) {
    throw new Error("Method not implemented.");
  }
}    
    `;
}
