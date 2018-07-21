// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE
'use strict';

var Env = require("./Env.js");
var Util = require("./Util.js");
var Npmlog = require("npmlog");
var Process = require("process");
var Arangojs = require("arangojs");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

var db = new Arangojs.Database().useBasicAuth(Env.dbUser, Env.dbPass).useDatabase(Env.dbName);

function createDatabase() {
  return db.createDatabase(Env.dbName).then((function (result) {
                  return Promise.resolve((Npmlog.info("Database", "Created database:", result), /* () */0));
                })).catch((function (error) {
                Npmlog.error("Database", "Exiting due to error creating database:", error);
                return Promise.resolve((Process.exit(1), /* () */0));
              }));
}

function ensureDatabase() {
  return db.exists().then((function (exists) {
                if (exists) {
                  Npmlog.info("Database", "Database exists:", Env.dbName);
                  return Promise.resolve(/* () */0);
                } else {
                  Npmlog.info("Database", "Attempting to create database:", Env.dbName);
                  return createDatabase(/* () */0);
                }
              }));
}

function createCollection(collection) {
  return collection.create().then((function (result) {
                  Npmlog.info("Database", "Created collection:", result);
                  return Promise.resolve(collection);
                })).catch((function (error) {
                Npmlog.error("Database", "Exiting due to error creating collection:", error);
                Process.exit(1);
                return Promise.resolve(collection);
              }));
}

function ensureCollection(collectionName) {
  var collection = db.collection(collectionName);
  return collection.exists().then((function (exists) {
                if (exists) {
                  Npmlog.info("Database", "Collection exists:", collectionName);
                  return Promise.resolve(db);
                } else {
                  Npmlog.info("Database", "Attempting to create collection:", collectionName);
                  return createCollection(collection).then((function () {
                                return Promise.resolve(db);
                              }));
                }
              }));
}

function setup() {
  return ensureDatabase(/* () */0).then((function () {
                return ensureCollection("blocks");
              }));
}

function getLargestBlockNum() {
  return db.query("\nFOR block IN blocks\nSORT block.block_num DESC\nLIMIT 1\nRETURN block.block_num\n").then((function (prim) {
                  return prim.next();
                })).then((function (json) {
                return Promise.resolve(Belt_Option.getWithDefault(Belt_Option.getWithDefault(Belt_Option.map((json == null) ? undefined : Js_primitive.some(json), (function (param) {
                                          return Json_decode.optional(Json_decode.$$int, param);
                                        })), undefined), 0));
              }));
}

function saveBlock(isIrreversible, json) {
  Util.doNothing(isIrreversible);
  ((json._key = json.block_num + ""));
  ((json.irreversible = isIrreversible));
  var saveOpts = {
    overwrite: true
  };
  return db.collection("blocks").save(json, saveOpts);
}

exports.db = db;
exports.createDatabase = createDatabase;
exports.ensureDatabase = ensureDatabase;
exports.createCollection = createCollection;
exports.ensureCollection = ensureCollection;
exports.setup = setup;
exports.getLargestBlockNum = getLargestBlockNum;
exports.saveBlock = saveBlock;
/* db Not a pure module */