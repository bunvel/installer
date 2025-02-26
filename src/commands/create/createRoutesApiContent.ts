export function createRoutesApiContent() {
  return `
import { Router, RouterService } from "@bunvel/framework";

/**
 * Define API routes for the application.
 *
 */
export default (appRouter: Router) => {
  const router = new RouterService(appRouter);

  router.get("/", async () => "Welcome to Bunvel");
};
  `;
}
