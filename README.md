# Datadog Logger (alpha)
[![datadog-logger](https://img.shields.io/npm/v/datadog-logger.svg?style=flat-square)](https://www.npmjs.com/package/datadog-logger/)

You've small project and wanna logging to cloud service, but do not wanna install graylog or another logging agent?

Store your logs at [Datadog](https://www.datadoghq.com/) via `datadog-logger`. It's simple.

## Install

```bash
npm i datadog-logger
```

## Create logger

```javascript
import { DatadogLogger } from 'datadog-loggrer';

const log = new DatadogLogger({
  logLevel: 'info',
  apiKey: process.env.DATADOG_API_KEY,
  allowStdout: true,
  source: 'service-name',
  hostname: 'service-host',
  tags: {
    platform: 'node',
    language: 'typescript',stdoutOnly
  },
});
```

## Use

```javascript
log.info('Hello world!');
log.warn('Warning!');
log.error('some error', new Error('bad code'));
log.debug('2 + 2 =', 2 + 2);
```

## Look logs at Datadog

![datadog-interface](https://pp.userapi.com/c849532/v849532525/175e4b/0i0MTkqMlCQ.jpg)

## Options

| Name        | Type | Required | Default  |
| ------------- | ------------- | :-------------:| -----:|
| apiKey      | string | No | null |
| logLevel       | string | No  |  'info' |
| source |  string | No  |  'nodejs-script' |
| hostname |  string | No  |  'localhost' |
| allowStdout |  boolean | No  |  false |
| stdoutOnly |  boolean | No  |  false |
