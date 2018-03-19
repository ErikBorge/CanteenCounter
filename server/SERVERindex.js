// Dependencies
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import Express from 'express';
import path from 'path';

import { pages } from './../web/routesIndex';
import createStore from '../redux/store';
import AppRouter, { NoMatch } from '../web/Router';
import renderFullPage from '../markup';
import paths from '../../config/paths';

import initial  from '../redux/initialStore';

import gzipStatic from 'connect-gzip-static';

import axios from 'axios';

import moment from 'moment';

// var json2csv = require('json2csv');
// var fs = require('fs');
//
//
var instance = axios.create({
  baseURL: 'https://io.adafruit.com/api/v2/ErikBorge/feeds',
  timeout: 10000,
  headers: {'X-AIO-Key': '74843afaa111420ba7621d0a96ed6058'}
});

moment.locale('nb');

// cache time
const oneDay = 86400000;

// Init
const appRouter = new AppRouter();
const app = new Express();
app.set('x-powered-by', false);

// Add development hot module relacement mw?
if (process.env.NODE_ENV === 'development' && process.env.WP_HMR === 'true') require('./middlewares/hotModuleMW').default(app); // eslint-disable-line global-require

// GZIP
app.use(gzipStatic(paths.web.targetDir, { maxAge: oneDay }))

// set store, update this if version
const initStore = initial;

// set variables
const updateRate = 3000;
const oneMin = 60000;
const minTime = 2.15 * oneMin;
var startTime = moment.unix((Date.now()-3000)/1000).toISOString()
var endTime = moment.unix(Date.now()/1000).toISOString()
var people = {};

// get last updateRate interval;
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

app.get('/getPeople', function (req, res, next) {
   res.send(people)
});


// GET
app.get('*', function (req, res, next) {

  match({ routes: appRouter.render(), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) return next(err);
    if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    if (!renderProps) return null//next(new Error('renderProps was not passed to render method'));

    const currentComponent = renderProps.components[renderProps.components.length - 1];

    if (currentComponent === NoMatch) res.status(404);

    const store = createStore(initStore);

    const html = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);

    const initialState = store.getState();
    const headAssets = Helmet.rewind();
    const fullPage = renderFullPage(html, initialState, headAssets);

    res.send(fullPage);
  })
})

var port = process.env.PORT || 3000;

console.log("PORT::", port);

const server = app.listen(port, "0.0.0.0", () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Server listening on ${bind}`); // eslint-disable-line no-console
});
