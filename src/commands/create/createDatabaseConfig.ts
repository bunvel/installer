export function createDatabaseConfig() {
  return `
import { Env } from "@bunvel/framework";

export default {
  /**
   * The default database connection to use.
   * This is fetched from the environment variable 'DB_CONNECTION'.
   * If 'DB_CONNECTION' is not set, it defaults to 'mysql'.
   * 
   * @var {string}
   */
  default: Env.get("DB_CONNECTION", "mysql"),

  connections: {
    /**
     * Configuration settings for the MySQL database connection.
     */
    mysql: {
      /**
       * The host where the MySQL database is located.
       * This is fetched from the environment variable 'DB_HOST'.
       * If 'DB_HOST' is not set, it defaults to 'localhost'.
       * 
       * @var {string}
       */
      host: Env.get("DB_HOST", "localhost"),

      /**
       * The port on which the MySQL database is listening.
       * This is fetched from the environment variable 'DB_PORT'.
       * If 'DB_PORT' is not set, it defaults to '3306'.
       * 
       * @var {number}
       */
      port: Env.get("DB_PORT", 3306),

      /**
       * The name of the database to connect to.
       * This is fetched from the environment variable 'DB_DATABASE'.
       * If 'DB_DATABASE' is not set, it defaults to 'bunvel'.
       * 
       * @var {string}
       */
      database: Env.get("DB_DATABASE", "bunvel"),

      /**
       * The username used to connect to the MySQL database.
       * This is fetched from the environment variable 'DB_USERNAME'.
       * If 'DB_USERNAME' is not set, it defaults to 'root'.
       * 
       * @var {string}
       */
      user: Env.get("DB_USERNAME", "root"),

      /**
       * The password used to connect to the MySQL database.
       * This is fetched from the environment variable 'DB_PASSWORD'.
       * If 'DB_PASSWORD' is not set, it defaults to 'root'.
       * 
       * @var {string}
       */
      password: Env.get("DB_PASSWORD", "root"),
    },

    /**
     * Configuration settings for the PostgreSQL database connection.
     */
    postgresql: {
      /**
       * The host where the PostgreSQL database is located.
       * This is fetched from the environment variable 'DB_HOST'.
       * If 'DB_HOST' is not set, it defaults to 'localhost'.
       * 
       * @var {string}
       */
      host: Env.get("DB_HOST", "localhost"),

      /**
       * The port on which the PostgreSQL database is listening.
       * This is fetched from the environment variable 'DB_PORT'.
       * If 'DB_PORT' is not set, it defaults to '5432'.
       * 
       * @var {number}
       */
      port: Env.get("DB_PORT", 5432),

      /**
       * The name of the database to connect to.
       * This is fetched from the environment variable 'DB_DATABASE'.
       * If 'DB_DATABASE' is not set, it defaults to 'bunvel'.
       * 
       * @var {string}
       */
      database: Env.get("DB_DATABASE", "bunvel"),

      /**
       * The username used to connect to the PostgreSQL database.
       * This is fetched from the environment variable 'DB_USERNAME'.
       * If 'DB_USERNAME' is not set, it defaults to 'root'.
       * 
       * @var {string}
       */
      user: Env.get("DB_USERNAME", "root"),

      /**
       * The password used to connect to the PostgreSQL database.
       * This is fetched from the environment variable 'DB_PASSWORD'.
       * If 'DB_PASSWORD' is not set, it defaults to 'root'.
       * 
       * @var {string}
       */
      password: Env.get("DB_PASSWORD", "root"),
    },

    /**
     * Configuration settings for the SQLite database connection.
     */
    sqlite: {
      /**
       * The file path where the SQLite database is stored.
       * This is fetched from the environment variable 'DB_DATABASE'.
       * If 'DB_DATABASE' is not set, it defaults to 'bunvel'.
       * 
       * @var {string}
       */
      database: Env.get("DB_DATABASE", "bunvel"),

      /**
       * The mode in which the SQLite database is opened.
       * This is fetched from the environment variable 'DB_MODE'.
       * If 'DB_MODE' is not set, it defaults to 'readwrite'.
       * 
       * @var {string}
       */
      mode: Env.get("DB_MODE", "readwrite"),
    },
  },
};
  `;
}
