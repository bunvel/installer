export function createRoutesApiContent() {
  return `
import type { RouterService } from "@bunvel/framework";
import UserController from "@controller/UserController";

/**
 * Define API routes for the application.
 *
 */
export default function (Route: RouterService) {
  // API root route
  Route.get("/", async () => "Welcome to the Bunvel");

  // Simple API route
  Route.get("/api", async () => "Hello, API!");

  // API resource (RESTful)
  Route.apiResource("/api/users", UserController);
}
  `;
}
