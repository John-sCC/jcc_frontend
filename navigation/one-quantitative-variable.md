---
layout: default
title: One quanatative Varible
permalink: /one-variable/
---

```html
<!DOCTYPE html>
<html>
<head>
    <title>One Quantitative Variable</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        /* Add your CSS styling here */
    </style>
</head>
<body>
<div class="div0">
    <div class="div1">
        <div class="variables">
            <p class="bigboyheader">ENTER DATA:</p>
            <p> <label class="insert"> Variable: <br> <input id="variableName" placeholder="Variable name..."></label> </p>
            <p> <label class="insert"> Variable Observations: <br> <input id="variable" placeholder="Numbers here..."></label> </p>
            <button onclick="generateTableAndGraph()">Generate Table and Graph</button>
        </div>
        <div id="table" class="tablee">
            <p class="bigboyheader">SUMMARY STATISTICS:</p>
        </div>
    </div>
    <div class="div2">
        <div class="several">
            <div class="subnav">
                <div class="subnavbtn">CHANGE GRAPH TYPE</div>
                <div class="subnav-content">
                    <p onclick="changeGraphType('histogram')">HISTOGRAM</p>
                    <p onclick="changeGraphType('boxplot')">BOXPLOT</p>
                    <p onclick="changeGraphType('normalProbabilityPlot')">NORMAL PROBABILITY PLOT</p>
                </div>
            </div>
            <div>a</div>
            <div>b</div>
            <div>c</div>
        </div>
        <div id="plot" class="graph"></div>
    </div>
</div>

<script>
var graphType = 'histogram'; // Default graph type

function generateTableAndGraph() {
    var variableName = document.getElementById('variableName').value;
    var variable = document.getElementById('variable').value.split(',');

    // Generate the table
    var table = '<table><tr><th>' + variableName + '</th></tr>';
    for (var i = 0; i < variable.length; i++) {
        table += '<tr><td>' + (variable[i] || '') + '</td></tr>';
    }
    table += '</table>';
    document.getElementById('table').innerHTML = table;

    // Generate the graph
    var data;
    switch(graphType) {
        case 'histogram':
            data = [{
                x: variable,
                type: 'histogram'
            }];
            break;
        case 'boxplot':
            data = [{
                y: variable,
                type: 'box'
            }];
            break;
        case 'normalProbabilityPlot':
            // You would need to calculate the z-scores of your data to generate a normal probability plot
            // This is a placeholder and may not work as expected
            data = [{
                x: variable,
                y: variable,
                mode: 'markers',
                type: 'scatter'
            }];
            break;
    }

    var layout = {
        title: 'Plot',
        xaxis: {title: variableName},
        autosize: false,
        width: 800,
        height: 600,
    };

    Plotly.newPlot('plot', data, layout);
}

function changeGraphType(type) {
    graphType = type;
    generateTableAndGraph();
}
</script>
</body>
</html>
