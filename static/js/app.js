
// declare global variables
var testSubjects; 
var metadata;
var samples;


// A function to do the initialization before the page loads
function Initialize()
{   // read the json and build data variables
    d3.json("data/samples.json").then((data) => {
        testSubjects = data.names;
        metadata = data.metadata;
        samples = data.samples;
        // populate options for the test Subjects
      PopulateTestSubjectOptions();
      var testSubjectId = testSubjects[0];
      console.log(testSubjectId);
      var washFrequency = BuildDemographicInformation(testSubjectId);
      BuildHorizontalBarChart(testSubjectId);
      BuildBubbleChart(testSubjectId);
      //BuildGaugeChart(washFrequency);
      BuildChart(washFrequency);

    });
     
}

// a function to get the onchange event for the selector
function optionChanged(testSubjectId) {

    // Prevent the page from refreshing
   // d3.event.preventDefault();
    
    // Build the graphs and demographic data based on the subject Id
    var washFrequency = BuildDemographicInformation(testSubjectId);
    BuildHorizontalBarChart(testSubjectId);
    BuildBubbleChart(testSubjectId);
    BuildChart(washFrequency);
  }

// A function to build the demographic information
function BuildDemographicInformation(testSubjectId) {
    
    // retrieve the test subject information from the meta data 

    testSubject = metadata.filter(d => d.id == testSubjectId)

    washFrequency = testSubject[0].wfreq;
   
    var demoPanel = d3.select("#sample-metadata");
    // reset the demographic panel
    demoPanel.html("");
  
    // update the demo panel with new subject information    
    // Iterate through each key and value
    Object.entries(testSubject[0]).forEach(([key, value]) => {
        var msg = `${key}:${value}`;
        demoPanel.append("h5").text(msg);        
    });
    return (washFrequency);

}


// function to build horizontal bar chart
function BuildHorizontalBarChart(testSubjectId)
{
   // filter the sample dataset for the test subjectId
   testSubjectSample = samples.filter(d => d.id == testSubjectId)
   
  // testSubjectSample[0].reverse();
   console.log(testSubjectSample)
 
   // get the first 10 values 
   var x = testSubjectSample[0].sample_values.slice(0,10);
   var y = testSubjectSample[0].otu_ids.slice(0,10);
   var text = testSubjectSample[0].otu_labels.slice(0,10);
   // add OTU to the ids
   y = y.map(i => "OTU " + i);
   console.log(y);
   console.log(x)
    // Create your trace.
    var trace = {
        x: x,
        y: y,
        text : text,
        type: "bar",
        orientation: "h"
    };
    
    // Create the data array for our plot
    var data = [trace];
    
    // Define our plot layout
    var layout = {
        title: "Top 10 OTUs "         
    };
    
    // 8. Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);  

}

// function to build bubble chart
function BuildBubbleChart(testSubjectId)
{
    // filter the sample dataset for the test subjectId
   testSubjectSample = samples.filter(d => d.id == testSubjectId)

   //testSubjectSample[0].reverse();
   console.log(testSubjectSample)
 
   // get the x and y values for the bubble chart
   var x = testSubjectSample[0].sample_values;
   var y = testSubjectSample[0].otu_ids;
   var text = testSubjectSample[0].otu_labels;


   // Reference : https://plotly.com/javascript/bubble-charts/
   var trace =
    {
      x: x,
      y: y,
      text: text,
      mode: "markers", 
      marker: {
        size: x,
        color: y,
        colorscale: "Earth"
      }
    }
  
    // Create the data array for our plot
    var data = [trace]

    // Define our plot layout
    var layout = {
        xaxis :{
            "title" : "OTU Ids"
        }
    }

    // 8. Plot the chart to a div tag with id "bubble-plot"
    Plotly.plot("bubble", data, layout);
}

//function to prepopulate TestSubject Options
function PopulateTestSubjectOptions(){

    var options = d3.select("#selDataset")
                .selectAll('option')
                .data(testSubjects)
                .enter()
                .append('option')
                .text(function (d) { return d; });    

}

// call the Initialize function
Initialize()