---
layout: default
title: table
permalink: /tables/
---


<html>
<head>
    <title>Two Quantitative Variables</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script src="https://unpkg.com/regression"></script> 
    <style>
    </style>
</head>
<body>
<div class="div0">
    <div class="div1">
        <div class="variables">
            <p class="bigboyheader">ENTER DATA:</p>
            <p> <label class="insert"> Explanatory Variable: <br> <input id="explanatoryName" placeholder="Variable name..."></label> </p>
            <p> <label class="insert"> Explanatory Variable Observations: <br> <input id="explanatory" placeholder="Numbers here..."></label> </p>
            <p> <label class="insert"> Response Variable: <br> <input id="responseName" placeholder="Variable name..."></label> </p>
            <p> <label class="insert"> Response Variable Observations: <br> <input id="response" placeholder="Numbers here..."></label> </p>
            <button onclick="postApi()">Post to Backend</button>
            <button onclick="generateTableAndGraph()">Generate Table and Graph</button>
            <button onclick="generateRegression()">Generate Regression Model</button> <!-- its only going to log in console for now i'll fix it later -->
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
                    <p>HISTOGRAM</p>
                    <p>BAR GRAPH</p>
                    <p>SILLY GRAPH</p>
                </div>
            </div>
            <div>a</div>
            <div>b</div>
            <div>c</div>
        </div>
        <div id="scatter-plot" class="graph"></div>
    </div>
</div>

<script>
function generateTableAndGraph() {
    var explanatoryName = document.getElementById('explanatoryName').value;
    var explanatory = document.getElementById('explanatory').value.split(',');
    var responseName = document.getElementById('responseName').value;
    var response = document.getElementById('response').value.split(',');

    // the table
    var table = '<table><tr><th>' + explanatoryName + '</th><th>' + responseName + '</th></tr>';
    for (var i = 0; i < Math.max(explanatory.length, response.length); i++) {
        table += '<tr><td>' + (explanatory[i] || '') + '</td><td>' + (response[i] || '') + '</td></tr>';
    }
    table += '</table>';
    document.getElementById('table').innerHTML += table;
    
    // the scatter plot
    var data = [{
        x: explanatory,
        y: response,
        mode: 'markers',
        type: 'scatter'
    }];

    var layout = {
        title: 'Scatter Plot',
        xaxis: {title: explanatoryName},
        yaxis: {title: responseName},
        autosize: false,
        width: 800,
        height: 600,
    };

    Plotly.newPlot('scatter-plot', data, layout);

}

function generateRegression() {
    var explanatory = document.getElementById('explanatory').value.split(',');
    var response = document.getElementById('response').value.split(',');

    // regression analysis
    var data = [];
    for (var i = 0; i < Math.max(explanatory.length, response.length); i++) {
        data.push([parseFloat(explanatory[i] || 0), parseFloat(response[i] || 0)]);
    }

    // regression analysis
    var result = regression.linear(data);

    // regression equation to the console
    console.log('Regression equation: y = ' + result.equation[0] + 'x + ' + result.equation[1]);
}

function postApi(){
    if(window.location.href.includes("127.0.0.1")){
        var url = 'http://localhost:8911/api/stats/newTwoQuantitative';
    }
    else {
        var url = 'https://https://jcc.stu.nighthawkcodingsociety.com/api/stats/newTwoQuantitative'; 
    }

    var explanatoryName = document.getElementById('explanatoryName').value;
    var explanatory = document.getElementById('explanatory').value.split(',');
    var responseName = document.getElementById('responseName').value;
    var response = document.getElementById('response').value.split(',');

    const twoQuantitativeRequest = {
        explanatory: explanatory, 
        response: response,
        explanatoryName: explanatoryName,
        responseName: responseName
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(twoQuantitativeRequest)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => {
        console.error('Error:', error);
        if (error instanceof SyntaxError) {
            console.error('There was a syntax error in the response, possibly not JSON:', error.message);
        } else {
            console.error('There was a network or other error:', error.message);
        }
    });

}
</script>
</body>
</html>
