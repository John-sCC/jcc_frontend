---
layout: default
title: table
permalink: /twocategorical/
---



<head>
    <title>Page Title</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        .div0 {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        .div0 > div {
            margin: 5px;
        }
        .div1 {
            display: flex;
            flex-direction: column;
            padding: 12px 20px;
        }
        .div1 > div {
            margin: 10px;
            padding: 12px 20px;
        }
        .variables {
            background-color: $nighthawk-blue;
            border-radius: 15px;
        }
        .variables > input {
            border-radius: 15px;
        }
        .insert {
            font-size: 20px;
            padding: 5px;
        }
        .insert > input {
            border-radius: 15px;
            padding: 5px;
            width: 650px;
        }
        .tablee {
            background-color: $nighthawk-blue;
            border-radius: 15px;
            border:1px solid black;
            border-collapse: collapse;
            padding: 6px 10px;
            font-size: 20px;
        }
        .tablee > th {
            border:1px solid black;
            border-collapse: collapse;
            padding: 6px 10px;
        }
        .tablee > td {
            border:1px solid black;
            border-collapse: collapse;
            padding: 6px 10px;
        }
        .bigboyheader {
            font-family: $nighthawk-font2;
            font-weight: bold;
            font-size: 25px;
        }
        .div2 {
            display: flex;
            flex-direction: column;
            padding: 12px 20px;
        }
        .div2 > div {
            margin-bottom: 1px;
            margin-top: 1px;
        }
        .several {
            display: flex;
            flex-direction: row;
            align-items:flex-start;
            justify-content: space-between;
        }
        .several > div {
            margin-bottom: 5px;
            margin-top: 5px;
            padding: 20px 40px;
            background-color: $nighthawk-blue;
            text-align: center;
            font-weight: bold;
            border-radius: 15px;
            font-family: $nighthawk-font2;
            font-size: 25px;
        }
        .subnav-content {
            display: none;
            font-size: 20px;
        }
        .subnav:hover .subnav-content {
            display: block;
        }
        .graph {
            background-color: white;
            padding: 12px 20px;
            border-radius: 15px;
        }
    </style>
</head>
<body>
    <div class="div0">
        <div class="div1">
            <div class="variables">
                <p class="bigboyheader">ENTER DATA:</p>
                <p> 
                    <label class="insert"> Category 1 Name: <br> 
                        <input type="text" id="category1Name" name="category1Name" placeholder="Name here...">
                    </label> 
                </p>
                <p> 
                    <label class="insert"> Category 1 Values: <br> 
                        <input type="text" id="category1" name="category1" placeholder="Enter comma-separated values">
                    </label> 
                </p>
                <p> 
                    <label class="insert"> Category 2 Name: <br> 
                        <input type="text" id="category2Name" name="category2Name" placeholder="Name here...">
                    </label> 
                </p>
                <p> 
                    <label class="insert"> Category 2 Values: <br> 
                        <input type="text" id="category2" name="category2" placeholder="Enter comma-separated values">
                    </label> 
                </p>
                <button onclick="generateTableAndGraph()">Generate Table and Graph</button>
            </div>
            <div class="tablee" id="table"></div>
        </div>
        <div class="div2">
            <div class="several">
                <div class="subnav">
                    <div class="subnavbtn">CHANGE GRAPH TYPE</div>
                    <div class="subnav-content">
                        <p>HISTOGRAM</p> <!-- todo change this! -->
                        <p>BAR GRAPH</p> <!-- todo change this! -->
                        <p>SILLY GRAPH</p> <!-- todo change this! -->
                    </div>
                </div>
            </div>
            <div class="graph" id="bar-graph"></div>
        </div>
    </div>
    <script>
        function generateTableAndGraph() {
            var category1Name = document.getElementById('category1Name').value;
            var category1 = document.getElementById('category1').value.split(',');
            var category2Name = document.getElementById('category2Name').value;
            var category2 = document.getElementById('category2').value.split(',');

            // Generate the table
            var table = '<table><tr><th>' + category1Name + '</th><th>' + category2Name + '</th></tr>';
            for (var i = 0; i < Math.max(category1.length, category2.length); i++) {
                table += '<tr><td>' + (category1[i] || '') + '</td><td>' + (category2[i] || '') + '</td></tr>';
            }
            table += '</table>';
            document.getElementById('table').innerHTML = table;

            // Generate the bar graph
            var data = [{
                x: category1,
                y: category2,
                type: 'bar'
            }];

            var layout = {
                width: 800,  
                height: 600  
            };

            Plotly.newPlot('bar-graph', data, layout);
        }
    </script>
</body>
