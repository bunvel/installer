export function createEnv(name: string, db: string) {
  let dbConfig = "";

  if (db === "mysql") {
    dbConfig = `
DB_CONNECTION = mysql
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_DATABASE = "ather"
DB_USERNAME = "root"
DB_PASSWORD = "root"
    `;
  } else if (db === "postgresql") {
    dbConfig = `
DB_CONNECTION = postgresql
DB_HOST = 127.0.0.1
DB_PORT = 5432
DB_DATABASE = "ather"
DB_USERNAME = "root"
DB_PASSWORD = "root"
    `;
  } else if (db === "sqlite") {
    dbConfig = `
DB_CONNECTION = sqlite
DB_DATABASE = "ather.sqlite"
DB_MODE = "readwrite"
    `;
  } else {
    throw new Error("Unsupported database type");
  }

  return `
APP_NAME = ${name}
APP_PORT = 8000
APP_ENV = development
APP_DEBUG = false
APP_URL = http://localhost

${dbConfig}
  `;
}

export function createExampleEnv() {
  return `
APP_NAME = "Ather"
APP_PORT = 8000
APP_ENV = development
APP_DEBUG = false
APP_URL = http://localhost

DB_CONNECTION = mysql
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_DATABASE = "ather"
DB_USERNAME = "root"
DB_PASSWORD = "root"
  `;
}
