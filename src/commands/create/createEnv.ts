export function createEnv(name: string) {
  return `
APP_NAME = ${name}
APP_PORT = 8000
APP_ENV = development
APP_URL = http://localhost

DB_CONNECTION = mysql
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_DATABASE = "ather"
DB_USERNAME = "root"
DB_PASSWORD = "root"
  `;
}

export function createExampleEnv() {
  return `
APP_NAME = "Ather"
APP_PORT = 8000
APP_ENV = development
APP_URL = http://localhost

DB_CONNECTION = mysql
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_DATABASE = "ather"
DB_USERNAME = "root"
DB_PASSWORD = "root"
  `;
}
