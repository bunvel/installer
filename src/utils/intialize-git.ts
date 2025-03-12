import { exec } from "child_process";

export function initializeGitRepository(basePath: string) {
  return new Promise<void>((resolve) => {
    exec(`git init ${basePath}`, (error, stdout) => {
      if (error) {
        console.warn(
          "Git is not installed on your system. You can manually initialize a git repository by running 'git init' in your project directory."
        );
        resolve();
      } else {
        console.log(`${stdout}\n`);
        resolve();
      }
    });
  });
}
