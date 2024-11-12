const morgan = require('morgan');
const winston = require('winston');

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    }),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    }
  }
});

module.exports = { logger, morganMiddleware };
