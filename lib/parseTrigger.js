'use strict';

module.exports = function parseTrigger(time) {
  var m;
  var p = "-P";

  switch (time.str) {
    case "minutes":
        p = "-PT";
        m = "M";
        break;
    case "hours":
        p = "-PT";
        m = "H";
        break;
    case "days":
        m = "D";
        break;
    case "weeks":
        m = "W";
      break;
  }

  return p + time.num + m;
};
