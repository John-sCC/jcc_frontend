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
        // populateAssignmentContainer(data.student);
        populateClassesContainer(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // window.location.replace(`${baseurl}/sign-in/`);
    });
}

function populateAssignmentContainer(studentData) {
    const container = document.getElementById('assignment_container');
    container.innerHTML = ''; // clear previous content
    for (var classPeriod of studentData) {
        var classPeriodName = classPeriod.name;
        for (var assignment of classPeriod.assignments) {
            var card = document.createElement('div');
            card.classList.add('card');

            var assignmentName = document.createElement('div');
            assignmentName.classList.add('main-name');
            assignmentName.textContent = assignment.name;
            
            // adding a click event listener to the assignmentName div
            assignmentName.setAttribute("onclick", "assignmentRedirect(" + String(assignment.id) + ")");

            var className = document.createElement('div');
            className.classList.add('second-name');
            className.textContent = classPeriodName;

            var dueDate = document.createElement('div');
            dueDate.classList.add('third-name');
            dueDate.textContent = `Due: ${new Date(assignment.dateDue).toLocaleDateString()}`;

            card.appendChild(assignmentName);
            card.appendChild(className);
            card.appendChild(dueDate);

            container.appendChild(card);
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