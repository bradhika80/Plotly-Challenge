
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