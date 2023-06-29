import winston from 'winston';
import expressWinston from 'express-winston';

const getLoggerOptions = (filename: string) => ({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});

export const setupLogger = expressWinston.logger(getLoggerOptions('logs/request.log'));
export const errorLogger = expressWinston.errorLogger(getLoggerOptions('logs/error.log'));
