'use strict';

module.exports = function parseTrigger(time) {
  var m;

  switch (time.str) {
    case "minutes":
        m = "M";
        break;
    case "hours":
        m = "H";
        break;
    case "days":
        m = "D";
        break;
    case "weeks":
        m = "W";
      break;
  }

  return "-P" + time.num + m;
};
