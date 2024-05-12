/**
 * Usage
 * - npm install loadtest
 * - npx ts-node load-test.ts --url=http://example.com
 */

import loadtest from 'loadtest';
import process from 'process';

const method = 'GET';

const statusCallback = (error, result, latency) => {
    console.log('Date: - URL %j - code %j', new Date().toISOString(), result.host, result.statusCode);
};

const requestGenerator = (_, options, client, callback) => {
    const request = client(options, callback);

    options.headers['Content-Type'] = 'application/json';
    options.headers.Authorization = 'some-token';
    request.end();

    return request;
};

// Extract the URL from the command line arguments
const args = process.argv.slice(2);
const urlArg = args.find(arg => arg.startsWith('--url='));
const url = urlArg?.split('=')[1];

// requestPerSecondArgs
const requestPerSecondArgs = args.find(arg => arg.startsWith('--persecond='));
const requestPerSecond = requestPerSecondArgs?.split('=')[1];

// maxSecondsArgs
const maxSecondsArgs = args.find(arg => arg.startsWith('--maxseconds='));
const maxSeconds = maxSecondsArgs?.split('=')[1];

// concurrencyArgs
const concurrencyArgs = args.find(arg => arg.startsWith('--concurrency='));
const concurrency = concurrencyArgs?.split('=')[1];

if (!url) {
    console.error('URL is required --url=http://example.com');
    process.exit(1);
}

if (!maxSeconds) {
    console.error('maxSeconds is required --maxseconds=10');
    process.exit(1);
}

if (!requestPerSecond) {
    console.error('requestPerSecond is required --persecond=10');
    process.exit(1);
}

if (!concurrency) {
    console.error('concurrency is required --concurrency=10');
    process.exit(1);
}

console.log('URL:', url);
const options = {
    url: url,
    method,
    requestsPerSecond: requestPerSecond,
    concurrency: concurrency,
    maxSeconds: maxSeconds,
    requestGenerator,
    statusCallback,
};

loadtest.loadTest(options, (error, results) => {
    if (error) {
        return console.error('Got an error: %s', error);
    }
    console.log(results);
    console.log('Tests run successfully');
});