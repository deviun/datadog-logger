import { ApiTransport } from './api-transport';
import { stdout } from './stdout';

interface DatadogLoggerConstructorT {
  apiKey: string;
  logLevel?: string;
  service?: string;
  source?: string;
  hostname?: string;
  tags?: any;
  allowStdout?: boolean;
  stdoutOnly?: boolean;
}

const levelInt = {
  off: 0,
  fatal: 1,
  error: 2,
  warn: 3,
  info: 4,
  debug: 5,
  trace: 6,
  all: 7,
};

const DEFAULT_LOG_LEVEL = 'info';
const DEFAULT_HOST = 'localhost';
const DEFAULT_SERVICE = 'nodejs-project';
const DEFAULT_SOURCE = 'nodejs-script';
const DEFAULT_TAGS = {};

export class DatadogLogger {
  apiTransport: ApiTransport;
  level: string;
  service: string;
  source: string;
  hostname: string;
  tags: string;
  allowStdout: boolean;
  stdoutOnly: boolean;

  constructor({
    apiKey,
    logLevel = DEFAULT_LOG_LEVEL,
    service = DEFAULT_SERVICE,
    source = DEFAULT_SOURCE,
    hostname = DEFAULT_HOST,
    tags = DEFAULT_TAGS,
    allowStdout = false,
    stdoutOnly = false,
  }: DatadogLoggerConstructorT) {
    if (!apiKey) {
      throw new Error('Datadog api key not found');
    }

    this.level = logLevel;
    this.source = source;
    this.service = service;
    this.hostname = hostname;
    this.tags = tags;
    this.allowStdout = allowStdout;
    this.stdoutOnly = stdoutOnly;

    this.apiTransport = new ApiTransport(apiKey);
  }

  async log(fromLevel: string, ...args: any) {
    const {
      level,
      service,
      source,
      hostname,
      tags,
    } = this;

    if (!DatadogLogger.allowLevelLogging(fromLevel, level)) {
      return;
    }

    const message = DatadogLogger.createMessage(args);

    if (!message) {
      return;
    }

    if (this.allowStdout) {
      stdout(new Date(), fromLevel, message);
    }

    if (this.stdoutOnly) {
      // prevent sending to datadog
      return;
    }

    return this.apiTransport.send({
      level: fromLevel,
      service,
      source,
      hostname,
      tags: DatadogLogger.tagsToExternal(tags),
      message,
    });
  }

  async error(...args: any) {
    return this.log('error', ...args);
  }

  async info(...args: any) {
    return this.log('info', ...args);
  }

  async debug(...args: any) {
    return this.log('debug', ...args);
  }

  async warn(...args: any) {
    return this.log('warn', ...args);
  }

  async fatal(...args: any) {
    return this.log('fatal', ...args);
  }

  async trace(...args: any) {
    return this.log('trace', ...args);
  }

  static tagsToExternal(tags: any): string {
    return Object
      .keys(tags)
      .map((key) => {
        const value = tags[key]
          .replace(/:/g, '\\:')
          .replace(/,/g, '\\,')
          .trim();

        return `${key}:${value}`;
      }, [])
      .join(',');
  }

  static allowLevelLogging(levelFrom: string, levelTo: string): boolean {
    const levelFromInt = levelInt[levelFrom];
    const levelToInt = levelInt[levelTo];

    return levelFromInt <= levelToInt;
  }

  static createMessage(args: any[]): any {
    let message;

    if (!args.length) {
      return null;
    }

    const prepareErrors = (item: any) => {
      if (item instanceof Error) {
        return item.stack;
      }

      return item;
    };

    if (args.length === 1) {
      ([message] = args);

      return prepareErrors(message);
    } else {
      message = args;
    }

    return message.map(item => prepareErrors(item));
  }
}
