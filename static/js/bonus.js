
// a function to build Gauge chart
function BuildGaugeChart(washFrequency) {

    var data = [
        {
          domain: { x: [0, 9], y: [0, 9] },
          value: washFrequency,
          title: { text: "Scrubs Per Week" },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: 1 },
          gauge: {
            axis: { range: [0, 9] , tickwidth: 1, tickcolor: "darkblue" },
            steps: [
              { range: [0, 250], color: "lightgray" },
              { range: [250, 400], color: "gray" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
}