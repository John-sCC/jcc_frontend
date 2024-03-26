---
title: 'JCC - Feature Ready Review 02 08 2024'
layout: post
description : Automatically Populated Github Issue
---

## Key Features

### Interacting With Classes

Users can join/be added to a class by leaders of a class. Once added, they will be able to see and work with content from the class, including assignments, quizzes, data sets and the seating chart.

![Image](https://github.com/John-sCC/jcc_frontend/assets/111479240/58cf106a-121e-4402-8f75-f20bfaf03a3f)

The login system works (if you're not Drew), and the backend has token information fully implemented when making requests. For example:

```java
@PostMapping("/set_seating_chart")
    public ResponseEntity<Object> setSeatingChart(@RequestBody SeatingChart seatingChart) {
        // retrieving the current authentication details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        // find ID 
        ClassPeriod classPeriod = repository.findById((seatingChart.getClassId()));
        if (classPeriod != null) {  // Good ID
            boolean userIsLeader = false;
            for (Person leader : classPeriod.getLeaders()) {
                if (leader.getEmail().equals(email)) {
                    userIsLeader = true;
                }
            }
            if (userIsLeader) { //...
```

By using the JWT to recognize the user's identity, we...
- Restrict certain specific methods due to ClassPeriod status, which is not stored as a user role because it differs from ClassPeriod to ClassPeriod
- Automate the process of fetching the user's own information on the frontend, between pages, etc.

#### Runtime Display

[Click here](https://john-scc.github.io/jcc_frontend/user-disp-test/) for a demo (styling not finished) of how we would provide a User's dashboard following sign-in. The debug menu at the top is a placeholder--the JWT will normally tell the backend which user is signed in and, accordingly, which data to present. A special request using user ID is being used in the meantime.

If you click on an assignment's name, you'll see that you're redirected to a page with the larger assignment info. As things like assignment attachments and the Quiz subclass object of Assignment are finished, there will be more to interact with on these pages.

### Image Recognition

See #30 for all of the progress made toward image recognition.

This feature will be used to solve a common complaint with Stapplet. People find it frustrating to have to manually type a bunch of data points into Stapplet for data collection, so, using image recognition, we will make it possible to take a photo/screenshot of the data and then convert it to more readable statistics.

### QR Code Generation

<img width="568" alt="Screen Shot 2024-02-08 at 8 58 05 AM" src="https://github.com/John-sCC/jcc_frontend/assets/91164416/c2eb4eaf-d4b6-44c8-9b15-4ee33f717090">

On the frontend this is an example of the fetch request in which we input the links and frequencies. 

<img width="753" alt="Screen Shot 2024-02-08 at 8 58 34 AM" src="https://github.com/John-sCC/jcc_frontend/assets/91164416/c15af03f-5bff-4751-96b5-1ed5d6165be0">

On the backend we have methods to get a specific qr code based on the ID and code to create new entries in the database. I created 3 unique objects for this, one called LinkFreqs to group a link to a frequency, one called QrCode which is the database entry, and one called qrCodeRequest which I was able to use to parse the request I sent through to the backend. I also learned more about how to use embeddable objects, as you can see I have to initialize the object first before sending it back to the frontend, because otherwise the object is loaded lazily, so it wont actually give you the attributes of the object. 

```
{ 
  id: int,
    links : [
      {string: link, frequency: double} - linkFreq object
      {string: link, frequency: double}
      {string: link, frequency: double}
    ]
}
```

This is what the backend object looks like.

We now have a working page on the frontend to generate a QR code for which different assigned URLs have different frequencies.

[Click here](https://john-scc.github.io/jcc_frontend/2024/01/25/qrcodetestbackend.html) for the runtime page.

The main goal with this feature now is to directly connect it to the Person object so that someone's QR codes can be stored and recalled from their dashboard/data display.

### Table (Seating Chart) Generation

I started with testing the table generation features on a markdown page and figured out making teams from arrays

Then I made a page for full CRUD operations to work with tables.

All that remains to be done is connecting to the backend classes directly and combining the table features with the crud freatures. A method already exists on the backend to save the seating chart (corresponding to the one on the frontend) to the ClassPeriod object to be viewed again ([linked here](https://github.com/John-sCC/jcc_backend/blob/17294a39be76584cb7daa286d7ab65fb5d6732b8/src/main/java/com/nighthawk/spring_portfolio/mvc/classPeriod/ClassPeriodApiController.java#L141)) as well as a [request object](https://github.com/John-sCC/jcc_backend/blob/master/src/main/java/com/nighthawk/spring_portfolio/mvc/classPeriod/SeatingChart.java) to more easily accept the seating chart data.

## Long-Term Plan

[DISCUSS]
- Quiz object: Canvas quizzes and Kahoot-esque live quizzes

## N@TM Requirement: AP / Java Key Parts </h2>

Below is one example listed to meet each of the requirements for AP/ Java Key Parts. Much of this work has been done for multiple objects, for different aspects of our projects. 

### Class Definition for Database

<img width="958" alt="Screen Shot 2024-02-07 at 10 24 03 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111466888/383904ab-71c9-47a3-a473-4a6790fc13c4">
<img width="922" alt="Screen Shot 2024-02-07 at 10 24 39 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111466888/061a50fe-07ce-439b-8d7c-6b1419a806c7">

The ClassPeriod class is defined to store the students, teachers/leaders, and assignments for a class under one object. The class is a POJO, which also uses a few annotations. The @Setter, @Getter, @ToString, @NoArgsConstructor, and @RequiredArgsConstructor add some functionality to the POJO. The last annotation -- @Entity -- creates the SQLite database itself. 

The class is built with relationships (@ManytoMany) to allow the people added to the Class Period to interact with it in different ways. People will be allowed to do different things to the Class Period based on the access granted to them by their role. 

**Leader Join Table**

![Image](https://github.com/John-sCC/jcc_frontend/assets/111479240/850bf19d-3028-4423-95a9-2e6178b93c4f)

**Student Join Table**

![Image](https://github.com/John-sCC/jcc_frontend/assets/111479240/3d705e97-4216-44d3-8a53-257697f448c6)

There are still a few features that need to be added to this particular class. A couple of these include requiring the user to set a "leader" before they are able to add their class period to our database. Another is a seating chart stored using HashMaps


### JPA Crud Operations

For the Class Period class:

<img width="952" alt="Screen Shot 2024-02-07 at 10 44 43 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111466888/c3d69895-cdce-482f-888b-8aacea49c36f">
<img width="948" alt="Screen Shot 2024-02-07 at 10 45 09 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111466888/e3a420d2-173d-448d-9037-882119ee5054">
<img width="949" alt="Screen Shot 2024-02-07 at 10 45 42 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111466888/37b3cc02-5fa2-4e39-95f3-45d761312267">

A list of all the operations made for this class:

* GET List of classes [Endpoint: @GetMapping("/")]:
      Retrieves all ClassPeriod objects from the database using repository.findAllByOrderByNameAsc().

* GET individual ClassPeriod using ID [Endpoint: @GetMapping("/{id}")]:
      Retrieves a single ClassPeriod object by its ID using repository.findById(id).

* DELETE individual ClassPeriod using ID [Endpoint: @DeleteMapping("/delete/{id}")]:
      Deletes a ClassPeriod object by its ID using repository.deleteById(id).

* POST a record by Requesting Parameters from URI [Endpoint: @PostMapping("/post")]: 
      Creates a new ClassPeriod object with the provided name and saves it to the database.

* Seating chart modification [Endpoint: @PostMapping("/set_seating_chart")]:
      Modifies the seating chart for a ClassPeriod object identified by its ID.

## Image Recognition

### What has been accomplished (Backend)
Summary: The backend now has an api endpoint that receives an image and outputs all numbers recognized and identified in the image. 
When the image is uploaded, it is first stored into a temporary directory before being stored in the file system under the "./imagerec/StoredImages" folder. Then it uses the OCRService to simply call the Tesseract API and return its output:
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/14d52fc0-0978-401e-9161-c97e024d0250)
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/b0061482-0a26-4473-ab84-79d253c1a37e)

### What has been accomplished (Frontend)
Summary: The frontend allows users to upload an image (currently the image only works with typed content because Tesseract struggles to recognize handwriting) and the crop the image to show only the numbers before sending the new cropped image to the backend.
It makes use of the cropper.js library and provides image previews of both the pre-cropped image and the post-cropped image. 
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/cc871b48-865c-40c6-a946-b401aab13e56)
![Image](https://github.com/John-sCC/jcc_frontend/assets/142441804/1c96a4fa-1c63-4a72-b77b-278a43f17f3e)
For the future, we can add a default image that displays in the preview section before any file has been uploaded


### API Request and Response

[Click here](https://john-scc.github.io/jcc_frontend/user-disp-test/) and see the assignment redirects for multiple instances of information being requested and sent from the backend, plus formatting that makes it more readable.

![Image](https://github.com/John-sCC/jcc_frontend/assets/111479240/58cf106a-121e-4402-8f75-f20bfaf03a3f)

Our /authenticate request also does send a cookie with the corresponding user information.

## Coding Features

Show coding features:  Input (Input validation, multiple paths of code), Output (HTML generation), Format/Visualization (SASS generated CSS), Data/Array/JSON management, Multiple endpoints Get/Post/Put/Delete (alternate paths for code), Database initialization,  SQL visualization.

To save from repetition, here are some links that demonstrate each of the described requirements:
- **Input** and **Output**: [Click here](https://john-scc.github.io/jcc_frontend/user-disp-test/) to see the ID input and formatted HTML user class data output.
- **Format/Visualization**: Our website is based heavily on strong foundational SASS, so look at [these custom variables](https://github.com/John-sCC/jcc_frontend/blob/main/_sass/minima/custom-variables.scss) and the custom SASS used on individual elements like [the navbar](https://github.com/John-sCC/jcc_frontend/blob/main/_sass/minima/pages/nav.scss) and [dashboard demo](https://github.com/John-sCC/jcc_frontend/blob/main/_sass/minima/pages/dashboard.scss)
- **JSON Management**: All things mentioned here are shown in the **Input** and **Output**, but also see the table generation page for more JSON management
- **Multiple Endpoints**: See each API file for [Assignment](https://github.com/John-sCC/jcc_backend/blob/master/src/main/java/com/nighthawk/spring_portfolio/mvc/assignment/AssignmentApiController.java), [ClassPeriod](https://github.com/John-sCC/jcc_backend/blob/master/src/main/java/com/nighthawk/spring_portfolio/mvc/classPeriod/ClassPeriodApiController.java) and [QRCode](https://github.com/John-sCC/jcc_backend/blob/master/src/main/java/com/nighthawk/spring_portfolio/mvc/qrCode/QrCodeApiController.java)
- Database Initialization: See all of our objects initialized in [ModelInit.java](https://github.com/John-sCC/jcc_backend/blob/master/src/main/java/com/nighthawk/spring_portfolio/mvc/ModelInit.java)

## Team Work Style

Our team has stuck with its dedication to the established Agile principles and systems. We have worked through a system of branches and pull requests consistently throughout the process, including this week.

[Our Scrum Board](https://github.com/orgs/John-sCC/projects/1/views/1) remains up-to-date with our progress on our tasks. Pull requests are linked to relevant parts of the board.

## Individual Contributions

| Name | Key Commits | Description of Achievements | Analytics |
| --- | --- | --- | --- |
| Drew Reed | [Bulk of ClassPeriod-Assignment connection](https://github.com/John-sCC/jcc_backend/pull/15/commits/201fdcd55462319368511fb484992492cd767ca4), [commits to user_data branch for dashboard and assignment display](https://github.com/John-sCC/jcc_frontend/pull/34/commits) | Since finishing the basic features of ClassPeriod two weeks ago, I got closer to finishing ClassPeriod implementation by connecting to Assignment object (key commit 1). Primarily responsible for visualizing ClassPeriod and connections to it through Dashboard on frontend (key commits 2 and 3). | [Overall](https://github.com/drewreed2005), [Frontend contributions](https://github.com/John-sCC/jcc_frontend/graphs/contributors), [Backend contributions](https://github.com/John-sCC/jcc_backend/graphs/contributors) | later |
| AJ Ruiz | [Contributions Issue](https://github.com/KKcbal/KingCobain/issues/4) | [Contributions issue](https://github.com/KKcbal/KingCobain/issues/4) | [Contributions issue](https://github.com/KKcbal/KingCobain/issues/4) |
| Ekam Kaire | [framework of log-in page w/ beginnings of AJAX request](https://github.com/John-sCC/jcc_frontend/commit/f877ef31cec1909bd80312bb5d3ddb51203f2ad3), [CORS fix for log-in page](https://github.com/John-sCC/jcc_frontend/commit/2e9db3f75c179f6a1ac9b9a34bf565dc9c070552), [MIME error fix](https://github.com/John-sCC/jcc_frontend/commit/0c61e0a525ee1cb8ba1e347c350ced790bac359e) |  This week I worked on the user log-in page. This included creating the HTML page, fixing CORS errors, and fixing SecurityConfig.| [frontend](https://github.com/John-sCC/jcc_frontend/graphs/contributors), [backend](https://github.com/John-sCC/jcc_backend/graphs/contributors)
| Aiden Huyhn | Table Gen CRUD | Full CRUD using localstorage, will be converted to backend use over next week | [Overall Commits](https://github.com/aidenhuynh6) |
| Toby Leeder | [QR Code Frontend Pull Request](https://github.com/John-sCC/jcc_frontend/commit/8a717f47cee7d652e2ba53d29a1d6d6f2c44d4c9) [Finished Frontend Accepting QR code](https://github.com/John-sCC/jcc_frontend/commit/69052413b367036ae203bf59ae8f2b36931e0dd1) [Created QR code API](https://github.com/John-sCC/jcc_backend/commit/a59a3caf9a4a76f5a124e6ec8583aa60b530ca0e) | Developed system to generate QR codes which randomly redirect the user to a user chosen number of links. This is done by giving each combination of links a unique ID on the backend and connecting that ID to the QR code through the QR code hash. Then, this hash is read and the backend data is pulled to find the links and frequencies for each link. The randomization is then handled on the frontend to redirect the user. | [Overall](https://github.com/Toby-Leeder), [Frontend contributions](https://github.com/John-sCC/jcc_frontend/graphs/contributors), [Backend contributions](https://github.com/John-sCC/jcc_backend/graphs/contributors) |
| Ishi Singh | [Image Rec Frontend](https://github.com/John-sCC/jcc_frontend/commit/3e71fb977c15bfe63c004f7cab8a61ee24fd96fe) | I worked with Raymond in creating the frontend for the image recognition feature and besides that I mainly worked on the frontend and started to implement the wireframes | [frontend](https://github.com/John-sCC/jcc_frontend/graphs/contributors), [backend](https://github.com/John-sCC/jcc_backend/graphs/contributors)
| Raymond Sheng | [Backend-Uploading](https://github.com/John-sCC/jcc_backend/commit/451f1cde2a399ba5258a8c1537d56f9e081cf11b), [Backend-OCR functionality](https://github.com/John-sCC/jcc_backend/commit/c2102acabe92c44949b613c584a2d93d99b8c873), [Frontend-Fix Cropping](https://github.com/John-sCC/jcc_frontend/commit/3e71fb977c15bfe63c004f7cab8a61ee24fd96fe), [Frontend-Images are reloaded on Upload](https://github.com/John-sCC/jcc_frontend/commit/6aee199f18f8cd28c6019608a47d7ca5e00b8148)  | I finished both the frontend and backend integration for the image recognition/OCR aspect of our stats app, centering on an easier uploading of data. I was primarily responsible for integrating Tesseract into our project backend. | [Overall analytics](https://github.com/raymondYsheng)

