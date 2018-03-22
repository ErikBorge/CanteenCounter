/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';
import $ from 'jquery';


function checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
}

function timeProgress(hours, minutes){
  if (hours>=10 && hours<12){
    return ((hours-10)*60+minutes)/120;
  }
  else {return 0;}
}

function moveBar(hours, minutes) {
  var elem = document.getElementById("bar");
  elem.style.left = timeProgress(hours,minutes)*100 + '%';
  var elem = document.getElementById("barText");
  elem.style.left = timeProgress(hours,minutes)*100 + '%';
}

(() => {
  console.log("hello world");


  $.ajax({
    url: "http://localhost:3000/api",
  })
  .done(function( data ) {
    $("#lunch").text(data.lunch);
    $("#soup").text(data.soup);
    $("#vegetar").text(data.vegetar);
    // console.log(data.lunch);
    // console.log(data.soup);
    // console.log(data.vegetar);

  });



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
    //moveBar(timeHours,timeMinutes);
  }, 100);

  setInterval(function() {
    $.ajax({
      url: "http://localhost:3000/getPeople",
    })
    .done(function( data ) {
      const numberOfPeople = Object.keys(data) ? Object.keys(data).length : 0;
      $("#count").text(numberOfPeople);
      //console.log(data);
    });
  }, 1510);




  //const numberOfPeople = Object.keys(nextProps.content.people) ? Object.keys(nextProps.content.people).length : 0;
  //$("people").html(numberOfPeople);


})();
