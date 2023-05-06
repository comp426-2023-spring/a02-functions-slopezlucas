#!/usr/bin/env node
/* Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
*/ 

import minimist from 'minimist'; 
import moment from 'moment-timezone'; 

const url = 'https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone='+timezone;

const miniArgs = minimist(process.argv.slice(2)); 
const helpText = "Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n\t-h \t\tShow this help message and exit.\n\t-n, -s\t\tLatitude: N positive; S negative.\n\t-e, -w\t\tLongitude: E positive; W negative.\n\t-z\t\tTime zone: uses tz.guess() from moment-timezone by default.\n\t-d 0-6\t\tDay to retrieve weather: 0 is today; defaults to 1.\n\t-j\t\tEcho pretty JSON from open-meteo API and exit.\n"; 
if (miniArgs.h) {
  console.log(helpText); 
  process.exit(0); 
}

const latitude = miniArgs.n || (0-miniArgs.s);
const longitude = miniArgs.e || (0-miniArgs.w);
const timezone = moment.tz.guess();

// Make a request
const response = await fetch(url);

// Get the data from the request
const data = await response.json();

const days = miniArgs.d; 
const weather = data.daily.precipitation_hours[days]; 
const output = ""; 


if (days == 0) {
  console.log("today.")
} 
else if (days > 1) {
  console.log("in " + days + " days.")
} 
else {
  console.log("tomorrow.")
}