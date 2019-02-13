//Cities and megacities

var mydiv = document.getElementById("mydiv");
mydiv.innerHTML = "My Table";


//jQuery version of creating a table
//call the initialize function when the window has loaded
window.onload = initialize();


//initialize function called when the script loads
function initialize(){
    cities();
    jQueryAjax();
    debugAjax();
};

//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population in Colombia (the top 4 by population)
    var cityPop = [
        { 
            city: 'Bogotá',
            population: 7963379
        },
        {
            city: 'Medellín',
            population: 2457680
        },
        {
            city: 'Cali',
            population: 2358302
        },
        {
            city: 'Baranquilla',
            population: 1219382
        }
    ];

    //append the table element to the div
    $("#mydiv").append("<table>");
    //append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
      //call new functions
      addColumns(cityPop);
      addEvents();
};

//call the initialize function when the document has loaded
//$(document).ready(initialize);

//create function to add columns to cityPop
function addColumns(cityPop){
    //loop to add a new column for each city
    $('tr').each(function(i,v) {
        //conditional statement to define city size arrays
        if (i == 0){
            //add the title to the header row
            $(this).append('<th>City Size</th>');
            //three rule statements defining size thresholds
        } else {

            var citySize;

            if (cityPop[i-1].population < 100000){
                citySize = 'Small';

            } else if (cityPop[i-1].population < 500000){
                citysize = 'Medium';

            } else {
                citySize = 'Large';
            };
            //add the row's html string to the table
            $(this).append('<td>' + citySize + '</td>');
        };
    });
};

//create function to add color and mouseover to the table
function addEvents($this){
    //Trigger an event when viewer "mousesover" the table
    $('table').mouseover(function(){
        //define string variable with a CSS color code using loop
        var color = "rgb(";
        //Loop to generate three random numbers to feed into .css()
        for (var i=0; i<3; i++){
            //Generate a random number and round it to an interger, multiply by 255 to conform to RGB color model
            var random = Math.round(Math.random() * 255);

            color += random;

            if (i<2){
                color += ",";
            
            } else {
                color += ")";
        };
        //set the value of the element using CSS styles, changing text color by calling variable color
        $(this).css('color', color);
    };
    //create alert function in response to clicking on the box
    function clickme(){
        //Display an alert box
        alert('Hey, you clicked me!');
    };
    //add event listener
    $('table').on('click', clickme);
});
};

//Module 3 Ajax callback functions and geojsons

//define AJAX function
function jQueryAjax(){
    //define a variable to hold the data
    var mydata;

    //basic jQuery ajax method
    $.ajax("data/MegaCities_geocoded.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;

            //check the data
            console.log(mydata);
        }
    });

    //check the data - outside the function so comes back as undefined
    console.log(mydata);
};


//define new function from debugging script
function debugCallback(response){
    mydata = response;
    $("#mydiv").append('GeoJSON data: ' + JSON.stringify(mydata));
};
//define Ajax function
function debugAjax(){
    //define variable
    var mydata;
    //define a basic JQuery Ajax method
    $.ajax("data/MegaCities_geocoded.geojson", {
        dataType: "json",
        //callback
        success: function(response){
            mydata = response;
            //call debug function
            debugCallback(mydata);
        }
    });
//view JSON in plain text
    $("#mydiv").append('<br>GeoJSON data:</br>' + JSON.stringify(mydata));
};

//$("#mydiv").append('GeoJSON data: ' + JSON.stringify(mydata));







