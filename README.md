# winston-fluent

A fluent transport for [winston][0].

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
  // Requiring `winston-fluent` will expose 
  // `winston.transports.Fluent`
  //
  require('winston-syslog').Fluent;
  
  winston.add(winston.transports.Fluent, options);
```

The Fluent transport uses [fluent-logger](https://github.com/yssk22/fluent-logger-node). Options are following and will be passed to it.

* __tag:__ Required. Tag of fluent-logger. This will be used as the first parameter of FluentSender constructor.
* __options:__ Optional. Params to connect to fluent.(ex. { host: 'localhost', port: 24224, timeout: 3.0, verbose: false }) This will be used as the second parameter of FluentSender constructor.
* __label:__ Required. Label of each log. 

[0]: https://github.com/indexzero/winston