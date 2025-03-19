export function createExampleTest(appName: string) {
  return `
import { Application, Config, ConfigServiceProvider } from "@bunvel/framework";
import { expect, test } from "bun:test";

test("Test framework is installed correctly", async () => {
  const app = Application.getInstance();
  await app.register([ConfigServiceProvider]);
  await app.boot();

  expect(app.booted).toBe(true);
});

test("Test config is working correctly", async () => {
  const appName = await Config.get("app.name");

  expect(appName).toBe("${appName}");
});
 `;
}
