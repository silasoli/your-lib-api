import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface HttpErrorResponse {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorObj: HttpErrorResponse =
      exception instanceof HttpException
        ? (exception.getResponse() as HttpErrorResponse)
        : { message: 'Internal server error' };

    this.logger.error(
      `Http Status: ${status} Error Message: ${JSON.stringify(errorObj)}`,
    );

    if (typeof errorObj.message === 'string') {
      errorObj.message = [errorObj.message];
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: errorObj,
    });
  }
}
