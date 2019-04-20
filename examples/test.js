const { DatadogLogger } = require('../dist/index');

const log = new DatadogLogger({
  logLevel: 'info',
  apiKey: process.env.API_KEY,
  allowStdout: true,
});

log.info('Test info');
log.error('Test Error', new Error('EEEEERRRROOORR'));
log.fatal('fatal!!!');
log.debug('your are here');
