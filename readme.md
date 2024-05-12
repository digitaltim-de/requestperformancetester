## Performance tester ##

This is a simple http request response performance tester. It is designed to test the performance of a web server by sending a large number of requests to it and measuring the response time.


### Usage ###

The tester is a command line tool. It takes the following arguments:

```bash
node index.js --url=https://httpbin.org/ --persecond=10 --maxseconds=2 --concurrency=1
```