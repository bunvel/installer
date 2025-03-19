export function createGitIgnore() {
  return `
# Based on https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore

# Logs

logs
_.log
npm-debug.log_
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Caches

.cache

# node-waf configuration

.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)

build/Release

# Dependency directories

node_modules/

# TypeScript cache

*.tsbuildinfo

# Optional npm cache directory

.npm

# Optional REPL history

.node_repl_history

# Output of 'npm pack'

*.tgz

# Yarn Integrity file

.yarn-integrity

# dotenv environment variable files

.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# Stores VSCode versions used for testing VSCode extensions

.vscode-test

# yarn v2

.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# IntelliJ based IDEs
.idea

# Finder (MacOS) folder config
.DS_Store
  `;
}
