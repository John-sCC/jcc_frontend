---
title: 'Big Project Feature Check #1 - 3/18 Team Review'
layout: post
description : Automatically Populated Github Issue
---

## Runtime Links

* [Frontend](https://john-scc.github.io/jcc_frontend/)
* [Deployed Backend](https://jcc.stu.nighthawkcodingsociety.com/)

## Team Organization (Review)
![Screen Shot 2024-03-15 at 9 05 09 AM](https://github.com/John-sCC/jcc_frontend/assets/112529809/8c01dede-0ab4-4083-b6f1-1e27f163bca1)

<details>
<summary>Full Member List</summary>

#### Team 1
| Name | Role |
| --- | --- |
| Aiden | Subteam Leader/Frontend lead/sass god/some backend |
| Ishi | Frontend |
| Ekam | Backend |

#### Team 2
| Name | Role |
| --- | --- |
| Aiden | same guy as before! |
| Ryan | Full stack developer!! |
| Edwin | Frontend |

#### Team 3
| Name | Role |
| --- | --- |
| Drew | Subteam Leader/Fully stacked 😱  |
| Raymond | Full stack developer |
| Haoxuan | Backend |
| AJ | Full stack developer |

#### Team 4
| Name | Role |
| --- | --- |
| Toby | Subteam Leader/DevOps/Backend/Websocket/Branches/Maintainer |
| Isabelle | Backend |
| Aaron | Frontend |
| Kevin | Swing |
</details>

[Agile Manifesto](https://github.com/John-sCC/jcc_frontend/issues/56)

## Features & Demos

### FRQ 1 Lesson (Triangle 1)

* Important syntax
* Example FRQ
* MCQ
* Common Mistakes

https://john-scc.github.io/jcc_frontend/2024/03/19/Arrays_IPYNB_2_.html

### New/Improved Wireframes (Triangle 2)

New members = new features = new [WIREFRAMES!!](https://docs.google.com/presentation/d/1DYGLNGXvdMkkJJSRu71eUlVI5elo95R_dUn3O1zLDcs/edit?usp=sharing)

![Screen Shot 2024-03-18 at 7 50 39 AM](https://github.com/John-sCC/jcc_frontend/assets/112529809/4bec4582-b028-4a30-bf45-6cdf49b6d3f3)

![Screen Shot 2024-03-18 at 7 50 50 AM](https://github.com/John-sCC/jcc_frontend/assets/112529809/e415d768-5a75-43af-a7a8-d927469b2f74)

### Drag & Drop - Table Generator (Triangle 1/2)

Fully implemented functionality to drag and drop members of a table to different tables on our generator page using jQuery API's .draggable() and .droppable() methods.

#### Video Demonstration
![demo](https://github.com/John-sCC/jcc_frontend/assets/112529809/84ced7d7-7c1c-49c6-8ca9-25acdead9f02)

#### Links
* [Runtime](https://john-scc.github.io/jcc_frontend/tablegenerator)
* [Pull Request](https://github.com/John-sCC/jcc_frontend/pull/50)

#### Next Steps
- Hover animations
- Enter event listeners on most text boxes (i.e. changing name of class)
- Prompt to verify if really want to delete class
- A new dropzone underneath each table to add members to a table without swapping (adding 1 to a 4 person team)
- Backend integration

### JWT Implementation with Dashboard and ClassPeriod Creation (Triangle 3)

**Drew's** largest contributions in the past week have been related to implementing the JWT as a security and ease-of-navigation feature using the `@CookieValue` tag of the Spring backend.

* [Frontend pull request](https://github.com/John-sCC/jcc_frontend/pull/60)
* [Backend pull request](https://github.com/John-sCC/jcc_backend/pull/28)

#### Runtime

* [Sign-in Page](https://john-scc.github.io/jcc_frontend/sign-in/)
* [Dashboard](https://john-scc.github.io/jcc_frontend/dashboard/)
* [Class Creation Page](https://john-scc.github.io/jcc_frontend/class-create/)

#### Video Demonstration

[Click here](https://drive.google.com/file/d/18W1G1CaQKQ1JZMIzl3rJS9VBoxRn4ENq/view?usp=sharing) to see a short demonstration of the functionality of the combination of the new frontend and backend contributions.

#### Future Improvements

* Styling on class period creation and period data screen (waiting on wireframe)
    - If assignments are empty, an option to create the first assignment should be present
    - A new menu for dynamically searching for and inviting students to a class
* POST method for adding multiple students at a time that utilizes the same JWT identification method (to ensure that the leader is the one adding students in the request)
* (Within the scope of Person) An attribute to store ClassPeriod invitations for each user so that they can consent to joining a class, preventing potential spam

### Stats Data Calculation and Storage on Backend (Triangle 3)

See the relevant [pull request here](https://github.com/John-sCC/jcc_backend/pull/26).

**Raymond** focused his efforts on creating backend objects that can be used to store graphing/stats data on the backend for use in classes/individually on the frontend, as well as methods used to calculate data for the provided data set ([commit](https://github.com/John-sCC/jcc_backend/pull/26/commits/f44d0621e6705ff80ce853c64aed861ec49d6118)). Example below:

```java
public class StatsFunctions {
    public double calculateMean(List<Double> dataset)
    {
        double sum = 0;
        for (double i : dataset)
        {
            sum += i;
        }
        double mean = sum / dataset.size();
        return mean;
    }
    // more below
}
```

**Haoxuan** spent time reviewing the codebase and has begun work on GET and POST endpoint methods to be utilized on the frontend ([commit](https://github.com/John-sCC/jcc_backend/pull/26/commits/fe431c306e8d78eda8a7548beb4f307ad4960f96)). Example below:

```java
public class StatsApiController {
    @GetMapping("/get")
    public ResponseEntity<List<double>> getCorrelation() {
        List<Quantitative> quan = repository.findAll();
        List<double> correlations = new ArrayList<>();
        for (int i=0;i<quan.size();i++){
            correlations.add(quan.get(i).getCorrelation());
        } 
        return correlations;
    }
}
```

#### Current Features

* Can create new data types for multiple group Quantitative and Categorical data.
* Basic (necessary) statistical functions
    - Calculate mean, standard deviation, minimum, maximum, median and correlation

#### Future Implementation

* Frontend graphing functionality will need to be paired with this backend data
* Needs specified GET endpoints for each type of data (Raymond)
* No existing endpoint for post (Haoxuan)
* No collaborative option implemented yet

### Assignment JWT Functionality (Triangle 3)

This week, **AJ** focused on implementing the new working JWT functionality with Assignment creation. The POST method has been modified to check if the signed-in user has leader permissions in the ClassPeriod(s) they're trying to make an assignment within.

* [Pull request](https://github.com/John-sCC/jcc_backend/pull/29)
* [Runtime](https://john-scc.github.io/jcc_frontend/ass-request/)

#### Future Improvements

* Styling overhaul on the frontend part of the assignment request
* Assignment object attribute for storing user assignment submissions (hopefully multiple filetypes)
    - Possible to specify if an assignment should not have submissions (an announcement)
* Assignment information change to be able to store images to be shown in assignments

### Aaron Began working on Stapplet Features (Triangle 4)
[Link](https://github.com/orgs/John-sCC/projects/1/views/1?pane=issue&itemId=56495791)
- Improved styling of stapplet page
- began working on a new data type

### Isabelle Added her feature from her project, video calling (Triangle 4)
[Pull Request](https://github.com/John-sCC/jcc_frontend/pull/61)
- Displays users who are online
- allows video communication 

### Kevin created the search Feature (Triangle 4)
[Pull Request](https://github.com/John-sCC/jcc_backend/pull/23)
- Created student class to integrate to our project. 
- Recreated the student class from his backend, will soon integrate it with our existing person class

### Toby created a system to automatically pull issues (Triangle 4)
[Issue](https://github.com/John-sCC/jcc_frontend/issues/54)
[Pull Request](https://github.com/John-sCC/jcc_frontend/pull/58)
[Blog](https://toby-leeder.github.io/CSABlog/2024/03/14/Secret-Lambda_IPYNB_2_.html)
- Created system to automatically pull github issues into our project
- Utilizes AWS Secrets Manager to store a secret github key
- Utilizes AWS Lambdas and an API Gateway to return that secret key

## Weekly Analytics

### Triangle 1

<details>
<summary>Aiden</summary>
<ul>
   <li><a href="https://github.com/aidenhuynh?tab=overview&from=2024-02-29&to=2024-03-15">Link to analytics</a></li>
</ul>
<img src="https://github.com/John-sCC/jcc_frontend/assets/112529809/7a89cdb0-03d6-4d82-bde0-30ba95b287e6">
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

