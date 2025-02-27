export function createTsconfig() {
  return `
    {
  "compilerOptions": {
    // Enable latest features
    "lib": ["ESNext", "DOM"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,

    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,

    // Some stricter flags (disabled by default)
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false,

    "baseUrl": "./app",
    "paths": {
      "@controller/*": ["controllers/*"],
      "@middleware/*": ["middleware/*"],
      "@model/*": ["model/*"],
      "@provider/*": ["provider/*"],
      "@type/*": ["type/*"],
      "@interface/*": ["interface/*"],
      "@command/*": ["command/*"]
    },
  }
}
    `;
}
