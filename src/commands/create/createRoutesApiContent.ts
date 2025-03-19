export function createRoutesApiContent() {
  return `
import { Router, RouterService } from "@bunvel/framework";
import UserController from "@controller/UserController";

/**
 * Define API routes for the application.
 *
 */
export default (appRouter: Router) => {
  const router = new RouterService(appRouter);

  router.get("/", async () => "Welcome to Bunvel");

  router.get("/api", async () => "Hello, API!");

  router.apiResource("/api/users", UserController);
};
  `;
}
