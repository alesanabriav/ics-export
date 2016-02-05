'use strict';
var moment = require('moment');
var replacePlaceholder = require('./lib/replacePlaceholder');
var parseDate = require('./lib/parseDate');
var parseTrigger = require('./lib/parseTrigger');

function setCalendar(options, events) {
  var calendar = [];
  var i;
  calendar.push("BEGIN:VCALENDAR");
  calendar.push("PRODID:" + options.prodid);
  calendar.push("VERSION:2.0");
  calendar.push("X-WR-CALNAME:" + options.name); // 1234@company.com
  calendar.push("X-WR-TIMEZONE:" + options.timezone); //America/Bogota
  calendar.push("PLACEHODER-EVENTS");
  calendar.push("END:VCALENDAR");
  calendar = replacePlaceholder(calendar, "PLACEHODER-EVENTS" , events);
  return calendar.join('\r\n');
}

function setAlarm(a) {
  var alarm = [];
  var trigger = parseTrigger(a.trigger) || "1H";
  alarm.push("BEGIN:VALARM");
  alarm.push("ACTION:DISPLAY");
  alarm.push("DESCRIPTION:" + a.description);
  alarm.push("TRIGGER:" + trigger);
  alarm.push("END:VALARM");
  return alarm.join('\r\n');
}

function setAlarms(alarms) {

  var result = alarms.map(function(alarm) {
    return setAlarm(alarm);
  });

  return result.join('\r\n');
}

function setEvent(e) {
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

  event = replacePlaceholder(event, "PLACEHODER-ALERTS", setAlarms(e.alerts));
  return event.join('\r\n');
}

function setEvents(options, events) {
  var result = events.map(function(event) {
    return setEvent(event);
  });

  var eventsResults = result.join('\r\n');
  return setCalendar(options, eventsResults);
}

module.exports = {
  setEvents: setEvents
}
