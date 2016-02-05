'use strict';

module.exports = function parseDate(date) {
  var d = date.format('YYYYMMDDTHHMM').concat("00Z");
  return d;
};
