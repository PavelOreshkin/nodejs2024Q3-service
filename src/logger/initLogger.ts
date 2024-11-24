import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { CustomLogger } from './CustomLogger';

export const initLogger = (app) => {
  const logger = app.get(CustomLogger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  return logger;
};
