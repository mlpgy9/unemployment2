// $(document).ready(function() {
//     console.log("Hello world.")
// });
// 


var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };

var width = $(".chart").width() - margin.left - margin.right;
var height = $(".chart").height() - margin.top - margin.bottom;

var formatDate = d3.time.format("%Y-%d-%m");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.observation_date); })
    .y(function(d) { return y(d.CLMUR); });

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//END OF GLOBAL VARIABLES 

//WHERE THE DATA IS LOADED

d3.csv("unemployment.csv", type, function(error, data) {

  console.log(data);

  if (error) throw error;
  
//LOCAL VARIABLES HERE

//     x.domain(
//     data.map(function(d){
//     console.log(d);
//     return d.CLMUR;
//     })
//     );



    
    /* ----------------- */
    // Set your domains for time and values here.
    // Use the line chart example as your guide.
    // Don't use what you've commented out above. It won't work!!
    // Time domain is an array of two values: earliest and latest date.
    // Values domain is an array of two values: lowest and highest values.
    /* ----------------- */

var timeDomain = d3.extent(data, function(d) {return +d.observation_date}); //this is x domain
var valueDomain = d3.extent(data, function(d) {return d.CLMUR});    

x.domain(timeDomain).nice();
y.domain(valueDomain).nice();






  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
        
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Unemployment Rate");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
})

function type(d) {
  d.observation_date = formatDate.parse(d.observation_date);
  d.CLMUR = +d.CLMUR;
  return d;
}
