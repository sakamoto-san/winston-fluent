# winston-fluent

[DEPRECATED]: this is no longer supported, please consider using [fluent-logger](https://github.com/fluent/fluent-logger-node#winston) instead

A [Fluentd](https://github.com/fluent/fluentd) transport for [Winston](https://github.com/flatiron/winston).

The Fluentd transport uses [fluent-logger](https://github.com/fluent/fluent-logger-node) to send logs to Fluentd over TCP.

## Installation

### Installing npm (node package manager)

``` bash
  $ curl http://npmjs.org/install.sh | sh
```

### Installing winston-syslog

``` bash
  $ npm install winston 
  $ npm install winston-fluent
```

## Usage
``` js
var winston = require('winston');

//
// Requiring `winston-fluent` exposes 
// `winston.transports.Fluent`
//
require('winston-fluent').Fluent;

winston.add(winston.transports.Fluent, options);
```

`options` should be a JavaScript object with the following key-value pairs:

* __tag:__ Required. This is the first part of the Fluentd tag.
* __label:__ Required. This is the second part of the Fluentd tag.
* __host:__ Optional (default=localhost). The host for Fluentd.
* __port:__ Optional (default=24224). The port for Fluentd.
* __timeout:__ optional (default=3.0). Socket timeout for the TCP connection to Fluentd.

So, here is a working code snippet

``` js
var winston = require('winston');
require('winston-fluent').Fluent;
winston.add(winston.transports.Fluent, { tag: "fluentd", label: "myapp" });

winston.log("error", "My great alert!");
// this logs the event { "level": "error", "message: "My great alert" } to Fluentd

winston.log("info", "Some user event", { user_id: 12938122, action: "clicked" })
// this logs the event { "level": "info", "message: "Some user event", "user_id": 12938122, "action": "clicked" } to Fluentd
```
