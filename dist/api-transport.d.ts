interface sendT {
    level: string;
    source: string;
    hostname: string;
    tags: string;
    message: any;
}
export declare class ApiTransport {
    apiKey: string;
    constructor(apiKey: string);
    request(hostname: string, path: string, data: any): Promise<{}>;
    send({ level, source, hostname, tags, message, }: sendT): Promise<{}>;
}
export {};
