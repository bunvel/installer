export function createEnv(name: string, db: string) {
  let dbConfig = "";

  if (db === "mysql") {
    dbConfig = `
DB_CONNECTION = mysql
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_DATABASE = "bunvel"
DB_USERNAME = "root"
DB_PASSWORD = "root"
    `;
  } else if (db === "postgresql") {
    dbConfig = `
DB_CONNECTION = postgresql
DB_HOST = 127.0.0.1
DB_PORT = 5432
DB_DATABASE = "bunvel"
DB_USERNAME = "root"
DB_PASSWORD = "root"
    `;
  } else if (db === "sqlite") {
    dbConfig = `
DB_CONNECTION = sqlite
DB_DATABASE = "bunvel.sqlite"
DB_MODE = "readwrite"
    `;
  } else {
    throw new Error("Unsupported database type");
  }

  return `
APP_NAME = ${name}
APP_PORT = 8000
APP_ENV = local
APP_URL = http://localhost

APP_DEBUG = true
LOG_CHANNEL = stderr

${dbConfig}
  `;
}

export function createExampleEnv() {
  return `
APP_NAME = "bunvel"
APP_PORT = 8000
APP_ENV = local
APP_URL = http://localhost

APP_DEBUG = true
LOG_CHANNEL = stderr

DB_CONNECTION = mysql
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_DATABASE = "bunvel"
DB_USERNAME = "root"
DB_PASSWORD = "root"
  `;
}
