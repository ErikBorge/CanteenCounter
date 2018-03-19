/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';
import $ from 'jquery';
//import '../server/SERVERindex.js';

// ================================
// START YOUR APP HERE
// ================================

function checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
}

function timeProgress(hours, minutes){
  if (hours>17 && hours<19){
    return ((hours-17)*60+minutes)/120;
  }
  else {return 0;}
}

function moveBar(hours, minutes) {
  var elem = document.getElementById("bar");
  var width = timeProgress(hours,minutes);
  if (width == 0) {elem.style.width = 0 + '%'}
  else {elem.style.width = width*100 + '%';}
  elem.style.height = 5+'px';
  elem.style.color = '#FFFFFF';
}

(() => {
  console.log("hello world");
  console.log($('#number').text());

  setInterval(function() {
    var date = new Date();
    // var weekdays = new Array(7);
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekday = weekdays[date.getDay()];
    var timeHours = checkTime(date.getHours());
    var timeMinutes = checkTime(date.getMinutes());
    var timeSeconds = checkTime(date.getSeconds());

    $("#time").html(timeHours + ":" + timeMinutes);
    $("#day").text("A typical "+weekday);
    moveBar(timeHours,timeMinutes);
  }, 100);




  //const numberOfPeople = Object.keys(nextProps.content.people) ? Object.keys(nextProps.content.people).length : 0;
  //$("people").html(numberOfPeople);


})();
