/*
 * winston-fluent-test.js: Tests for instances of the Fluent transport
 *
 * (C) 2013 Hironori Takahashi
 * MIT LICENSE
 *
 */

var vows    = require('vows');
var assert  = require('assert');
var winston = require('winston');
var helpers = require('winston/test/helpers');
var Fluent  = require('../lib/winston-fluent').Fluent;

function assertFluent (transport) {
  assert.instanceOf(transport, Fluent);
  assert.isFunction(transport.log);
};

var transport = new Fluent({ tag: 'winston', label: 'fluent' });

vows.describe('winston-fluent').addBatch({
 "An instance of the Fluent Transport": {
   "should have the proper methods defined": function () {
     assertFluent(transport);
   },
   "the log() method": helpers.testNpmLevels(transport, "should respond with true", function (ign, err, logged) {
     assert.isNull(err);
     assert.isTrue(logged);
   })
 }
}).export(module);