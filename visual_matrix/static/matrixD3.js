var id = 0

function newMatrix(in_data, title) {
    var margin = { top: 40, right: 25, bottom: 30, left: 40 },
        width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    g = document.createElement('div');
    g.setAttribute("id", "div" + id);

    placeholder = document.getElementById("placeholder");
    placeholder.appendChild(g);

    // append the svg object to the body of the page
    var svg = d3.select("#div" + id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    if (in_data == null){
        data = [1, 2, 3, 4, 5, 6, 7, 255, 9, 10, 200, 12, 13, 14, 15, 16]
    }
    else{
        data = in_data
    }

    var side = Math.sqrt(data.length)
    var Xs = [...Array(side).keys()];
    var Ys = [...Array(side).keys()];

    // Build X scales and axis:
    var x = d3.scaleBand().range([0, width]).domain(Xs).padding(0.05);
    // Build Y scales and axis:
    var y = d3.scaleBand().range([0, height]).domain(Ys).padding(0.05);
    var myColor = d3.scaleLinear().range(["black", "white"]).domain([0, 255])
    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {d3.select(this).style("stroke", "black").style("opacity", 1) }
    var mouseleave = function (d) {d3.select(this).style("stroke", "none").style("opacity", 0.8)}

    // add the squares
    svg.selectAll()
        .data(data/*, function(d) {return d.group+':'+d.variable;}*/)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { return x(i % side) })
        .attr("y", function (d, i) { return y(Math.floor(i / side)) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return myColor(d) })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)


    svg.selectAll()
        .data(data)
        .enter()
        .append("text")
        .attr("dy", ".5em")
        .attr("x", function (d, i) { return x(i % side) + (x.bandwidth() / 2) })
        .attr("y", function (d, i) { return y(Math.floor(i / side)) + (y.bandwidth() / 2) })
        .text(function (d, i) { return d; })
        .attr("text-anchor", "middle")
        .attr("font-family", "Helvetica Neue")
        .attr("font-size", "15px")
        .attr("fill", function (d, i) {
            return d < 127 ? "white" : "black"
        })

    //Add title to graph
    svg.append("text")
        .attr("x", 0)
        .attr("y", -5)
        .attr("text-anchor", "left")
        .style("font-size", "18px")
        .text(title == null ? "" : title);
}  
