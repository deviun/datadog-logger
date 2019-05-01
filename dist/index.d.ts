import { ApiTransport } from './api-transport';
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
export declare class DatadogLogger {
    apiTransport: ApiTransport;
    level: string;
    service: string;
    source: string;
    hostname: string;
    tags: string;
    allowStdout: boolean;
    stdoutOnly: boolean;
    constructor({ apiKey, logLevel, service, source, hostname, tags, allowStdout, stdoutOnly, }: DatadogLoggerConstructorT);
    log(fromLevel: string, ...args: any): Promise<any>;
    error(...args: any): Promise<any>;
    info(...args: any): Promise<any>;
    debug(...args: any): Promise<any>;
    warn(...args: any): Promise<any>;
    fatal(...args: any): Promise<any>;
    trace(...args: any): Promise<any>;
    static tagsToExternal(tags: any): string;
    static allowLevelLogging(levelFrom: string, levelTo: string): boolean;
    static createMessage(args: any[]): any;
}
export {};
