interface sendT {
    level: string;
    service: string;
    source: string;
    hostname: string;
    tags: string;
    message: any;
}
export declare class ApiTransport {
    apiKey: string;
    constructor(apiKey: string);
    request(hostname: string, path: string, data: any): Promise<any>;
    send({ level, service, source, hostname, tags, message, }: sendT): Promise<any>;
}
export {};
