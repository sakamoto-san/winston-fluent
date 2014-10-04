/*
 * winston-fluent.js: Transport for outputting logs to td-agent
 *
 * (C) 2013 Hironori Takahashi
 * MIT LICENCE
 *
 */

var util         = require('util');
var fluentLogger = require('fluent-logger-node');
var winston      = require('winston');

//
// ### function fluent (options)
// #### @options {Object} Options for this instance.
// Constructor function for the fluent transport
//
var Fluent = exports.Fluent = function (options) {
  options = options || {};

  if (!options.tag){
    throw "winston-fluent requires 'tag' property";
  }

  if (!options.label){
    throw "winston-fluent requires 'label' property";
  }

  // Set transport name
  this.name = 'fluent';

  //
  // Merge the options for the target Fluent server.
  //
  this.tag     = options.tag;
  this.label   = options.label;
  this.options = options;
    
  /* fluent-logger-node to not break existing API*/
  this.options.tagPrefix = this.tag
  this.fluentSender = fluentLogger.createLogger( this.options);
};

//
// Inherit from `winston.Transport`.
//
util.inherits(Fluent, winston.Transport);

//
// Define a getter so that `winston.transports.Fluent` 
// is available and thus backwards compatible.
//
winston.transports.Fluent = Fluent;

//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Level at which to log the message.
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete. 
// Core logging method exposed to Winston. Metadata is optional.
//
Fluent.prototype.log = function (level, msg, meta, callback) {
  var self = this;
  var data;

  if (typeof meta !== 'object' && meta != null) {
    meta = { meta: meta };
  }
  
  data         = clone(meta) || {};
  data.level   = level;
  data.message = msg;

  this.fluentSender.post(this.label, data, function(err) {
    if (err) return self.emit('error', err);
    if (self.fluentSender._sendQueue.length === 0) return self.emit('logged');
  });
  
  callback(null, true);
};

//
// ### function clone (obj)
// #### @obj {Object} Object to clone.
// Helper method for deep cloning pure JSON objects
// i.e. JSON objects that are either literals or objects (no Arrays, etc)
//
function clone (obj) {
  // we only need to clone refrence types (Object)
  if (!(obj instanceof Object)) {
    return obj;
  } else if (obj instanceof Date) {
    return obj;
  }

  var copy = {};
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      copy[i] = obj[i].slice(0);
    }
    else if (obj[i] instanceof Buffer) {
      copy[i] = obj[i].slice(0);
    }
    else if (typeof obj[i] != 'function' && obj[i] !== obj) {
      copy[i] = obj[i] instanceof Object ? clone(obj[i]) : obj[i];
    }
  }

  return copy;
};
