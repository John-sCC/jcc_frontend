---
layout: default
title: One quanatative Varible
permalink: /one-variable/
---

<html>
<head>
    <title>One Quantitative Variable</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
    </style>
</head>
<body>
<div class="div0">
    <div class="div1">
        <div class="variables">
            <p class="bigboyheader">ENTER DATA:</p>
            <p> <label class="insert"> Variable: <br> <input id="variableName" placeholder="Variable name..."></label> </p>
            <p> <label class="insert"> Variable Observations: <br> <input id="variable" placeholder="Numbers here..."></label> </p>
            <button onclick="postApi()">Post to Backend</button>
            <button onclick="generateTableAndGraph()">Generate Table and Graph</button>
            <button onclick="getUserData()">See Your Old Data</button>
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
        <div id="userData"></div>
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
            // This is a placeholder and may not work
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

function postApi(){
    if(window.location.href.includes("127.0.0.1")){
        var url = 'http://localhost:8911/api/stats/newQuantitative';
    }
    else {
        var url = 'https://jcc.stu.nighthawkcodingsociety.com/api/stats/newQuantitative'; 
    }

    var name = document.getElementById('variableName').value;
    var variable = document.getElementById('variable').value.split(',');

    const quantitativeRequest = {
        data: variable, 
        name: name
    };

    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quantitativeRequest)
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
async function newData(data) {
    try {
        
        var dataEntry = document.createElement('p');
        dataEntry.id =  data["id"];
        dataEntry.innerHTML = data["name"] + " " + data["data"];

        // Create button element
        var button = document.createElement('button');
        button.id = data["id"];
        button.textContent = 'See This Data';
        button.onclick = function() {
            document.getElementById('variableName').value = data["name"];
            document.getElementById('variable').value = data["data"];
        };

        // Create a line break element
        var lineBreak = document.createElement('br');

        // Create a container div
        var individualInput = document.createElement('div');

        // Append elements to the container div
        individualInput.appendChild(dataEntry);
        individualInput.appendChild(button);
        individualInput.appendChild(lineBreak);

        // Append the container div to the main container
        var container = document.getElementById('userData');
        container.appendChild(individualInput);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getUserData() {
    try {
        const data = await fetchApi();

        // Use a for...of loop to handle async/await properly
        for (const item of data) {
            await newData(item);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchApi() {
    let url;
    if (window.location.href.includes("127.0.0.1")) {
        url = 'http://localhost:8911/api/person/quantitatives';
    } else {
        url = 'https://jcc.stu.nighthawkcodingsociety.com/api/person/quantitatives';
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        if (error instanceof SyntaxError) {
            console.error('There was a syntax error in the response, possibly not JSON:', error.message);
        } else {
            console.error('There was a network or other error:', error.message);
        }
        throw error;
    }
}

async function getQuantitative(id) {
    let url;
    if (window.location.href.includes("127.0.0.1")) {
        url = `http://localhost:8911/api/stats/getQuantitative${id}`;
    } else {
        url = `https://jcc.stu.nighthawkcodingsociety.com/api/stats/getQuantitative${id}`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        if (error instanceof SyntaxError) {
            console.error('There was a syntax error in the response, possibly not JSON:', error.message);
        } else {
            console.error('There was a network or other error:', error.message);
        }
        throw error;
    }
}



</script>
</body>
</html>
