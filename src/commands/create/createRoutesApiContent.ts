export function createRoutesApiContent() {
  return `
import { Router } from "@atherjs/ather";

/**
 * Define API routes for the application.
 *
 */
export default function (router: Router) {

  router.group("/api", [], () => {

    router.get("", async () => "Welcome to Ather");

  });
}

  `;
}
