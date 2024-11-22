import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { CustomLogger } from 'src/logger/CustomLogger';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(
      exception?.response?.message || exception.message || exception,
      exception.stack || 'No stack trace',
    );

    response.status(exception.status).send(exception.response);
  }
}
