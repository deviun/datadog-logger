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
    log(fromLevel: string, ...args: any): Promise<{}>;
    error(...args: any): Promise<{}>;
    info(...args: any): Promise<{}>;
    debug(...args: any): Promise<{}>;
    warn(...args: any): Promise<{}>;
    fatal(...args: any): Promise<{}>;
    trace(...args: any): Promise<{}>;
    static tagsToExternal(tags: any): string;
    static allowLevelLogging(levelFrom: string, levelTo: string): boolean;
    static createMessage(args: any[]): any;
}
export {};
