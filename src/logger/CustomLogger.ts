import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CustomLogger implements LoggerService {
  private logLevel = Number(process.env.LOG_LEVEL) || 0;
  private logFile = path.join(__dirname, '..', '..', 'logs', 'application.log');
  private errorFile = path.join(__dirname, '..', '..', 'logs', 'errors.log');
  private maxFileSize =
    parseInt(process.env.LOG_FILE_MAX_SIZE_KB || '1024', 10) * 1024;

  constructor() {
    this.checkLogRotation('application.log');
    this.checkLogRotation('errors.log');
  }

  error(message: any, trace?: string, ...optionalParams: any[]) {
    const errorMessage = `${message}${trace ? '\nTrace: ' + trace : ''}`;
    this.writeLog('ERROR', this.errorFile, errorMessage, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    if (this.logLevel < 1) return;
    this.writeLog('WARN', this.logFile, message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.logLevel < 2) return;
    this.writeLog('INFO', this.logFile, message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    if (this.logLevel < 3) return;
    this.writeLog('DEBUG', this.logFile, message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    if (this.logLevel < 4) return;
    this.writeLog('VERBOSE', this.logFile, message, optionalParams);
  }

  private writeLog(
    level: string,
    filePath: string,
    message: any,
    optionalParams: any[],
  ) {
    const logEntry = `[${new Date().toISOString()}] [${level}] ${message} ${
      optionalParams.length ? optionalParams.join(' ') : ''
    }\n`;

    if (filePath === this.logFile) {
      process.stdout.write(logEntry);
    }

    fs.appendFileSync(filePath, logEntry);
    this.checkLogRotation(filePath);
  }

  private checkLogRotation(filePath: string) {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > this.maxFileSize) {
        const rotatedFile = `${filePath}.${Date.now()}`;
        fs.renameSync(filePath, rotatedFile);
        fs.writeFileSync(filePath, '');
      }
    }
  }
}
