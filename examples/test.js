const { DatadogLogger } = require('../dist/index');

const log = new DatadogLogger({
  logLevel: 'all',
  apiKey: process.env.API_KEY,
  allowStdout: true,
  service: 'datadog-demo',
  source: 'example',
  hostname: 'macbook',
  tags: {
    platform: 'node',
    language: 'typescript',
  },
});

log.info('Test info');
log.error('Test Error', new Error('EEEEERRRROOORR'));
log.fatal('fatal!!!');
log.debug('you are here', {
  anyObject: true,
});
