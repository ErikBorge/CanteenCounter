/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';
import $ from 'jquery';
import '../server/historicaldata';

function getText(today, yesterday){
  var text = "";
  var cases = ["A diminished amount compared to yesterday",
                "Slightly less than yesterday",
                "About the same as yesterday",
                "A tad more than yesterday",
                "A lot more than yesterday"];
  var many = ["There's people everywhere! "];
  var few = ["There's basically noone there... "];
  var cases2 = ["Happy hour! Totally empty.", "There's basically nobody here.", "There's a few, but still ok.", "Starting to fill up now.", "I would consider waiting a bit.", "There's people everywhere! Don't go to lunch now."];
  if (today==-1 && yesterday==-1){
    text+="Canteen closed..."
  }
  else{
      if (today == 0){text+=cases2[0]; return text;}
      else if (today<7 && today>0){text+= cases2[1]; return text;}
      else if (today>=7 && today<13){text+= cases2[2]; return text;}
      else if (today>=13 && today<23){text+= cases2[3]; return text;}
      else if (today>=23 && today<30){text+= cases2[4]; return text;}
      else if (today>=30){text+= cases2[5]; return text;}
    }

  //   if (today >=30){
  //     text+=many[0];
  //   }
  //   if (today <=7){
  //     text+=few[0];
  //   }
  //   var diff = today-yesterday;
  //   if (diff<-10){text+=cases[0];}
  //   else if (diff<-5 && diff>=-10){text+=cases[1];}
  //   else if (diff<5 && diff>=-5){text+=cases[2];}
  //   else if (diff<10 && diff>=5){text+=cases[3];}
  //   else if (diff>10){text+=cases[4];}
  // }
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
    if (people>30){people=30};
    var value = people/30;

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
  // setTimeout(function(){
  //   odometer.innerHTML = 5;
  //   // var elem = document.getElementById("odometer");
  //   // elem.style.color = "#A5D5A4";
  //   window.odometerOptions = {
  //     //auto: false, // Don't automatically initialize everything with class 'odometer'
  //     //selector: '.my-numbers', // Change the selector used to automatically find things to be animated
  //     //format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
  //     duration: 30000, // Change how long the javascript expects the CSS animation to take
  //     //theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
  //     //animation: 'count' // Count is a simpler animation method which just increments the value,
  //                        // use it when you're looking for something more subtle.
  //   };
  // }, 500);

  var el = document.querySelector('.om');

  var od = new Odometer({
    el: el,
    value: 9,
    duration: 3000
    // Any option (other than auto and selector) can be passed in here
    //format: '',
    //theme: 'digital'
  });

  //od.update(0)
  // or
  el.innerHTML = 0

  var t = setTimeout(function(){
    $(".loader").fadeOut(500, function(){
      $(".content").fadeIn(500);
    });
  }, 3500)


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
    //$("#day").text("A typical "+weekday);
    //moveBar(timeHours,timeMinutes);
  }, 100);

  //var number = 30;
  //$("#count").text(number);
  setInterval(function() {
    $.ajax({
      url: "http://cantina-counter-backend.herokuapp.com/api/v1/fetchNumberOfPeopleInLine",
    })
    .done(function( data ) {
      var date = new Date();
      var hours = checkTime(date.getHours());
      $("#count").text(data.data);
      const numberOfPeople = data.data;
      var elem = document.getElementById("count");
      elem.style.color = rgb(getCountColor(numberOfPeople));
      if (hours<11 || hours>=13){
       $("#count").text(data.data);
       $("#pun").text(getText(-1, -1));
      }
      else {
        $("#pun").text(getText(numberOfPeople, 0));
      }
    });
  }, 3000);

})();
