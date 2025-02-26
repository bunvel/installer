export function createReadme() {
  return `
# Bunvel - Your Cutting-Edge Framework

**Bunvel** is a cutting-edge framework for Bun.js, engineered to revolutionize server-side JavaScript development. It combines elegant syntax with powerful features, offering developers a seamless and efficient pathway to build robust, high-performance APIs and services.

## 🚀 Getting Started

### 📦 Installation

Install the Bunvel CLI globally with:

\`\`\`bash
bun install -g @bunvel/installer
\`\`\`

### ✨ Creating a New Project

To start a new Bunvel project, use the CLI:

\`\`\`bash
Bunvel create project-name
\`\`\`

Then, navigate into your project directory and install dependencies:

\`\`\`bash
cd project-name
bun install
\`\`\`

### ▶️ Running the Application

Run your Bunvel application with:

\`\`\`bash
bun run dev
\`\`\`

### 🔧 Generating Components

Bunvel's CLI makes it easy to generate controllers, models, and migrations.

#### 🛠 Creating a Controller

Generate a new controller:

\`\`\`bash
Bunvel make:controller User
\`\`\`

For a resource controller, use:

\`\`\`bash
Bunvel make:controller User -r
\`\`\`

#### 🗄 Creating a Migration

Create a new migration:

\`\`\`bash
Bunvel make:migration users
\`\`\`

#### 🧩 Creating a Model

Generate a new model with optional components:

\`\`\`bash
Bunvel make:model User
\`\`\`

To also generate a migration, controller, and resource controller:

\`\`\`bash
Bunvel make:model User -mcr
\`\`\`

- \`-m\`: Generate a migration
- \`-c\`: Generate a controller
- \`-r\`: Generate a resource controller (when used with -c)

### 🗄 Database Operations

\`\`\`bash
Bunvel migrate:run   # Run all migrations

Bunvel migrate:fresh  # Drop all tables and re-run all migrations

Bunvel migrate:rollback  # Rollback the last batch of migrations
\`\`\`

## 📚 Documentation

> Note: Comprehensive documentation is currently under development. In the meantime, this README serves as a quick start guide. For more detailed information, please refer to the inline comments in the source code or reach out to the community.

We're working hard to provide detailed documentation. Stay tuned for updates!

## 💖 Support

If you find Bunvel helpful, please consider giving it a star on GitHub and sharing it with others!
  `;
}
