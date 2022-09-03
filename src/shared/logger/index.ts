import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as moment from 'moment-jalaali';

/*
 * HOW-TO-USE
 *
 * 1-import Logger from @nestjs/common
 * 2-inject it like other packages
 * 3-this.logger.<level>(message, error.stack, context); e.g. this.logger.error('Error', e.stack, 'ProvinceService');
 *
 */

export default WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => moment().format('jYYYY/jMM/jDD HH:mm:ss'),
        }),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('Villakade', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'silly',
      filename: './log/logger-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '2m',
      // maxFiles: '30d'
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => moment().format('jYYYY/jMM/jDD HH:mm:ss'),
        }),
        winston.format.printf(
          ({ level, message, timestamp, stack, context }) => {
            const stacktrace = stack ? `\n${stack}` : '';
            return (
              `${timestamp} ${context} ### ${level} => ${message}` + stacktrace
            );
          },
        ),
      ),
    }),
  ],
});
