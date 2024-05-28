window.addEventListener('load', function() {
    getUserData();
});

const local = 'http://localhost:8911';
const deployed = 'https://jcc.stu.nighthawkcodingsociety.com';

function getUserData() {
    // making the fetch request
    fetch(local + '/api/class_period/dashboard', {
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
        // window.location.replace(`${baseurl}/sign-in/`);
    });
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
            assignmentNameRedirect.innerHTML = assignment.name
            assignmentNameRedirect.onclick = function() { assignmentRedirect(assignment.id) }
            
            // append redirect to name container
            assignmentNameDiv.appendChild(assignmentNameRedirect)

            // create div for class name
            var classNameDiv = document.createElement('div');
            classNameDiv.className = "class-name"
            
            // create redirect for class name
            const classNameRedirect = document.createElement('a')
            classNameRedirect.innerHTML = classPeriod.name
            classNameRedirect.onclick = function() { classRedirect(classPeriod.id, "student") }

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

function populateClassesContainer(studentData) {
    console.log("test")
    const classContainer = $(".class-container")

    // these will be implemented better later
    const classTypes = ["leader", "student"]

    for (classType of classTypes) {
        for (let i = 0; i < studentData[classType].length; i ++) {
            var classPeriod = studentData[classType][i]

            // Create a new row every 3 classes (/ 0, 1, 2, / 3, 4, 5 / 6...)
            if (classContainer.children().last().children().length == 3) {
                console.log("new row")
                let newRow = document.createElement("div")
                newRow.className = "class-row"
                classContainer.append(newRow)
            }

            // use newest row
            const classRow = classContainer.children().last()

            // make new class container with all the funky stuff
            const classItem = document.createElement("div")
            classItem.className = "class-item"

            // container for the title
            const classNameContainer = document.createElement("div")
            classNameContainer.className = "class-name"

            // title text with redirect
            const classRedirectText = document.createElement("a")
            classRedirectText.innerHTML = classPeriod["name"]
            classRedirectText.onclick = function() { classRedirect(classPeriod.id, classType) }
         
            const classButtons = document.createElement("div")
            classButtons.className = "class-buttons"

            // Simplify all the buttons with a loop
            const buttons = [
                ["assignment-icon.png", "Assignments"],
                ["speaker-icon.png", "Announcements"],
                ["gradebook-icon.png", "Grades"],
                ["ellipsis-v-icon.png", "Options"]
            ]

            for (buttonData of buttons) {
                const classButton = document.createElement("img")
                classButton.src = `../images/icons/${buttonData[0]}`
                classButton.title = buttonData[1]
                classButtons.appendChild(classButton)
            }

            // append all divs to right parts
            classNameContainer.appendChild(classRedirectText)
            classItem.appendChild(classNameContainer)
            classItem.appendChild(classButtons)
            classRow.append(classItem)
        }
    }
}

function assignmentRedirect(id) {
    window.location.href = `${baseurl}/assignment-data?id=` + id;
}

function classRedirect(id, type) {
    window.location.href = `${baseurl}/${type}-class-data?id=` + id;
}