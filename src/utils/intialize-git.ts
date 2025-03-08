import { exec } from "child_process";

export function initializeGitRepository(basePath: string) {
  return new Promise<void>((resolve, reject) => {
    exec(`git init ${basePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Failed to initialize git repository: ${stderr}\n`);
        reject(error);
      } else {
        console.log(`${stdout}\n`);
        resolve();
      }
    });
  });
}
