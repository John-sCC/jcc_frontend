---
title: Big Project Feature Check 2
description: Conversion of the larger automated issue to enable comments.
toc: true
comments: true
layout: post
type: project
courses: {csa: {week: 21}}
---

## Runtime Links

* [Frontend](https://john-scc.github.io/jcc_frontend/)
* [Deployed Backend](https://jcc.stu.nighthawkcodingsociety.com/)

## Quick Scoring Box

| Name | Comments |
| --- | --- |
| Aiden | Completed backend integration for table generator |
| Ryan | Ui fixes in sign in page, message inbox system. |
| Edwin | See Ryan's section, worked on features with him. |
| Ekam | Finished Resume feature, started backend with exporting resume as PDF, general frontend/UI fixes |
| Ishi | Finished the coin-flip half of the probability simulator, will start working on the dice-roll half soon|
| Drew | Finished backend implementation of the assignment submission process using Raymond's setup, implementing JWT, creating submission object and creating backend endpoint |
| Haoxuan | Worked on initial versions of backend data storage |
| Raymond | Began framework of backend data storage for Stapplet features, researched and created file upload system for assignment submission (endpoint method, variables, etc.) |
| AJ | Pair programmed with Drew on backend assignment submission, provided guidance on Assignment functionality, worked on translating wireframes to frontend |
| Toby | Worked on backend features for graphing, including quantitative and categorical variables; finished implementation of issue conversion to blog |
| Kevin | Worked on student search features, prior to full implementation with current objects |
| Isabelle | Worked on video call and person status features |
| Aaron | Worked on frontend connection and implementation of graphing features |

## Features & Demos

### Backend Integration of Table Generator

#### Functionality
- Originally wanted to have full CRUD, but this could not work because each student is an object tied to an account; making accounts for this wouldn't make sense
- Combined first iteration of backend functionality with original localStorage functionality to create current iteration
   * When creating a new class, the user is prompted with the option to *import* their existing classes, creating a copy of it locally

Here is the main function for connecting with the backend. It is async so that when it is called using `await` we can return the user's classes if there are any. If the user isn't signed in, it will return an empty array that is checked for in other parts of the code.

```js
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
            throw new Error('Network response was not ok')
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
```

On the backend, the code looks like this, returning the data tied to the user, including their classes.

```java
@GetMapping("/dashboard")
    public ResponseEntity<?> fetchBothClassData(@CookieValue("jwt") String jwtToken) {
        // checking if JWT token is missing
        if (jwtToken.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // getting user data
        String userEmail = tokenUtil.getUsernameFromToken(jwtToken);
        Person existingPerson = personRepository.findByEmail(userEmail);
        if (existingPerson == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<ClassPeriod> student = classPeriodDetailsService.getClassPeriodsByStudent(existingPerson);
        List<ClassPeriod> leader = classPeriodDetailsService.getClassPeriodsByLeader(existingPerson);

        // initializing storage device vrrrmmmm ERRT ERRT ERRT beeeeeep
        HashMap<String, List<ClassPeriod>> classData = new HashMap<>();

        // adding class periods to storage device brrp brrp bleeeeeeebpt
        classData.put("student", student);
        classData.put("leader", leader);

        // return class data
        return new ResponseEntity<>(classData, HttpStatus.OK);
    }
```

#### Styling updates

* New menus for creating classes

##### Wireframe:

![Screen Shot 2024-04-24 at 10 09 45 AM](https://github.com/John-sCC/jcc_frontend/assets/112529809/a646f42e-acee-425d-8f97-bffc429a6569)

##### Integration:

If the user isn't signed in (an empty array is returned by the fetch)

![Screen Shot 2024-04-24 at 10 42 45 AM](https://github.com/John-sCC/jcc_frontend/assets/112529809/cc6c8ea7-c95e-49e8-8316-e407986bffbb)

When signed in:

![Screen Shot 2024-04-24 at 10 44 55 AM](https://github.com/John-sCC/jcc_frontend/assets/112529809/ecf292f8-88cd-49eb-96e0-6fb6abebd0aa)

#### Links
* [Runtime](https://john-scc.github.io/jcc_frontend/tablegenerator)
* [Pull Request (Frontend)](https://github.com/John-sCC/jcc_frontend/pull/50)
* [Pull Request (Backend)](https://github.com/John-sCC/jcc_backend/pull/32)


## Resume Builder

<img width="1184" alt="Screen Shot 2024-04-18 at 8 47 34 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111466888/4c2b8137-4ab2-42f7-853f-2cf47057cbc7">

<img width="1244" alt="Screen Shot 2024-04-18 at 8 50 14 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111466888/682946ff-df6b-4d98-94bf-dcd9a215a2b9">

Finished the feature --> [pull request with all info](https://github.com/John-sCC/jcc_frontend/pull/69)
#### Links
* [Runtime](https://john-scc.github.io/jcc_frontend/resume)

Finished up the user inputs 
Fixed resume framework 
Fixed all css/sass for the pages

## Menu UI

Better menu!!

<img width="911" alt="Screen Shot 2024-04-18 at 8 50 36 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111466888/2f1f34a7-3a71-47f3-9542-182bd861353b">

https://github.com/John-sCC/jcc_frontend/assets/111466888/4de60638-a592-4925-a05c-e1a8b4e6cd37

## Message Inbox system

<img width="959" alt="image" src="https://github.com/John-sCC/jcc_frontend/assets/20897400/b22fd692-3151-481c-bc68-f374a766ab40">

- Gets messages from the backend
- Sorts messages by id
- Displays sorted messages in inbox

### More Wireframes!!

#### Stats Display Page

![Screen Shot 2024-04-18 at 8 44 23 AM](https://github.com/John-sCC/jcc_frontend/assets/112529809/f68afad9-c0aa-4db4-80eb-79bc9243e0f5)

* [Link](https://docs.google.com/presentation/d/1DYGLNGXvdMkkJJSRu71eUlVI5elo95R_dUn3O1zLDcs/edit#slide=id.g2c222159e3d_3_1)

### Probability Simulation

![image](https://github.com/John-sCC/jcc_frontend/assets/82348259/3597f64c-d293-46d9-a8b8-42e4a6d9bbd9)

Wireframe:
![image](https://github.com/John-sCC/jcc_frontend/assets/82348259/02b2948f-2d09-4b76-be69-9afdb4a930d5)

- The user can choose the probability that the coin will land on the head and the number of tosses 
  - There is also a checkbox for ideal probability but I will be removing this since it's redundant
- It updates everytime the "Toss" button is pressed and adds the number of points indicated
- I used chart.js to create the graph

### Assignment Submission and File Uploads

[Pull Request](https://github.com/John-sCC/jcc_backend/pull/33) linked here contains code and key commits.

#### Initial SQL Table

<img width="664" alt="Screen Shot 2024-04-18 at 1 12 18 AM" src="https://github.com/John-sCC/jcc_backend/assets/111479240/9a7693e8-65da-425d-b5d1-a4c89f069c03">

#### File Upload

Signed in as "jm1021@gmail.com", the file "python code image.png" will be uploaded to the assignment "Teddy's Big Bready":

<img width="1433" alt="Screen Shot 2024-04-18 at 1 18 31 AM" src="https://github.com/John-sCC/jcc_backend/assets/111479240/2f029b85-0993-4249-8925-df50bbc72511">

![image](https://github.com/John-sCC/jcc_frontend/assets/142441804/072f1294-68c9-4414-90b1-5631854eb1fd)

![image](https://github.com/John-sCC/jcc_frontend/assets/142441804/fce69654-4c53-41ef-8532-e490457d61ed)

#### SQL Tables After Upload

This is the AssignmentSubmission successfully uploaded:

<img width="656" alt="Screen Shot 2024-04-18 at 1 19 20 AM" src="https://github.com/John-sCC/jcc_backend/assets/111479240/6f70b864-e836-4bc5-8be2-43ca5856553c">

### Student Search Feature

Full [pull request](https://github.com/John-sCC/jcc_backend/pull/34) with relevant code is linked here.

![image](https://github.com/John-sCC/jcc_backend/assets/75040379/4f733661-f085-4345-bada-0c380311c5e9)
Here is the display for searching for most students:

- Input: 
![image](https://github.com/John-sCC/jcc_backend/assets/75040379/dfd29b91-59a4-48c6-b663-12b09d0d6bf8)
- Output: 
![image](https://github.com/John-sCC/jcc_backend/assets/75040379/a8556853-cd2e-4ca1-8fbe-3c953fd788ee)

#### Adding a New Student

##### Input:
![image](https://github.com/John-sCC/jcc_backend/assets/75040379/fe8c5118-0141-464d-a542-0380e8b5442e)
##### Output:
![image](https://github.com/John-sCC/jcc_backend/assets/75040379/b185b188-b0af-4a46-892d-3d77fc6ff29a)

## Weekly Analytics

### Triangle 1

<details>
<summary>Aiden</summary>
<ul>
   <li><a href="https://github.com/aidenhuynh?tab=overview&from=2024-03-01&to=2024-03-31">Link to analytics</a></li>
</ul>
<img src="https://github.com/John-sCC/jcc_frontend/assets/112529809/9d5d1013-3635-4d55-9c2c-d30d06ae9e5f">
</details>
<details>
<summary>Edwin</summary>
<ul>
   <li><a href="https://github.com/EdwinKuttappi?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a>
</li>
</ul>
<img width="402" alt="image" src="https://github.com/John-sCC/jcc_frontend/assets/111558617/a481d598-adc5-43eb-b166-8f1f4f0ce03c">
</details>
<details>
<summary>Ryan</summary>
<ul>
   <li><a href="https://github.com/Ryanrob327?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img src="https://github.com/John-sCC/jcc_frontend/assets/112529809/b8a6871e-5df8-4cab-b64b-ddecea95a100">

</details>

### Triangle 2

<details>
<summary>Ekam</summary>
<ul>
   <li><a href="https://github.com/Ekamjot-Kaire?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img src="https://github.com/John-sCC/jcc_frontend/assets/112529809/6d6880b4-cb2c-41df-9fb2-38e23a82a401">
</details>
<details>
<summary>Ishi</summary>
<ul>
   <li><a href="https://github.com/Ishi-Singh?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img src="https://github.com/John-sCC/jcc_frontend/assets/112529809/3a6e1a71-e393-47e0-807f-327f9b95613e">
</details>

### Triangle 3

<details>
<summary>Drew</summary>
<ul>
   <li><a href="https://github.com/drewreed2005?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img width="700" alt="Screen Shot 2024-03-17 at 10 47 27 PM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/dd12154f-3450-47fa-8a10-e6be8e79a8b1">
</details>
<details>
<summary>AJ</summary>
<ul>
   <li><a href="https://github.com/KKcbal?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img width="700" alt="Screen Shot 2024-03-17 at 10 49 31 PM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/add49626-b797-46b5-a593-99191c654c96">
</details>
<details>
<summary>Raymond</summary>
<ul>
   <li><a href="https://github.com/raymondYsheng?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img width="700" alt="Screen Shot 2024-03-17 at 10 50 40 PM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/5cdfbffa-3659-4e32-9e87-644556715d97">
</details>
<details>
<summary>Haoxuan</summary>
<ul>
   <li><a href="https://github.com/JasoXDDD?tab=overview&from=2024-03-01&to=2024-03-15">Link to analytics</a></li>
</ul>
<img width="700" alt="Screen Shot 2024-03-17 at 10 52 43 PM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/b11b8adc-d592-444d-9714-f6dcce4e0449">
</details>

### Triangle 4

<details>
<summary>Toby</summary>
<ul>
   <li><a href="https://github.com/Toby-Leeder?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img width="790" alt="Screen Shot 2024-03-17 at 9 46 14 PM" src="https://github.com/John-sCC/jcc_frontend/assets/91164416/2ac1c9f2-d8f1-424b-ba80-275a1bee3189">
</details>
<details>
<summary>Aaron</summary>
<ul>
   <li><a href="https://github.com/aaron-rub?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img width="803" alt="Screen Shot 2024-03-17 at 9 46 56 PM" src="https://github.com/John-sCC/jcc_frontend/assets/91164416/fda743b1-bf35-4988-9d42-17ceadadf642">
</details>
<details>
<summary>Isabelle</summary>
<ul>
   <li><a href="https://github.com/isabelle926?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img width="777" alt="Screen Shot 2024-03-17 at 9 47 10 PM" src="https://github.com/John-sCC/jcc_frontend/assets/91164416/597d3340-304b-4b73-85d4-3099ded6865c">
</details>
<details>
<summary>Kevin</summary>
<ul>
   <li><a href="https://github.com/DasMoge124?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img width="792" alt="Screen Shot 2024-03-17 at 9 47 25 PM" src="https://github.com/John-sCC/jcc_frontend/assets/91164416/07e0b7a1-ac64-4d0c-ac87-f7edea052cd8">
</details>