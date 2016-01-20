"use strict";

var rename = require("./");

var a = [
{
  "name": "Foo",
  "amount": 55
},
{
  "name": {
    "name": 23
  },
  "amount": 33
},
{
  "name": ["id", "name"]
},
{
  "name": ["mystring", 1, {"name": "Bar"}]
}
];

var b = {
"home": {
  "name": "Foo",
  "amount": 55
},
"jlanza": {
  "name": {
    "name": 23
  },
  "amount": 33
},
"name": {
  "name": {
    "name": 23
  },
  "amount": 33
}};

var c = [ "name"];

var d = [{
  "name": ["id", {"name": "Bar"}]
}];


function jlanza(key) {
  return (key === "name") ? "ref" : key;
}


console.log("a-----------");
console.log(rename(a, jlanza));
console.log("\n");

console.log("b---------");
console.log(rename(b, jlanza));
console.log("\n");

console.log("c---------");
console.log(rename(c, jlanza));
console.log("\n");

console.log("d-----------");
console.log(d[0].name[1]["name"]);
console.log("-----------");
var d2 = rename(d, jlanza);
console.log(d2);
console.log(d2[0].ref[1]["ref"]);
