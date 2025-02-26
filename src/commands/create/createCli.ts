export function createCli() {
  return `
import { CLI } from "@bunvel/framework";

async function main() {
  const cli = new CLI();
  await cli.run(Bun.argv.slice(2));
}

main().catch(console.error);

  `;
}
