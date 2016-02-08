var icsExport = require('./index.js');

var calendarOpts = {
  prodid: "-//BVC//BVC Calendar//ES",
  name: "BVC Derivados",
  timezone: "America/Bogota",
};

var events = [
  {
    title: "test from ics export nea",
    location: "su casa",
    alerts: [
      {
        description: "this is for remember you that you have an appoinment in 1 day",
        trigger: {
          num: 1,
          str: "hours"
        }
      },
      {
        description: "this is for remember you that you have an appoinment in 1 hour",
        trigger: {
          num: 2,
          str: "days"
        }
      }
    ]
  },
  {
    title: "brand has his own calendar app",
    location: "Calle 146 # 7 - 64",
    alerts: [
      {
        description: "this is for remember you that you have an appoinment in 1 day",
        trigger: {
          num: 1,
          str: "days"
        }
      },
      {
        description: "this is for remember you that you have an appoinment in 1 hour",
        trigger: {
          num: 2,
          str: "hours"
        }
      }
    ]
  }
];


// var url = icsExport.getFile(calendarOpts, events, function(err, dest) {});

icsExport(calendarOpts, events, function(err, dest) {
  console.log(dest);
});
