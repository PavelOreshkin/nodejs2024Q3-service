import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './CustomLogger';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      // console.log('res: ', res);
      const duration = Date.now() - startTime;
      this.logger.log(
        `Request: ${method} ${url} - Query: ${JSON.stringify(
          query,
        )} - Body: ${JSON.stringify(
          body,
        )} - Status: ${statusCode} (${duration}ms)`,
      );
    });

    next();
  }
}
