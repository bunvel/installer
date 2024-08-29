export function createLogConfig() {
  return `
import { Env } from "@atherjs/ather";

export default {
  /**
   * The default logging channel.
   * This is fetched from the environment variable 'LOG_CHANNEL'.
   * If 'LOG_CHANNEL' is not set, it defaults to 'stack'.
   *
   * @var {string}
   */
  default: Env.get("LOG_CHANNEL", "stack"),

  /**
   * The logging channels configuration.
   *
   * @var {object}
   */
  channels: {
    /**
     * Stack logging channel configuration.
     * Allows logging to multiple channels simultaneously.
     */
    stack: {
      driver: "stack",
      channels: Env.get("LOG_STACK_CHANNELS", "single,stderr").split(","),
      level: Env.get("LOG_LEVEL", "debug"),
    },

    /**
     * Single file logging channel configuration.
     */
    single: {
      driver: "single",
      path: Env.get("LOG_SINGLE_PATH", "logs/ather.log"),
      level: Env.get("LOG_LEVEL", "debug"),
    },

    /**
     * Daily file logging channel configuration.
     */
    daily: {
      driver: "daily",
      path: Env.get("LOG_DAILY_PATH", "logs/ather.log"),
      level: Env.get("LOG_LEVEL", "debug"),
      days: Env.get("LOG_DAILY_DAYS", 14),
    },

    /**
     * Stderr logging channel configuration.
     */
    stderr: {
      driver: "stderr",
      level: Env.get("LOG_STDERR_LEVEL", "debug"),
    },

    /**
     * Syslog logging channel configuration.
     */
    syslog: {
      driver: "syslog",
      level: Env.get("LOG_SYSLOG_LEVEL", "debug"),
    },

    /**
     * Error log channel configuration.
     */
    errorlog: {
      driver: "errorlog",
      level: Env.get("LOG_ERROR_LEVEL", "debug"),
    },
  },
};
`;
}
