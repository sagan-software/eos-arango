// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE
'use strict';

var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function Make(I) {
  var count = function () {
    return I[/* client */0].scardAsync(I[/* name */1]);
  };
  var push = function (nums) {
    return I[/* client */0].saddAsync(I[/* name */1], Belt_Array.map(nums, (function (prim) {
                      return String(prim);
                    })));
  };
  var pop = function () {
    return I[/* client */0].spopAsync(I[/* name */1]).then((function (num) {
                  return Promise.resolve(Belt_Option.map((num == null) ? undefined : Js_primitive.some(num), Caml_format.caml_int_of_string));
                }));
  };
  return /* module */[
          /* count */count,
          /* push */push,
          /* pop */pop
        ];
}

exports.Make = Make;
/* No side effect */
