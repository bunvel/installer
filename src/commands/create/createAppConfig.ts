export function createAppConfig() {
  return `
import { Env } from "@atherjs/ather";
  
export default {
  /**
   * The name of the application.
   * This is fetched from the environment variable 'APP_NAME'.
   * If 'APP_NAME' is not set, it defaults to 'Ather'.
   * 
   * @var {string}
   */
  name: Env.get("APP_NAME", "Ather"),

  /**
   * The port on which the application will run.
   * This is fetched from the environment variable 'APP_PORT'.
   * If 'APP_PORT' is not set, it defaults to '8000'.
   * 
   * @var {number}
   */
  port: Env.get("APP_PORT", 8000),

  /**
   * The environment in which the application is running.
   * This is fetched from the environment variable 'APP_ENV'.
   * If 'APP_ENV' is not set, it defaults to 'development'.
   * 
   * @var {string}
   */
  env: Env.get("APP_ENV", "development"),

  /**
   * The debug mode for the application.
   * This is fetched from the environment variable 'APP_DEBUG'.
   * If 'APP_DEBUG' is not set, it defaults to 'false'.
   * 
   * @var {boolean}
   */
  debug: Env.get("APP_DEBUG", false),

  /**
   * The URL of the application.
   * This is fetched from the environment variable 'APP_URL'.
   * If 'APP_URL' is not set, it defaults to 'http://localhost'.
   * 
   * @var {string}
   */
  url: Env.get("APP_URL", "http://localhost"),

  /**
   * The log level for the application.
   * This is fetched from the environment variable 'LOG_LEVEL'.
   * If 'LOG_LEVEL' is not set, it defaults to 'debug'.
   * 
   * @var {string}
   */
  logLevel: Env.get("LOG_LEVEL", "debug"),

  /**
   * The timezone for the application.
   * This is fetched from the environment variable 'APP_TIMEZONE'.
   * If 'APP_TIMEZONE' is not set, it defaults to 'UTC'.
   * 
   * @var {string}
   */
  timezone: Env.get("APP_TIMEZONE", "UTC"),
};

  `;
}
