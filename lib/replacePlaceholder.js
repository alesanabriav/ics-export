'use strict';

module.exports = function replacePlaceholder(arr, key, value) {
  var i = arr.indexOf(key);
  arr[i] = value || "";
  return arr;
};
