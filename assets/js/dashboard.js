window.addEventListener('load', function() {
    getUserData();
});

var local = "http://localhost:8911";
var deployed = "https://jcc.stu.nighthawkcodingsociety.com";
const currentUrl = window.location.href;
var fetchUrl = deployed;
if (currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
fetchUrl = local;
}

// global for class being edited
var savedClassData = null
var savedColor = null

function getUserData() {
    // making the fetch request
    fetch(fetchUrl + '/api/class_period/dashboard', {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            "content-type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(JSON.stringify(data));
        populateAssignmentContainer(data.student);
        populateClassesContainer(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        window.location.replace(`${baseurl}/sign-in/`);
    });
}

function assignmentRedirect(id) {
    window.location.href = `${baseurl}/assignment-data?id=` + id;
}

function classRedirect(id, type) {
    window.location.href = `${baseurl}/${type}-class-data?id=` + id;
}

function populateAssignmentContainer(studentData) {
    // iterate through each class, then each assignment in each class
    for (var classPeriod of studentData) {
        for (var assignment of classPeriod.assignments) {
            // create main container for assignment item
            const assignmentListItem = document.createElement('div')
            assignmentListItem.className = 'assignment-list-item'

            // create container for icon
            const assignmentIconContainer = document.createElement('div')
            assignmentIconContainer.className = 'assignment-icon-container'

            // create icon
            const assignmentIcon = document.createElement('img')
            assignmentIcon.src = "../images/icons/white-assignment-icon.png"

            // append icon to container
            assignmentIconContainer.appendChild(assignmentIcon)
            
            // create parent div for all text items
            const assignmentTextContainer = document.createElement('div')
            assignmentTextContainer.className = 'assignment-text-container'

            // create div for assignment name
            var assignmentNameDiv = document.createElement('div');
            assignmentNameDiv.className = "assignment-name"
            
            // create redirect for assignment name
            const assignmentNameRedirect = document.createElement('a')
            assignmentNameRedirect.innerHTML = assignment.name;
            (function(id) {
                assignmentNameRedirect.onclick = function() { assignmentRedirect(id) };
            })(assignment.id);            
            // append redirect to name container
            assignmentNameDiv.appendChild(assignmentNameRedirect)

            // create div for class name
            var classNameDiv = document.createElement('div');
            classNameDiv.className = "class-name"
            
            // create redirect for class name
            const classNameRedirect = document.createElement('a')
            classNameRedirect.innerHTML = classPeriod.name;
            (function(id) {
                classNameRedirect.onclick = function() { classRedirect(id, "student") };
            })(classPeriod.id);     

            // append redirect to name container
            classNameDiv.appendChild(classNameRedirect)

            // create div for due date (will need more info later)
            var dueDate = document.createElement('div');
            dueDate.className = "assignment-info"
            dueDate.innerHTML = `Due: ${new Date(assignment.dateDue).toLocaleDateString()}`;

            // Append all info to text container
            assignmentTextContainer.appendChild(assignmentNameDiv)
            assignmentTextContainer.appendChild(classNameDiv)
            assignmentTextContainer.appendChild(dueDate)

            // append all children to item
            assignmentListItem.appendChild(assignmentIconContainer)
            assignmentListItem.appendChild(assignmentTextContainer)
            
            // append item to main list
            $(".assignment-list-container").append(assignmentListItem)
        }
    }
}

function createClassDiv(classPeriod, classType) {
    // make new class container with all the funky stuff
    const classItem = document.createElement("div")
    classItem.className = "class-item"
    classItem.id = `class-${classPeriod["id"]}`

    // container for the title
    const classNameContainer = document.createElement("div")
    classNameContainer.className = "class-name"

    // title text with redirect
    const classRedirectText = document.createElement("a")
    classRedirectText.innerHTML = classPeriod["name"];
    (function(id) {
        classRedirectText.onclick = function() { classRedirect(id, classType) };
    })(classPeriod["id"])         
    const classButtons = document.createElement("div")
    classButtons.className = "class-buttons"

    // Simplify all the buttons with a loop
    const buttons = [
        ["assignment-icon.png", "Assignments", function() { console.log("needs to be implemented") }],
        ["speaker-icon.png", "Announcements", function() { console.log("needs to be implemented") }],
        ["gradebook-icon.png", "Grades", function() { console.log("needs to be implemented") }],
        ["ellipsis-v-icon.png", "Options", function() { editClassContainer(classPeriod["id"]) }]
    ]

    for (buttonData of buttons) {
        const classButton = document.createElement("img")
        classButton.src = `../images/icons/${buttonData[0]}`
        classButton.title = buttonData[1]
        classButtons.appendChild(classButton)
        classButton.onclick = buttonData[2]
    }
    
    // append all divs to right parts
    classNameContainer.appendChild(classRedirectText)
    classItem.appendChild(classNameContainer)
    classItem.appendChild(classButtons)
    classItem.classType = classType // set this for use

    return classItem
}

function populateClassesContainer(studentData) {
    const classContainer = $(".class-container")

    // these will be implemented better later
    const classTypes = ["leader", "student"]

    for (classType of classTypes) {
        for (let i = 0; i < studentData[classType].length; i ++) {
            var classPeriod = studentData[classType][i]

            // Create a new row every 3 classes (/ 0, 1, 2, / 3, 4, 5 / 6...)
            if (classContainer.children().last().children().length == 3) {
                let newRow = document.createElement("div")
                newRow.className = "class-row"
                classContainer.append(newRow)
            }

            // use newest row
            const classRow = classContainer.children().last()

            classRow.append(createClassDiv(classPeriod, classType))
        }
    }
}

function editClassContainer(id) {
    // one at a time, ladies
    if (savedClassData != null) {
        alert(`Please finish editing "${editing}" before editing another class.`)
        return
    }

    const classContainer = $(`#class-${id}`)

    // Store the original class data
    savedClassData = {
        id: id,
        name: classContainer.find(".class-name a").text(),
        type: classContainer[0].classType
    }

    // Access and store current color (container > title container)
    savedColor = rgbToHex(window.getComputedStyle(classContainer[0]).backgroundColor)

    // Clear div
    classContainer.children().first().remove()

    // Create main editing container
    const editContainer = document.createElement('div')
    editContainer.className = "class-options"

    // create the row of color options
    const colorContainer = document.createElement('div')
    colorContainer.className = "colors-row"

    // create the 10 default color squares with loop power!
    for (let i = 0; i < 10; i ++) {
        const colorSquare = document.createElement('div')
        colorSquare.className = 'color-square'

        colorSquare.onclick = function() {
            setColorFromSquare(rgbToHex(window.getComputedStyle(colorSquare).backgroundColor))
        }

        colorContainer.appendChild(colorSquare)
    }

    // Create container for custom color
    const customColorContainer = document.createElement('div')
    customColorContainer.className = 'custom-color'

    // Create items for custom color section and append
    const customColorSquare = document.createElement('div')
    customColorSquare.className = 'color-square'
    customColorSquare.id = 'custom-color-square'
    customColorSquare.style.backgroundColor = savedColor
    customColorContainer.appendChild(customColorSquare)

    const customColorInput = document.createElement('input')
    customColorInput.placeholder = savedColor
    customColorInput.id = "custom-color-input"
    customColorInput.onkeyup = function () { setColorFromInput(id) }
    customColorContainer.appendChild(customColorInput)

    // Create container for buttons
    const customContainerButtons = document.createElement('div')
    customContainerButtons.className = 'buttons'

    // Loop to make buttons
    const buttons = [
        ["CANCEL", function() { cancelEdits(id) }],
        ["APPLY", function() { applyEdits(id) }],
    ]

    for (buttonData of buttons) {
        const button = document.createElement('button')
        button.innerHTML = buttonData[0]
        button.onclick = buttonData[1]
        customContainerButtons.appendChild(button)
    }

    // Append all to the editing container
    editContainer.appendChild(colorContainer)
    editContainer.appendChild(customColorContainer)
    editContainer.appendChild(customContainerButtons)

    // Append editing container
    classContainer.prepend(editContainer)
}

function cancelEdits(id) {
    const thisClass = $(`#class-${id}`)

    // Use the savedClassData to restore the class div
    const newClass = createClassDiv(savedClassData, savedClassData.type)
    
    // Replace old class
    thisClass.replaceWith(newClass)

    // Restore the original background color
    $(`#class-${id}`).css("background-color", savedColor)

    // Clear the stored original data
    savedClassData = null 
}

function applyEdits(id) {
    const color = document.getElementById('custom-color-square').style.backgroundColor
    const thisClass = $(`#class-${id}`)

    // Use the savedClassData to restore the class div
    const newClass = createClassDiv(savedClassData, savedClassData.type)
    
    // Replace old class
    thisClass.replaceWith(newClass)

    // Restore the original background color
    $(`#class-${id}`).css("background-color", color)

    // Clear the stored original data
    savedClassData = null 
}

function setColorFromSquare(color) {
    console.log(color)
    const colorSquare = document.getElementById('custom-color-square');
    const colorInput = document.getElementById('custom-color-input');

    colorSquare.style.backgroundColor = color;
    colorInput.placeholder = color;
}


function setColorFromInput() {
    const input = document.getElementById("custom-color-input")
    const color = input.value

    // #------
    if (color.length > 6 && color.length < 10) {
        document.getElementById('custom-color-square').style.backgroundColor = color
    }
}

// I took this from the internet
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(rgb) {
    const values = rgb.slice(4, rgb.length - 1).split(", ");
    const r = parseInt(values[0]);
    const g = parseInt(values[1]);
    const b = parseInt(values[2]);
    
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

  