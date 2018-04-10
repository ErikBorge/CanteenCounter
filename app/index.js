/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';
import $ from 'jquery';
import '../server/historicaldata';


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

var getCountColor = function(people) {
    var green = [165,213,164]
    var yellow = [236,212,163]
    var red = [244,131,133]
    if (people<0){people=0};
    if (people>50){people=50};
    var value = people/50;

    if (value<=0.5){
      var colorA = green;
      var colorB = yellow;
      value /= 0.5;
    }
    else {
      var colorA = yellow;
      var colorB = red;
      value = (value - 0.5)/0.5;
    };

    return colorA.map(function(color, i) {
        return (color + value * (colorB[i] - color)) & 255;
    });
};

function rgb(values) {
    return 'rgb(' + values.join(', ') + ')';
}



(() => {
  console.log("hello world");
  //$("#container").text(container);

  $.ajax({
    url: "http://cantina-counter-backend.herokuapp.com/api/v1/fetchMenu",
  })
  .done(function( data ) {
    $("#lunch").text(data.data.lunch);
    $("#soup").text(data.data.soup);
    $("#vegetar").text(data.data.vegetar);
    console.log(data.lunch);
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
      var elem = document.getElementById("count");

      elem.style.color = rgb(getCountColor(numberOfPeople));
      //console.log(data);
    });
  }, 1510);


  console.log(getCountColor(25));






  //const numberOfPeople = Object.keys(nextProps.content.people) ? Object.keys(nextProps.content.people).length : 0;
  //$("people").html(numberOfPeople);


})();
