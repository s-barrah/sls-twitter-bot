import Winston from 'winston';

/**
 * LoggerService class
 */
export default class LoggerService {

  constructor() {
    this.logger = Winston.createLogger({
      level: 'info',
      transports: [
        new Winston.transports.Console(),
      ],
    });
  }

  /**
   * Log Information Message
   * @param message
   */
  info(message) {
    if (typeof message !== 'undefined') {
      if (typeof message.toString === 'function') {
        message = message.toString();
      }

      this.logger.log('info', message);
    }
  }

  /**
   * Log Error Message
   * @param error
   */
  error(error) {
    if (typeof message !== 'undefined') {
      if (typeof error.toString === 'function') {
        error = error.toString();
      }
      this.logger.log('error', error);
    }
  }
}
