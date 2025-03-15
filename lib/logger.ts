import pino, { Logger } from "pino";

// Default log level based on environment
const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

export const logger: Logger =
  process.env["NODE_ENV"] === "production"
    ? // JSON in production
      pino({ level: logLevel })
    : // Pretty print in development
      pino({
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
        level: logLevel,
      });