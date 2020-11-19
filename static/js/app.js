

// populate options for the test Subjects
PopulateTestSubjectOptions();


//function to prepopulate TestSubject Options
function PopulateTestSubjectOptions(){
    
   // read the names field for the test subject
    d3.json("data/samples.json").then((data) => {
       
       console.log(data.names)
       var options = d3.select("#selDataset")
                    .selectAll('option')
                    .data(data.names)
                    .enter()
                    .append('option')
                    .text(function (d) { return d; });
        });

    
    

}

