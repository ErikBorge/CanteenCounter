var express     = require('express');
var router      = express.Router();
var cheerio = require('cheerio');
var request = require('request');

// var url = 'http://www.coor.no/serviceside-deloitte/ukens-meny/';
//
// let getCoorContent = new Promise((resolve, reject) => {
//   request(url, function(error, response, html){
//     if(!error){
//       var date = new Date();
//       var weekday = date.getDay();
//
//       let day;
//
//       switch (weekday) {
//         case 1:
//           day = 'mandag';
//           break;
//         case 2:
//           day = 'tirsdag';
//           break;
//         case 3:
//           day = 'onsdag';
//           break;
//         case 4:
//           day = 'torsdag';
//           break;
//         case 5:
//           day = 'fredag';
//           break;
//         default:
//
//       }
//
//       var tableRow = (weekday == 1) ? 1 : (weekday-1) * 5;
//       var soupRowNum = (weekday == 1) ? 1 : 2;
//       var lunchRowNum = (weekday == 1) ? 2 : 3;
//
//       var $ = cheerio.load(html);
//
//       $('.property--xhtml-string tbody > tr td').each(function(i, elem) {
//         // $(this).closest('td').each(function(i, elem) {
//           const val = $(this).text().replace(/(?:\r\n|\r|\n)/g, '').replace(' ', '').toLowerCase();
//           if(val == day){
//             const soup = $(this).parent().next().find('td:nth-child(2)').text().replace(/(?:\r\n|\r|\n)/g, '').replace(' ', '').trim();
//             const lunch = $(this).parent().next().next().find('td:nth-child(2)').text().replace(/(?:\r\n|\r|\n)/g, '').replace(' ', '').trim();
//             const vegetar = $(this).parent().next().next().next().find('td:nth-child(2)').text().replace(/(?:\r\n|\r|\n)/g, '').replace(' ', '').trim();
//             const dinner = $(this).parent().next().next().next().next().find('td:nth-child(2)').text().replace(/(?:\r\n|\r|\n)/g, '').replace(' ', '').trim();
//             resolve({ soup: soup, lunch: lunch, vegetar: vegetar, dinner: dinner });
//           }
//       });
//       reject({ "message": "nothing found" })
//     }
//   });
// });


//http://cantina-counter-backend.herokuapp.com/api/v1/fetchNumberOfPeopleInLine

/* GET home page. */
router.get('/', function(req, res, next) {
  getCoorContent.then((data) => {
      res.json(data);
  });
});

module.exports = router;
