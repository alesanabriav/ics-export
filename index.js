'use strict';
var moment = require('moment');
var fs = require('fs');
var path = require('path');
var TMPDIR = require('os').tmpdir();
var replacePlaceholder = require('./lib/replacePlaceholder');
var parseDate = require('./lib/parseDate');
var parseTrigger = require('./lib/parseTrigger');

function Calendar(options, events) {
  var evts = this.setEvents(events);
  this.setCalendar(options, evts);
}

Calendar.prototype.setCalendar = function(options, events) {
  this.calendar = [];
  var c = this.calendar;
  c.push("BEGIN:VCALENDAR");
  c.push("PRODID:" + options.prodid);
  c.push("VERSION:2.0");
  c.push("X-WR-CALNAME:" + options.name);
  c.push("X-WR-TIMEZONE:" + options.timezone);
  c.push("PLACEHODER-EVENTS");
  c.push("END:VCALENDAR");
  c = replacePlaceholder(c, "PLACEHODER-EVENTS", events);
};

Calendar.prototype.getCalendar = function() {
  return this.calendar.join('\r\n');
};

Calendar.prototype.setAlarm = function(a) {
  var alarm = [];
  var trigger = parseTrigger(a.trigger) || "1H";
  alarm.push("BEGIN:VALARM");
  alarm.push("ACTION:DISPLAY");
  alarm.push("DESCRIPTION:" + a.description);
  alarm.push("TRIGGER:" + trigger);
  alarm.push("END:VALARM");
  return alarm.join('\r\n');
};

Calendar.prototype.setAlarms = function(alarms) {
  var _this = this;
  var result = alarms.map(function(alarm) {
    return _this.setAlarm(alarm);
  });

  return result.join('\r\n');
};

Calendar.prototype.setEvent = function(e) {
  var event = [];
  var start = moment(e.start ) || moment();
  var startFormatted = parseDate(start);
  var end = moment(e.end) || moment().add(1, 'hour');
  var endFormatted = parseDate(end);
  var uid = e.uid || Math.random().toString(35).substr(2, 10);
  var title = e.title || "Event Title";
  var description = e.description || "";
  var location = e.location || "";

  event.push("BEGIN:VEVENT");
  event.push("DTSTART:" + startFormatted);
  event.push("DTEND:" + endFormatted);
  event.push("UID:" + uid);
  event.push("SUMMARY:" + title);
  event.push("DESCRIPTION:" + description);
  event.push("LOCATION:" + location);
  event.push("PLACEHODER-ALERTS");
  event.push("END:VEVENT");

  event = replacePlaceholder(event, "PLACEHODER-ALERTS", this.setAlarms(e.alerts));
  return event.join('\r\n');
};

Calendar.prototype.setEvents = function(events) {
  var result = events.map(function(event) {
    return this.setEvent(event);
  }.bind(this));

  return result.join('\r\n');
};

function getFile(options, events, cb) {
  var calendar = new Calendar(options, events);
  var data = calendar.getCalendar();
  var dest = path.join(TMPDIR, 'events.ics');

   fs.writeFile(dest, data, function(err) {
    if (err)return cb(err);
    return cb(null, dest);
   });
}

module.exports = getFile;
