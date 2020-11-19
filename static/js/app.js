
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
        console.log (samples);
        // populate options for the test Subjects
      PopulateTestSubjectOptions();
      buildDemographicInformation("960")

    });

     
}


function buildDemographicInformation(testSubjectId) {
    
    // retrieve the test subject information from the meta data 

    testSubject = metadata.filter(d => d.id == testSubjectId)
   
    var demoPanel = d3.select("#sample-metadata");
    // reset the demographic panel
    demoPanel.html("");
    console.log(testSubject);
    // update the demo panel with new subject information    
    // Iterate through each key and value
    Object.entries(testSubject[0]).forEach(([key, value]) => {
        var msg = `${key}:${value}`;
        demoPanel.append("h6").text(msg);        
    });

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