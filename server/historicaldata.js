// Data retrieved from http://vikjavev.no/ver/index.php?spenn=2d&sluttid=16.06.2015.
//var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);

// Create the chart
// Data retrieved from http://vikjavev.no/ver/index.php?spenn=2d&sluttid=16.06.2015.

// Data retrieved from http://vikjavev.no/ver/index.php?spenn=2d&sluttid=16.06.2015.

Highcharts.chart('graph', {
    chart: {
        type: 'spline',
        backgroundColor: 'black',
        marginLeft:18,
        marginRight:18
    },
    title: null,
    xAxis: {
        type: 'datetime',
        labels: {
    //        overflow: 'justify'
    					step: 2,
              style: {
              	color: 'white',
              	fontSize: '15px'
              }

        },
    		//lineWidth: null,
        tickAmount: 0,
        gridLineWidth: null,
        crosshair: {
              color: 'white'
        },

    },
    yAxis: {
        title: null,
    //    minorGridLineWidth: 0,
        	gridLineWidth: null,
    //    alternateGridColor: null,
    		labels: {enabled: false}
    },
    legend: {enabled: false},
    tooltip: {valueSuffix: ' people'},
    plotOptions: {
        spline: {
            lineWidth: 4,
            states: {
                hover: {
                    //lineWidth: 5
                }
            },
            marker: {
                enabled: false
            },
            pointInterval: 300000, // 5 minutes
            pointStart: Date.UTC(2018, 2, 22, 11, 0, 0)
        }
    },
    series: [{
        name: null,
        label: {
        		enabled: false
        },
        color: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                //stops: [      //Web-colors
                //    [0, '#F59799'],
                //    [0.5, '#FDCD9A'],
                //    [1, '#99CC99']
                //]
                stops: [        //normal colors
                		[0, '#F48385'],
                    [0.5, '#ECD4A3'],
                    [1, '#A5D5A4']
                ]
            },
        data: [
            10, 15, 22, 20, 25, 33, 30, 24, 22, 18,
            12, 10, 5, 7, 3, 8, 13, 17, 20, 17,
            13, 8, 9, 6,
            0
        ]
    }],
    navigation: {
        menuItemStyle: {
            fontSize: '10px'
        }
    }
});
