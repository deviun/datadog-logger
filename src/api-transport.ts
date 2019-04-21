import * as request from 'request';

const API_METHOD = 'POST';
const API_PROTO = 'https://';
const API_HOST = 'http-intake.logs.datadoghq.com';
const BASE_PATH = 'v1/input';

interface sendT {
  level: string;
  service: string;
  source: string;
  hostname: string;
  tags: string;
  message: any;
}

export class ApiTransport {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  request(hostname: string, path: string, data: any) {
    const options = {
      method: API_METHOD,
      url: [API_PROTO, hostname, '/', path].join(''),
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: data,
      json: true,
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        return resolve(body);
      });
    });
  }

  async send({
    level,
    service,
    source,
    hostname,
    tags,
    message,
  }: sendT) {
    return this.request(
      API_HOST,
      `${BASE_PATH}/${this.apiKey}`, {
        ddsource: source,
        ddtags: tags,
        service,
        hostname,
        level,
        message,
      }
    );
  }
}
