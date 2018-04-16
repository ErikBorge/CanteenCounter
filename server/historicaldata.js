// // Data retrieved from http://vikjavev.no/ver/index.php?spenn=2d&sluttid=16.06.2015.
// //var Highcharts = require('highcharts');
//
// // Load module after Highcharts is loaded
// //require('highcharts/modules/exporting')(Highcharts);
//
// // Create the chart
// // Data retrieved from http://vikjavev.no/ver/index.php?spenn=2d&sluttid=16.06.2015.
//
// // Data retrieved from http://vikjavev.no/ver/index.php?spenn=2d&sluttid=16.06.2015.
//
//
// Highcharts.chart('graph', {
//     chart: {
//         type: 'spline',
//         backgroundColor: 'black',
//         marginLeft:18,
//         marginRight:18,
//     },
//     title: null,
//     xAxis: {
//         type: 'datetime',
//         labels: {
//     					step: 2,
//               style: {
//               	color: 'white',
//               	fontSize: '15px'
//               }
//         },
//         tickAmount: 0,
//         gridLineWidth: 0,
//         lineWidth: 0,
//         tickWidth: 0,
//         plotBands: {
//         			borderWidth: 0,
//         },
//     },
//     yAxis: {
//         title: null,
//         gridLineWidth: null,
//     		labels: {enabled: false},
//         softMax: 40,
//     		softMin: 0,
//     },
//
//     legend: {enabled: false},
//     tooltip: {
//     	crosshair: false,
//     	borderWidth: 0,
//       borderRadius: 20,
//       style:{
//       	textAlign: 'center',
//         fontSize: '20px'
// 			},
//       useHTML: true,
//     	headerFormat: '',//'<table>',
//     	//pointFormat: '<tr><td style="text-align: center"><b>{point.y}</b></td></tr>',
//     	//valueSuffix: ' <tr><td><br>people</td></tr></table>'
//       pointFormat: '<b>{point.y}</b>',
//     	valueSuffix: '<br>people'
//     },
//     plotOptions: {
//         spline: {
//             lineWidth: 3,
//             states: {
//                 hover: {
//                 		marker: {
//                     	symbol: "circle"
//                     }
//                     //lineWidth: 5
//                 }
//             },
//             marker: {
//                 enabled: false
//             },
//             pointInterval: 300000, // 5 minutes
//             pointStart: Date.UTC(2018, 2, 22, 11, 0, 0)
//         },
//         series: {
//        		color: {
//         		linearGradient: [0,0,0,0],
//                 stops: [        //normal colors
//                 		[0, '#F48385'],
//                     [0.5, '#ECD4A3'],
//                     [1, '#A5D5A4']
//                 		]
//          				}},
//     },
//     series: [
//     {
//         name: null,
//         label: {enabled: false},
//         data: [
//             10, 15, 22, 20, 25, 33, 30, 24, 22, 18,
//             12, 10, 5, 7, 3, 8, 13, 17, 20, 17,
//             13, 8, 9, 6,
//             0
//         ],
//     },
//     // {
//     //     name: null,
//     //     label: {enabled: false},
//     //     lineWidth: 2,
//     //     dashStyle: 'ShortDash',
//     //     //color: 'white',
//     //     data: [
//     //     		8, 10, 13, 10, 15, 14, 9, 20, 21, 14, 10
//     //     ],
//     // },
//     ],
//
//     navigation: {
//         buttonOptions: {
//         enabled: false
//         }
//     }
// },
// function() {
//   this.update({
//   plotOptions:{
//   	series: {
//     	color: {
//       	linearGradient: [0, 0, 0, this.plotHeight]
//     	}}},
//   });
// }
//
// // function() {
// //   var series = this.series[1];
// // 	var last_point = series.data[series.data.length];
// //    //Update previous point to not show marker
// // 	last_point.update({
// // 		marker: {
// // 			enabled: true
// // 		}
// // });
// // }
//
// );
