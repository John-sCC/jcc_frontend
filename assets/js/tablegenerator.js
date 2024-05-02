console.log("loaded")
var selected = null
var selectedExistingClass = null

// change url based on need
// const url = 'http://localhost:8911'
const url = 'https://jcc.stu.nighthawkcodingsociety.com'

window.onload(function() {
    initialize()
})



async function fetchClassList() {
    // Create array of classes
    var classes = []

    // Fetch backend
    try {
        const response = await fetch(url + '/api/class_period/dashboard', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
        })

        // Error check
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        // Convert response to JSON, which contains classes that user is the leader of
        const data = await response.json()
        console.log(JSON.stringify(data))
        var classList = data.leader

        // For each class of the user
        for (let classData of classList) {
            // Define list of students in each class
            var studentList = []

            // Push students from response into class array
            for (let student of classData.students) {
                studentList.push(student.name)
            }

            // Add each class from response into frontend class array
            classes.push({id: `class-${classData.id}`, class: studentList, name: classData.name})
        }
    } 
    // If there is an error, return an empty array
    catch (error) {
        console.error('There was a problem with the fetch operation:', error)

        // This only occurs when not signed in
        return []
    }

    return classes
}

function initialize() {
    const classList = getClassList()

    for (let i = 0; i < classList.length; i ++) {
        const id = classList[i]["id"].slice(6)
        const name = classList[i]["name"]

        makeClass(id, name)
    }

    document.getElementsByClassName("add")[0].onclick = function () {addClass()}

    $("#submit")[0].onclick = function() {makeGroups()}

    // Event listener for pressing enter on the # of groups box
    $("#groupsInput").keyup(function(e) {
        if (e.keyCode == 13) {
            makeGroups()
        }
    })
}

// Adds to storage and makes div
function addNewClass() {
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
    editClass(`class-${id}`)
}

function addExistingClass() {
    if (selectedExistingClass == null) {
        alert("Please select an existing class first, or create a new class with the button at the bottom.")
        return
    }

    const id = selectedExistingClass["id"]
    const name = selectedExistingClass["name"]
    const classList = selectedExistingClass["class"]

    localStorage.setItem(id, JSON.stringify({name:name, class:classList}))

    makeClass(id.slice(6), name)
    editClass(id)

    selectedExistingClass = null
}

async function addClass() {
    const existingClasses = await fetchClassList()

    console.log(existingClasses)

    const main = $("#table-div")[0]

    main.innerHTML = ""

    const topText = document.createElement("div")
    topText.innerHTML = "Choose existing class:"

    const cancelButton = document.createElement("button")
    cancelButton.innerHTML = "CANCEL"
    cancelButton.onclick = function() {
        main.innerHTML = ""
        selectedExistingClass = null
    }

    const title = document.createElement("div")
    title.className = "class-title"
    title.appendChild(topText)
    title.appendChild(cancelButton)

    const classes = document.createElement("div")
    classes.id = "classes-div"

    const textContainer = document.createElement("div")
    textContainer.className = "text-area-container"
    textContainer.appendChild(classes)

    // i have given up on naming variables in an intuitive way, good luck soldiers!
    if (existingClasses.length != 0) {
        // bullet point list to include all existing classes
        const existingList = document.createElement("ul")

        // Add each existing class to this list
        for (existingClass of existingClasses) {
            console.log(existingClass)
            const currentClass = existingClass
            const listItem = document.createElement("li")
            listItem.innerHTML = currentClass["name"]

            listItem.id = `existing-class-${currentClass["id"].slice(6)}`

            // select the class on click
            listItem.onclick = function() { setSelectedExisting(currentClass) }

            existingList.appendChild(listItem)
        }

        classes.appendChild(existingList)
    }

    else {
        classes.innerHTML = "No existing classes found, try "
        const redirect = document.createElement("a")
        redirect.href = `${baseurl}/sign-in`
        redirect.innerHTML = "signing in"
        classes.appendChild(redirect)
        classes.innerHTML += " or creating a new class"
    }

    const createButton = document.createElement("button")
    createButton.innerHTML = "CREATE NEW CLASS"
    createButton.onclick = function() {addNewClass()}

    const selectButton = document.createElement("button")
    selectButton.innerHTML = "SELECT"
    selectButton.onclick = function() {addExistingClass()}

    const bottomContainer= document.createElement("div")
    bottomContainer.className = "save"
    bottomContainer.appendChild(selectButton)
    bottomContainer.appendChild(createButton)

    main.appendChild(title)
    main.appendChild(textContainer)
    main.appendChild(bottomContainer)
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
    itemName.onclick = function() { setSelected(id) }

    const listItem = document.createElement("div")
    listItem.className = "list-item"
    listItem.id = `class-${id}`
    listItem.appendChild(itemName)
    listItem.appendChild(itemEdit)

    const list = $(".list")[0]

    list.insertBefore(listItem, list.children[list.children.length - 1])
}

function setSelected(id) {
    try {
        document.getElementById(`class-${selected}`).children[0].style.color = "" // unsets
    }
    catch {}
    selected = id

    document.getElementById(`class-${id}`).children[0].style.color = "#154734ff"
}

function setSelectedExisting(existing) {
    const id = existing["id"].slice(6)
    
    console.log(id)
    console.log(existing)
    try {
        document.getElementById(`existing-class-${selectedExistingClass["id"].slice(6)}`).style.color = "" // unsets
    }
    catch {}
    selectedExistingClass = existing

    document.getElementById(`existing-class-${id}`).style.color = "#154734ff"
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

    const studentNum = thisClass["class"].length

    if (studentNum == 0) {
        textarea.innerHTML = "Enter student names separated by line"
    }

    else {
        for (let i = 0; i < studentNum; i ++) {
            const student = thisClass["class"][i]
            textarea.innerHTML += student

            if (i != studentNum - 1) {
                textarea.innerHTML += "\n"
            }
        }
    }

    const textContainer = document.createElement("div")
    textContainer.className = "text-area-container"
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
    if (!confirm(`Are you sure you want to delete "${$(`#${id}`).children()[0].innerHTML}"?`)) {
        return
    }

    localStorage.removeItem(id)
    document.getElementById(id).remove()

    const main = $("#table-div")[0]

    main.innerHTML = ""
}

function renumber(parents) {
    for (parent of parents) {
        const rows = parent.children()
        for (let i = 0; i < rows.length - 1; i ++) {
            rows[i].children[0].innerHTML = i + 1
        }
    }
}

function tableDroppable(id) {
    $(`#${id}`).droppable({
        classes: {"ui-droppable-hover":"dropzone-hover"}, // changes background color to dark blue on hover
        drop: function(event, ui) {
            var draggable = ui.draggable
            var droppable = $(this)

            // get parent objects and indexes of each element
            var parent1 = draggable.parent()
            var parent2 = droppable.parent()

            // if same parent do not run
            if (parent1.children().is(droppable)) {
                return
            }

            // Detach from old table and insert before the dropzone
            temp = draggable.detach()
            temp.insertBefore(droppable)

            renumber([parent1, parent2])
        }
    })
}

function studentDraggable(id) {
    $(`#${id}`).draggable({
        revert: true,
        scroll: true,
        containment: $("#table-div"),
        revertDuration: 0
    })
}

function studentDroppable(id) {
    $(`#${id}`).droppable({
        drop: function(event, ui) {
            // define starting row and ending row
            var draggable = ui.draggable
            var droppable = $(this)

            // get parent objects and indexes of each element
            var parent1 = draggable.parent()
            var parent2 = droppable.parent()

            var index = draggable.index()

            draggable.insertBefore(droppable)
            temp = droppable.detach()

            if (parent1.children().length == index) {
                droppable.insertAfter(parent1.children().eq(index - 1))
            }

            else {
                droppable.insertBefore(parent1.children().eq(index))
            }

            renumber([parent1, parent2])
        }
    })
}

function makeTable(people) {
    // Get main div
    const main = document.getElementById("table-div")

    // Create new table with divs
    const tableDiv = document.createElement("div")
    const title = document.createElement("div")
    const table = document.createElement("table")

    // Set classes for styling
    tableDiv.className = "table"
    title.className = "title"

    // Define variable for number of existing tables
    var n = 0

    // Count number of existing tables
    const existingRows = main.children

    for (let existingRow of existingRows) {
        n += existingRow.children.length
    }

    // Insert members into newly created table
    for (let i = 0; i < people.length; i ++) {
        const row = document.createElement("tr")
        const number = document.createElement("td")
        const name = document.createElement("td")

        number.innerHTML = i + 1
        name.innerHTML = people[i]
        
        row.appendChild(number)
        row.appendChild(name)
        table.appendChild(row)
        const rowId = `row-${n}-${i}`
        row.id = rowId
    }

    // invisible dropzone beneath last student for adding more to table
    const dropzone = document.createElement("tr")
    dropzone.id = `dropzone-${n+1}`
    dropzone.className = "dropzone"

    // empty <td> that spans whole row
    const dropzoneData = document.createElement("td")
    dropzoneData.colSpan = "2"

    dropzone.appendChild(dropzoneData)
    table.appendChild(dropzone)

    // Number group text
    title.innerHTML = `GROUP #${n+1}`

    tableDiv.appendChild(title)
    tableDiv.appendChild(table)

    // Create a new row if needed (2 per row)
    if (n % 2 == 0) {
        const rowSection = document.createElement("div")
        rowSection.className = "row"
        rowSection.appendChild(tableDiv)
        main.appendChild(rowSection)
    }

    else {
        existingRows[existingRows.length - 1].appendChild(tableDiv)
    }

    // apply drag/drop to all students after they have been loaded
    for (let i = 0; i < table.children.length - 1; i ++) {
        const row = table.children[i].id

        studentDraggable(row)
        studentDroppable(row)
    }

    // add dropzone to the dropzone
    tableDroppable(dropzone.id)
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
    if (selected == null) {
        alert("Please select a class to generate from first")
        return
    }

    // Get number of groups, n
    const n = $("#groupsInput")[0].value

    if (n != Math.abs(n) || n == "") {
        alert("Please enter the desired amount of groups.")
        return
    }

    // Try to save edits if possible
    try {
        saveEdits(`class-${selected}`)
    }
    catch {}

    // Define variable for table div section
    $('#table-div')[0].innerHTML = ""

    const classList = getClassList()

    let thisClass
    
    for (let i = 0; i < classList.length; i ++) {
        if (classList[i]["id"] == `class-${selected}`) {
            thisClass = classList[i]
        }
    }

    // Get list of people, then randomized
    const people = thisClass["class"].sort(() => Math.random() - 0.5)

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
        makeTable(group)
    }
}

function makeExistingGroups(groups) {
    $('#table-div')[0].innerHTML = ""
    
    for (group of groups) {
        makeTable(group)
    }
}