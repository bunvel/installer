export function createPackageJson(name: string) {
  return JSON.stringify(
    {
      name,
      version: "1.0.0",
      description: "Your Cutting-Edge Framework",
      module: "index.ts",
      type: "module",
      scripts: {
        start: "bun run index.ts",
        dev: "bun run --watch index.ts",
        vel: "bun run ./vel.ts",
      },
    },
    null,
    2
  );
}
