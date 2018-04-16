/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';
import $ from 'jquery';
import '../server/historicaldata';

var yesterdaysNumberOfPeople = -4;

function getText(today, yesterday){
  var text = "";
  var cases = ["A diminished amount compared to yesterday",
                "Slightly less than yesterday",
                "About the same as yesterday",
                "A tad more than yesterday",
                "A lot more than yesterday"];
  var many = ["The place is packed! ","There's people everywhere! "];
  var few = ["There's basically noone there... "];

  if (today >=30){
    text+=many[1];
  }
  if (today <=7){
    text+=few[0];
  }
  var diff = today-yesterday;
  if (diff<-10){text+=cases[0];}
  else if (diff<-5 && diff>=-10){text+=cases[1];}
  else if (diff<5 && diff>=-5){text+=cases[2];}
  else if (diff<10 && diff>=5){text+=cases[3];}
  else if (diff>10){text+=cases[4];}
  return text;
}

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

  $.ajax({
    url: "http://cantina-counter-backend.herokuapp.com/api/v1/fetchMenu",
  })
  .done(function( data ) {
    $("#lunch").text(data.data.lunch);
    $("#soup").text(data.data.soup);
    $("#vegetar").text(data.data.vegetar);
    //console.log(data.data.lunch);
    // console.log(data.data.soup);
    // console.log(data.data.vegetar);

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

  //var number = 30;
  //$("#count").text(number);
  setInterval(function() {
    $.ajax({
      url: "http://cantina-counter-backend.herokuapp.com/api/v1/fetchNumberOfPeopleInLine",
    })
    .done(function( data ) {
      $("#count").text(data.data);
      const numberOfPeople = data.data;
      var elem = document.getElementById("count");
      elem.style.color = rgb(getCountColor(numberOfPeople));
      $("#pun").text(getText(numberOfPeople, yesterdaysNumberOfPeople));
      //console.log(numberOfPeople);

    });
  }, 1510);

})();
