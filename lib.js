
'use strict';

module.exports = rename;

/**
 * Check whether an object is Array or not
 *
 * @type Boolean
 * @param {object} subject is the variable that is
 * tested for Array identity check
 * @see http://www.shamasis.net/2011/08/infinite-ways-to-detect-array-in-javascript/
 */
var isArray = (function () {
    // Use compiler's own isArray when available
    if (Array.isArray) {
        return Array.isArray;
    }

    // Retain references to variables for performance
    // optimization
    var objectToStringFn = Object.prototype.toString,
        arrayToStringResult = objectToStringFn.call([]);

    return function (subject) {
        return objectToStringFn.call(subject) === arrayToStringResult;
    };
}());

/**
 * Actually rename object's keys
 *
 * @param {obj} object whose keys are to be renamed
 * @param {level} maximum depth within the object the renaming is done
 * @param {current} depth level from the top
 * @param {fn} function to be applied for renaming
 * @return {Object} new object with renamed keys
  */
function renameObject(obj, level, current, fn) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (level === -1 || current < level) {
        if (typeof obj[key] !== "object") {
          newObj[fn(key) || key] = obj[key];
        } else {
          newObj[fn(key) || key] = renameAnyObject(obj[key],
                                                   level, current+1,
                                                   fn);
        }
      } else {
        newObj[fn(key) || key] = obj[key];
      }
    }
  }

  return newObj;
}

/**
 * Manage the type of action to be taken on object. The type of object (array
 * or object) is kept.
 *
 * @param {obj} object whose keys are to be renamed
 * @param {level} maximum depth within the object the renaming is done
 * @param {current} depth level from the top
 * @param {fn} function to be applied for renaming
 * @return {Object} new object with renamed keys
 */
function renameAnyObject(obj, level, current, fn) {
  if (typeof obj !== "object") {
    throw new Error('Expects an object (or array object)');
  }

  if (isArray(obj)) {
    // Treat as array
    var res = [];
    for (let s of obj) {
      if (typeof s != "object") {
        res.push(s);
      } else {
        var newObj = renameObject(s, level, current, fn);
        res.push(newObj);
      }
    }
    return res;
  } else {
    // Treat as object
    return renameObject(obj, level, current, fn);
  }
}

/**
 * Rename object's keys recursively up to a depth level
 * @param {obj} object whose keys are to be renamed
 * @param {fn} function to be applied for renaming
 * @param {level} maximum depth within the object the renaming is done. Default
 * value recursively rename the keys in an object.
 * @return {Object} new object with renamed keys
 */
function rename(obj, fn, level) {
  if (typeof fn !== 'function') {
    return obj;
  }

  level = typeof level !== 'undefined' ? level : -1;

  return renameAnyObject(obj, level, 0, fn);
}


