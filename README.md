# rename-keys-multidepth [![NPM version](https://badge.fury.io/js/rename-keys-multidepth.png)](http://badge.fury.io/js/rename-keys-multidepth)

Modify the names of the key properties (keys) of an object util a defined level of depth.

Bugs? [Please create an issue](https://github.com/jlanza/rename-keys-multidepth/issues). Be aware that this is one of my first Javascript, so it is keen to be better coded ;)

## Quickstart


## Usage

```js
var rename = require('rename-keys-multidepth');
rename(object, function, level);
```

**Arguments**
* `object {Object}`: the object to iterate over.
* `function {Function}`: the function to use to rename each own enumerable property of `object`.
* `level {Integer}`: the maximum level the renaming is done. By default is set to rename in the whole object. Level count starts by 0.

## Example
```js

var toBeChanged = [
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
  'name': ['id', 'name']
},
{
  'name': ['level', {'name': 'bar'}]
}
];

var replaceName = function (key) {
  return (key === 'name') ? 'changed' : key;
}

console.log(replaceName(toBeChanged, replaceName));
```

## Authors
Jorge Lanza

## Licence
Copyright (c) 2016, Jorge Lanza. Released under the MIT license

## Acknowledgments
Thanks to [Jon Schlinkert](https://github.com/jonschlinkert/) for providing the basics to start this small project.

Thanks to [Shamasis Bhattacharya](http://www.shamasis.net/) from one of his his [blog posts](http://www.shamasis.net/2011/08/infinite-ways-to-detect-array-in-javascript/) I took the `isArray()` function.
