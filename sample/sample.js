var winston = require('winston');
require('../lib/winston-fluent').Fluent;
winston.add(winston.transports.Fluent, { tag: 'sakamoto', label: 'san' });
winston.info('hogehoge');
