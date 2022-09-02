import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const {
      path,
      baseUrl,
      body,
      cookies,
      headers,
      isAuthenticated,
      params,
      query,
      url,
    } = request;

    // log the error somewhere
    console.log(
      exception.cause,
      exception.message,
      exception.name,
      exception.getResponse(),
      exception.getStatus(),
      exception.stack,
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'internal server error',
      error: 'Internal Server Error',
    });
  }
}
