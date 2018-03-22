const express = require('express');
const cors = require('cors');

const app = express();

/*
  import axios of html requests
  import moment for time handling
*/
import axios from 'axios';
import moment from 'moment';

/*
  create an adafruit instance
*/
var instance = axios.create({
  baseURL: 'https://io.adafruit.com/api/v2/ErikBorge/feeds',
  timeout: 10000,
  headers: {'X-AIO-Key': '74843afaa111420ba7621d0a96ed6058'}
});

/*
  set moment time to norwegian
*/
moment.locale('nb');


/*
  create variables to hold update time, start time aso
*/
const updateRate = 3000;
const oneMin = 60000;
const minTime = 2.15 * oneMin;
var startTime = moment.unix((Date.now()-3000)/1000).toISOString()
var endTime = moment.unix(Date.now()/1000).toISOString()
var people = {};

/*
  create interval that collect data from adafruit every "updateRate"
*/
setInterval(() => {
  endTime = moment.unix(Date.now()/1000).toISOString()

  try {
    instance.get(`/747586/data?start_time=${startTime}&end_time=${endTime}`)
    .then(function(response) {
      // res.send(response.data);
      startTime = endTime;
      updateList(response.data);
    })
    .catch ((error) => {
      console.log(error);
    })
  } catch(error) {
    console.log(error);
  }

}, updateRate)

/*
  update list with people in the queue
*/
function updateList(data) {
  // DELETE PEOPLE THAT HAS LEFT THE LINE

  var tmpData = Object.assign({}, people);
  let time = 0;
  let date = null;
  let currObject = null;
  let currentTime = Date.now();
  let timeInLine = 0;
  let numberOfPeople = Object.keys(tmpData).length;
  let duration = 0;

  Object.entries(tmpData).forEach((val) => {

    currObject = tmpData[val[1].id];

    if(currObject && currObject.leavingLine < currentTime) {
      delete tmpData[val[1].id];
    }
  });

  data.map((val, key) => {

    date = new Date(val.created_at); // some mock date
    time = Math.floor(date.getTime());
    duration = Math.max(1, (0.00292 * Math.pow(numberOfPeople, 2)) - (0.00756 * numberOfPeople) + 1)
    timeInLine = Math.floor(minTime * Math.min(2.5, duration));
    // timeInLine = Math.floor(minTime * Math.min(2.5, Math.pow(1.04, Object.keys(tmpData).length)));

    tmpData[val.id] = {
      id: val.id,
      time: time,
      leavingLine: time + timeInLine,
      // leavingLine: Math.floor(time * Math.min(2.5, Math.pow(1.04, Object.keys(tmpData).length))),
    }
  })

  people = tmpData;
}




// cache time
const oneDay = 86400000;


// Import routes
const api = require('./api');

app.use(cors());

app.use('/api', api);

/*
  url for the front end to get list of people
*/
app.get('/getPeople', function (req, res, next) {
   res.send(people)
});

app.set('port', 3000);
app.listen(app.get('port'), () => {
    console.log(`Node add started at http://localhost:${app.get('port')}`);
});
