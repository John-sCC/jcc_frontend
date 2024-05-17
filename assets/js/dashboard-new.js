window.addEventListener('load', function() {
    getUserData();
});

const local = 'http://localhost:8911';
const deployed = 'https://jcc.stu.nighthawkcodingsociety.com';

function getUserData() {
    // making the fetch request
    fetch(deployed + '/api/class_period/dashboard', {
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
        populateClassesContainer(data.student, false);
        populateClassesContainer(data.leader, true);
        document.getElementById("dashboard_container").style = "display:block;";
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        window.location.replace(`${baseurl}/sign-in/`);
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

function populateClassesContainer(studentData, isLeader) {
    var bigContainer = document.getElementById('student_class_container_container');
    var container = document.getElementById('student_class_container');
    if (isLeader) {
        bigContainer = document.getElementById('leader_class_container_container');
        container = document.getElementById('leader_class_container');
    }
    container.innerHTML = '';

    for (var classPeriod of studentData) {
        var card = document.createElement('div');
        card.classList.add('card');

        var classPeriodName = document.createElement('div');
        classPeriodName.classList.add('main-name');
        classPeriodName.textContent = classPeriod.name;

        // adding a click event listener to the assignmentName div
        if (isLeader) {
            classPeriodName.setAttribute("onclick", "classLeaderRedirect(" + String(classPeriod.id) + ")");
        } else {
            classPeriodName.setAttribute("onclick", "classStudentRedirect(" + String(classPeriod.id) + ")");
        }

        var leaderNames = document.createElement('div');
        leaderNames.classList.add('second-name');
        leaderNames.textContent = "Leaders: ";
        for (var i = 0; i < classPeriod.leaders.length; i++) {
            leaderNames.textContent += classPeriod.leaders[i].name;
            if ((i + 1) < classPeriod.leaders.length) {
                leaderNames.textContent += ", ";
            }
        }

        var numberOfAssignments = document.createElement('div');
        numberOfAssignments.classList.add('third-name');
        var assNumber = classPeriod.assignments.length;
        var plurality = "s";
        if (assNumber == 1) plurality = "";
        numberOfAssignments.textContent = String(assNumber) + " Assignment" + plurality;

        card.appendChild(classPeriodName);
        card.appendChild(leaderNames);
        card.appendChild(numberOfAssignments);

        container.appendChild(card);
    }
    if (container.children.length === 0) {
        bigContainer.style.display = 'none';
    } else {
        bigContainer.style.display = 'block';
    }
}

function assignmentRedirect(id) {
    window.location.href = `${baseurl}/assignment-data?id=` + id;
}

function classStudentRedirect(id) {
    window.location.href = `${baseurl}/student-class-data?id=` + id;
}

function classLeaderRedirect(id) {
    window.location.href = `${baseurl}/leader-class-data?id=` + id;
}

function generalRedirect(urlExtension) {
    window.location.href = `${baseurl}` + urlExtension;
}