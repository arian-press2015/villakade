import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/*
 * HOW-TO-USE
 *
 * This ExceptionFilter catches all uncought errors and return 500 internal server error instead.
 *
 */

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { originalUrl, body, cookies, headers, query } = request;

    // log info that are useful for debugging
    this.logger.debug(
      'debugging info:\n' +
        JSON.stringify({
          originalUrl,
          body,
          query,
          cookies,
          headers,
        }),
      'ExceptionFilter',
    );
    // log the actual error
    this.logger.error(exception.message, exception.stack, 'ExceptionFilter');

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'internal server error',
      error: 'Internal Server Error',
    });
  }
}
