import * as https from 'https';

const REQUEST_METHOD = 'POST';
const API_HOST = 'http-intake.logs.datadoghq.com';
const BASE_PATH = '/v1/input';
const HTTPS_PORT = 443;
const OK_CODE = 200;

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

  request(hostname: string, path: string, data: any): Promise<any> {
    const options = {
      method: REQUEST_METHOD,
      hostname,
      path,
      port: HTTPS_PORT,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
      },
    };
    const stringData = JSON.stringify(data);

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        if (res.statusCode !== OK_CODE) {
          console.log('unexpected status code', res.statusCode);
          return reject(res);
        }

        return resolve(res);
      });

      req.on('error', reject);
      req.write(stringData);
      req.end();
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
