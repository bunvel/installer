export function createIndexContent() {
  return `
import { Application } from "@atherjs/ather";
import routes from "./routes/api";

/**
 * The entry point of the application.
 * This function initializes the application, loads environment variables and configuration,
 * runs database migrations, and sets up the routes.
 */
async function bootstrap() {
  // Create a new instance of the Application class.
  const app = new Application();
  
  // Boot the application, which involves setting up services, middleware, and any necessary initializations.
  await app.boot();
  
  // Define application routes by passing the router to the routes configuration.
  routes(app.router);
}

// Call the bootstrap function to start the application setup process.
bootstrap();


  `;
}
