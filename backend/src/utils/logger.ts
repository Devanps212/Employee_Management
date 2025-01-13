import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDirectory = path.join(__dirname, '..', 'logs')

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

const logLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
    debug: 3,
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'blue',
  },
}

const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'application.log'),
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
})

winston.addColors(logLevels.colors)

export default logger
