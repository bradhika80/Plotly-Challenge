
// initialize variables
var testSubjects; 
var metadata;
var samples;

// A function to do the initialization before the page loads
function PreLoad()
{   // read the json and build data variables
    d3.json("data/samples.json").then((data) => {
        testSubjects = data.names;
        metadata = data.metadata;
        samples = data.samples;
        // populate options for the test Subjects
      PopulateTestSubjectOptions();
      var testSubjectId = testSubjects[0];
      console.log(testSubjectId);
      buildDemographicInformation(testSubjectId)
      BuildHorizontalBarChart(testSubjectId)

    });
     
}

// A function to build the demographic information
function buildDemographicInformation(testSubjectId) {
    
    // retrieve the test subject information from the meta data 

    testSubject = metadata.filter(d => d.id == testSubjectId)
   
    var demoPanel = d3.select("#sample-metadata");
    // reset the demographic panel
    demoPanel.html("");
  
    // update the demo panel with new subject information    
    // Iterate through each key and value
    Object.entries(testSubject[0]).forEach(([key, value]) => {
        var msg = `${key}:${value}`;
        demoPanel.append("h5").text(msg);        
    });

  }


// function to build horizontal bar chart
function BuildHorizontalBarChart(testSubjectId)
{
   // filter the sample dataset for the test subjectId
   testSubjectSample = samples.filter(d => d.id == testSubjectId)
   
  // testSubjectSample[0].reverse();
   console.log(testSubjectSample)
 
   var x = testSubjectSample[0].sample_values.slice(0,10);
   var y = testSubjectSample[0].otu_ids.slice(0,10);
   var hover = testSubjectSample[0].otu_labels.slice(0,10);
   y = y.map(i => "OTU " + i);
   console.log(y);
   console.log(x)
    // Create your trace.
    var trace = {
        x: x,
        y: y,
        text : hover,
        type: "bar",
        orientation: "h"
    };
    
    // 6. Create the data array for our plot
    var data = [trace];
    
    // 7. Define our plot layout
    var layout = {
        title: "top 10 OTUs"         
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
  
    var data = [trace]

  var layout = {
    title: "Chart "   
  }

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

// call the PreLoad function
PreLoad()