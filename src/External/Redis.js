// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE
'use strict';

var Redis = require("redis");
var Bluebird = require("bluebird");

function make() {
  var client = Redis.createClient();
  Bluebird.promisifyAll(client);
  return client;
}

exports.make = make;
/* redis Not a pure module */