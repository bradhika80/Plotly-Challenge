
// a function to build Gauge chart
function BuildGaugeChart(washFrequency) {

    

    var data = [
        {
          domain: { x: [0, 9], y: [0, 9] },
          value: parseInt(washFrequency),
          title: { text: "Scrubs Per Week" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [0, 9]  },
            steps: [
              { range: [0, 1], color: "#e4fee4" , text : "0-1"},
              { range: [1, 2], color: "#befcbe" },
              { range: [2, 3], color: "#98fb98" },
              { range: [3, 4], color: "#72fa72" },
              
              { range: [4, 5], color: "#4cf84c" },
              { range: [5, 6], color: "#08da08" },
              { range: [6, 7], color: "#057c05" },
              { range: [7, 8], color: "#046904" },
              { range: [8, 9], color: "#023002" }
            ]
          }
        }
      ];
      
      var layout = { width: 400, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
}


// calculate meter point
function gaugePointer(value){

    // if 10 ~ 180, then deg = value * 180/10
	
    var degrees = 180 -  ((value * 180)/10), radius = .5;
    
    // calculate x and y values  - https://xaktly.com/DerivativesOfPolarFunctions.html
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);        
	return path;
}


//A function to build gauge chart - There is no direct way to create the guage chart.
// Reference  :- https://codepen.io/ascotto/pen/eGNaqe?editors=0011
function BuildChart(washFrequency)
{
    console.log(washFrequency)

    // convert the value to float
    var level = parseFloat(washFrequency);


    // build a scatter plot

    var data = [{ type: 'scatter',
        x: [0], y:[0],	
        showlegend: false,
        name: 'scrub washing',
        text: level,
        hoverinfo: 'text+name'},
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9 , 50], // values for the chart, 50% sliced into 8, and remaining 50%
        rotation: 90,
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1",""], // labels for the 
        textinfo: 'text',
        textposition:'inside',	  
        marker: {colors:["#023002","#046904","#057c05" , "#08da08" ,"#72fa72" , "#4cf84c","#98fb98" , "#befcbe", "#e4fee4", "white"]},
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1",""],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

    var layout = {
    shapes:[{
        type: 'path',
        path: gaugePointer(level),
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    //title: '<b>Gauge</b> <br> Speed 0-100',
        autosize:true,
    //height: 1000,
    //width: 1000,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);

}