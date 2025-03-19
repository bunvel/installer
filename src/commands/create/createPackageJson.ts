export function createPackageJson(name: string) {
  return JSON.stringify(
    {
      name,
      version: "1.0.0",
      description: "Fast. Minimal. Bun-powered framework.",
      module: "index.ts",
      type: "module",
      scripts: {
        dev: "bun run --watch ./bootstrap/index.ts",
        vel: "bun run ./vel.ts",
      },
      engines: {
        bun: ">=1.2.0",
      },
      packageManager: "bun@1.2.0",
    },
    null,
    2
  );
}
