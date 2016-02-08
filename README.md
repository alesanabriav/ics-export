# ICS Export

A Simple json to ical export file

## Installation

    npm install --save ics-export

## API Usage
    var calendarOpts = {
      prodid: "-//DEVELOPERSOUL//DEVELOPERSOUL Calendar//ES",
      name: "DeveloperSoul Calendar",
      timezone: "America/Bogota"
    };

    var events = [
      {
        title: "test from ics export",
        location: "My House",
        alerts: [
          {
            description: "this is for remember you that you have an appoinment in 1 hour",
            trigger: {
              num: 1,
              str: "hours"
            }
          },
          {
            description: "this is for remember you that you have an appoinment in 2 days",
            trigger: {
              num: 2,
              str: "days"
            }
          }
        ]
      },
      {
        title: "My own calendar",
        location: "Mr white house's",
        alerts: [
          {
            description: "this is for remember you that you have an appoinment in 1 day",
            trigger: {
              num: 1,
              str: "days"
            }
          },
          {
            description: "this is for remember you that you have an appoinment in 2 hours",
            trigger: {
              num: 2,
              str: "hours"
            }
          }
        ]
      }
    ];

## Example
1. Clone the package

    git clone https://github.com/developersoul/ics-export.git

2. Open the folder

    cd ics-export

3. Run the example

    node example

## Inspired on
[ICS](https://github.com/adamgibbons/ics)

