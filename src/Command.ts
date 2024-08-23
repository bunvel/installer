import { Command as CommanderCommand } from "commander";

export abstract class Command {
  /**
   * The command signature that defines how it should be called.
   */
  abstract signature: string;

  /**
   * A brief description of what the command does.
   */
  abstract description: string;

  /**
   * The main logic of the command.
   * @param args - The arguments passed to the command.
   */
  abstract handle(...args: unknown[]): Promise<void> | void;

  /**
   * Configures the command with Commander.
   * @param program - The Commander program instance.
   */
  configure(program: CommanderCommand): void {
    const command = program
      .command(this.signature)
      .description(this.description)
      .action(async (...args: unknown[]) => {
        try {
          await this.handle(...args);
        } catch (error) {
          console.error(`Error executing command '${this.signature}':`, error);
        }
      });

    this.configureCommand(command);
  }

  /**
   * Configures additional options or arguments for the command.
   * Can be overridden by child classes to customize command behavior.
   * @param command - The Commander command instance.
   */
  protected configureCommand(command: CommanderCommand): void {
    // Override this method to add options or arguments
  }
}

export { Command as CommanderCommand } from "commander";
