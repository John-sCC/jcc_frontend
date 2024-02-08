console.log("loaded")
var selected = null

window.onload(function() {
    initialize()

    document.getElementsByClassName("add")[0].onclick = function () {addClass()}
})

function initialize() {
    const classList = getClassList()

    for (let i = 0; i < classList.length; i ++) {
        const id = classList[i]["id"].slice(6)
        const name = classList[i]["name"]

        makeClass(id, name)
    }
}

// Adds to storage and makes div
function addClass() {
    const current = getClassList()
    var existingIds = []

    for (let temp of current) {
        if (temp["id"] != undefined) {
            existingIds.push(temp["id"].slice(6));
        }
    }

    if (existingIds.length > 0) {
        id = Math.max(...existingIds) + 1
    }

    else {
        id = 0
    }

    localStorage.setItem(`class-${id}`, JSON.stringify({name:"Unnamed class", class:[]}))

    makeClass(id)
}

// makes div
function makeClass(id, name = "Unnamed class") {
    const img = document.createElement("img")
    img.src = `${baseurl}/images/icons/edit-icon.png`
    img.onclick = function() {editClass(`class-${id}`)}

    const itemEdit = document.createElement("div")
    itemEdit.className = "edit"
    itemEdit.appendChild(img)

    const itemName = document.createElement("div")
    itemName.className = "name"
    itemName.innerHTML = name
    itemName.onclick = function() { selected = id }

    const listItem = document.createElement("div")
    listItem.className = "list-item"
    listItem.id = `class-${id}`
    listItem.appendChild(itemName)
    listItem.appendChild(itemEdit)

    const list = $(".list")[0]

    list.insertBefore(listItem, list.children[list.children.length - 1])
}

function getClassList() {
    var classes = []

    for (let i = localStorage.length - 1; i >= 0; i --) {
        const key = localStorage.key(i)

        if (key.includes("class")) {
            const data = JSON.parse(localStorage.getItem(key))
            classes.push({id : key, class : data["class"], name : data["name"]})
        }
    }

    return classes
}

function editClass(id) {
    const classList = getClassList()
    let thisClass
    
    for (let i = 0; i < classList.length; i ++) {
        if (classList[i]["id"] == id) {
            thisClass = classList[i]
        }
    }

    const main = $("#table-div")[0]

    main.innerHTML = ""

    const titleInput = document.createElement("input")
    titleInput.placeholder = thisClass["name"]
    titleInput.id = "name-input"

    const titleButton = document.createElement("button")
    titleButton.innerHTML = "SET NAME"
    titleButton.onclick = function() {saveName(id)}

    const title = document.createElement("div")
    title.className = "class-title"
    title.appendChild(titleInput)
    title.appendChild(titleButton)

    const textarea = document.createElement("textarea")
    textarea.id = "text-input"
    
    for (let i = 0; i < thisClass["class"].length; i ++) {
        const student = thisClass["class"][i]
        textarea.innerHTML += student

        if (i != thisClass["class"].length - 1) {
            textarea.innerHTML += "\n"
        }
    }

    const textContainer = document.createElement("div")
    textContainer.className = "text-container"
    textContainer.appendChild(textarea)

    const saveButton = document.createElement("button")
    saveButton.innerHTML = "SAVE"
    saveButton.onclick = function() {saveEdits(id)}

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "DELETE"
    deleteButton.onclick = function() {deleteClass(id)}

    const saveContainer= document.createElement("div")
    saveContainer.className = "save"
    saveContainer.appendChild(saveButton)
    saveContainer.appendChild(deleteButton)

    main.appendChild(title)
    main.appendChild(textContainer)
    main.appendChild(saveContainer)
}

function deleteClass(id) {
    console.log(id)
    localStorage.removeItem(id)
    document.getElementById(id).remove()

    const main = $("#table-div")[0]

    main.innerHTML = ""
}

function makeTable(people) {
    const main = document.getElementById("table-div")

    const tableDiv = document.createElement("div")
    const title = document.createElement("div")
    const table = document.createElement("table")

    tableDiv.className = "table"
    title.className = "title"

    for (let i = 0; i < people.length; i ++) {
        const row = document.createElement("tr")
        const number = document.createElement("td")
        const name = document.createElement("td")

        number.innerHTML = i + 1
        name.innerHTML = people[i]

        row.appendChild(number)
        row.appendChild(name)
        table.appendChild(row)
    }

    var n = 0

    const existingRows = main.children

    for (let existingRow of existingRows) {
        n += existingRow.children.length
    }

    title.innerHTML = `GROUP #${n+1}`

    tableDiv.appendChild(title)
    tableDiv.appendChild(table)

    if (n % 2 == 0) {
        const rowSection = document.createElement("div")
        rowSection.className = "row"
        rowSection.appendChild(tableDiv)
        main.appendChild(rowSection)
    }

    else {
        existingRows[existingRows.length - 1].appendChild(tableDiv)
    }
}

function saveName(id) {
    const newName = document.getElementById('name-input').value
    const classItem = document.getElementById(id)
    const nameElement = classItem.children[0]
    nameElement.innerHTML = newName
    const classData = JSON.parse(localStorage.getItem(id))
    classData.name = newName
    localStorage.setItem(id, JSON.stringify(classData))
}

function saveEdits(id) {
    const newClass = document.getElementById('text-input').value.split("\n")
    const classData = JSON.parse(localStorage.getItem(id))
    classData.class = newClass
    localStorage.setItem(id, JSON.stringify(classData))
}

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