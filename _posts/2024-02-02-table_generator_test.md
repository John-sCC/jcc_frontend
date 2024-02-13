---
title: Table Generator Testing
description: Proof of concept for randomly generated table groups
toc: true
comments: true
layout: post
type: project
courses: {csa: {week: 21}}
---
<style>
    textarea {
        height: 30em
    }
</style>

<input id="groups" placeholder="enter num of groups">
<textarea id="people-input">separate by line</textarea>
<button id="people-button" onclick = "makeGroups()">submit people</button>
<div id="tables">
</div>

<script>
    function makeGroups() {
        // Define variable for table div section
        var tableDiv = $("#tables")[0]

        // Reset tables
        tableDiv.innerHTML = ""

        // Get list of people, split by line then randomized
        const people = $('#people-input')[0].value.split("\n").sort(() => Math.random() - 0.5)
        
        // Get number of groups, n
        const n = $("#groups")[0].value

        // Define array for finalized groups array
        var groups = []

        // Insert an array for each group
        for (let j = 0; j < n; j ++) {
            groups.push([])
        }

        // While loop to insert people into each array
        var i = 0
        while (i < people.length) {
            for (let j = 0; j < n; j ++) {
                const person = people[i]

                // Prevent undefined from appearing in a table
                if (person != undefined) {
                    groups[j].push(person)
                }

                i ++
            }
        }

        // Loops to create divs for each group, then putting them into the tableDiv
        for (group of groups) {
            var table = document.createElement("div")

            for (person of group) {
                table.innerHTML += `${person} \n`
            }

            tableDiv.appendChild(table)
        }
    }
</script>