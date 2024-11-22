import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CustomLogger implements LoggerService {
  private logLevel = process.env.LOG_LEVEL || 'info';
  private logFile = path.join(__dirname, '..', '..', 'logs', 'application.log');
  private errorFile = path.join(__dirname, '..', '..', 'logs', 'errors.log');
  private maxFileSize =
    parseInt(process.env.LOG_FILE_MAX_SIZE_KB || '1024', 10) * 1024;

  constructor() {
    this.checkLogRotation(this.logLevel);
    this.checkLogRotation(this.errorFile);
  }
  log(message: any, ...optionalParams: any[]) {
    this.writeLog('INFO', this.logFile, message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeLog('WARN', this.logFile, message, optionalParams);
  }

  error(message: any, trace?: string, ...optionalParams: any[]) {
    const errorMessage = `${message}${trace ? '\nTrace: ' + trace : ''}`;
    this.writeLog('ERROR', this.errorFile, errorMessage, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    if (this.logLevel === 'debug') {
      this.writeLog('DEBUG', this.logFile, message, optionalParams);
    }
  }

  verbose?(message: any, ...optionalParams: any[]) {
    if (['debug', 'verbose'].includes(this.logLevel)) {
      this.writeLog('VERBOSE', this.logFile, message, optionalParams);
    }
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
