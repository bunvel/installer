export function createIndexContent() {
  return `
import { Application } from "@atherjs/ather";
import routes from "./routes/api";

// Create a new instance of the Application class.
const app = new Application();

// Boot the application, which involves setting up services, middleware, and any necessary initializations.
await app.boot();

// Define application routes by passing the router to the routes configuration.
routes(app.router);
  `;
}
