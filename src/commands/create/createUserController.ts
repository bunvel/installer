export default function createUserController() {
  return `
import type { Context } from "@bunvel/framework";
import Controller from "./controller";

export default class UserController extends Controller {
  static async index({}: Context) {
    throw new Error("Method not implemented.");
  }

  static async show({ req }: Context) {
    throw new Error("Method not implemented.");
  }

  static async create({ req }: Context) {
    throw new Error("Method not implemented.");
  }

  static async store({ req }: Context) {
    throw new Error("Method not implemented.");
  }

  static async edit({ req }: Context) {
    throw new Error("Method not implemented.");
  }

  static async update({ req }: Context) {
    throw new Error("Method not implemented.");
  }

  static async destroy({ req }: Context) {
    throw new Error("Method not implemented.");
  }
}    
    `;
}
