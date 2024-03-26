---
title: 'JCC - Checkpoint #1 Ideation Part B Review Ticket'
layout: post
description : Automatically Populated Github Issue
---

## Starting Point

Week 1, we performed a big brainwrite (documented #4) and began work on [wireframes](https://docs.google.com/presentation/d/1DYGLNGXvdMkkJJSRu71eUlVI5elo95R_dUn3O1zLDcs/edit?usp=sharing)/UMLs.

Period 1 got through Sign-in Page and Live Quiz wireframes, as well as an [early backend UML](https://github.com/John-sCC/jcc_backend/issues/1#issuecomment-1888462623) that considered two separate teacher and student objects and their relationships to other objects. Period 3 expanded on this with wireframes for the Home Page, QR Code generator, table/team generator and Stapplet-esque stats/data analytics pages.

We decided to split the project focus up into general features (assignments, table generation, classroom management, signup) for Period 1 and data-related features (QR generator for Stats, Stapplet features, character recognition for graphing, storage/objects for graph) for Period 3.

We created our repositories, but we didn't have any methodology or plan on how to document and show changes to it yet.

## Progress and Planning This Week

### Methodology

We started by outlining our methodology (documented #12) according to the recommendations on Slack. We plan to create branches for sections/tasks within our project (for example, our current user_object and assignment branches) in which related work is completed. Once requirements have been met (according to those outlined in the corresponding issues), a pull request is made, an issue documents features completed and remaining problems/concerns, and the issue is added to the corresponding issue on the Scrum Board for documentation.

We've also decided to meet at least once per week, every Monday, to document progress and outline goals for the week. Work distribution between periods has not been changed, but individual focus (documented #8) has been decided.

Since we were strong with our understanding of what we would be making and how everything would connect, we decided to start work on materials that would act as good bases for jumping into code. Toby has already created branches for everyone to get started within.

We also created [branches](https://github.com/John-sCC/jcc_frontend/branches) which we will be using to organize our workflows. We plan on using a branch for each major feature that we're working on. 

#### Scrum Board

We've been using our Scrum Board very actively for organization. Rather than discuss it with words, [look at it here](https://github.com/orgs/John-sCC/projects/1/views/1). We can go over how we've been utilizing it live.

### Backend

#### Backend Wireframe

To start, we remade our backend wireframe. The early one did not align with our updated view of how the project would work, particularly as it relates to the Person user class. We initially planned to have a student and teacher object that were extensions of a larger User, but we decided that our project would be better if all users could create classes for personal use (clubs, group projects, and even Scrum Teams). Not all concepts have been fully decided (storing HTML data for Assignment, image attachments, etc.), but we've noted those points of confusion in the [issue](https://github.com/John-sCC/jcc_backend/issues/5) and in their corresponding Scrum Board object issues.

#### Person Object

We made progress on the user (Person) object in [its branch](https://github.com/John-sCC/jcc_backend/tree/user_object), [incorporating the attributes](https://github.com/John-sCC/jcc_backend/commit/c24bcb05af548f931157b64d86a08dbdb3329ce0) we know we want/need and leaving connections that haven't yet been made commented in for future implementation. For now, this is Drew's area of focus, but once no more progress can be made in relation to other objects, he will work on sign-in/sign-up on the frontend and assist with the ClassPeriod object.

#### PersonRole Implementation

We plan to implement PersonRole in the same branch, which wasn't the initial plan, because it's so interconnected with that object. While we haven't fully added the functionality to our backend yet, creating our [Roles Lesson](https://nighthawkcoders.github.io/teacher_portfolio//2024/01/19/spring-roles_IPYNB_2_.html) was essentially our way of testing our ideas for roles permissions. [This repository](https://github.com/John-sCC/Roles_BE) has user role implementation (with vestigial student and teacher roles, we'll just use "ROLE_USER") that will be the basis for our implementation on the JCC backend. Roles is Ekam's area of focus for now, and once done, she'll get started on frontend features like class table generation pre-backend connection, at least to get drag-and-drop functionality working.

#### Assignment (Parent) Object

We also planned out the Assignment object that acts as the parent for the Quiz object, but is also its own standalone object to be implemented in ClassPeriod (documented [here](https://github.com/John-sCC/jcc_backend/issues/6)). This is AJ's area of focus. It will likely take time this week to finish, but if it is somehow done in time, he will assist with ClassPeriod and begin work on representing a quiz object on the frontend, particularly the asynchronous quiz.

### Frontend

#### Frontend Wireframe Updates

- Table generation
- Student view of live quiz
- Home page
- Comments and overall revisions

#### Homepage

To prevent the website from looking like a weird amalgamation of different styles, Aiden worked on creating the navbar to establish the sitewide theme and SASS elements for everyone else to build off of. This includes mixins for hovering over elements and variables for the site colors and fonts.

> Mixin for hover
![Mixin](https://github.com/John-sCC/jcc_frontend/assets/112529809/6a4dd838-ad4a-43b6-a3a4-2a2140c1d5fc)

> Variables for establishing site theme
![Variables](https://github.com/John-sCC/jcc_frontend/assets/112529809/47089ee6-864d-4bbc-b608-ecee0073d97f)


### Image Recognition
To facilitate image recognition for a more optimized data input process for our improved Staplett program. We explored multiple existing libraries and APIs that aid in image recognition for the best possible candidate.

- We first looked at the [cvzone](https://github.com/cvzone/cvzone) library, after testing the code blocks given to utilize it, it wasn't working and was giving a traceback error, it also wasn't in Java which made us not want to use it. 
- Another library we found was [Tesseract](https://github.com/tesseract-ocr/tesseract), it also works on Spring and it seems like it will be easier to implement into the project. One caveat of this library is that it takes image files as an input, not base64 or byte strings. We want to use base64 and byte strings for file upload for more efficiency, but using this library will mean that we will have to reconvert the strings into image files, which is inefficient.
- We're thinking of allowing the user to upload their dataset picture and crop it on the frontend so that only the data is shown and that image will be uploaded to the program. Additionally, cropping will help improve upload speeds and efficiency.
- Additionally if we ever decide to do live image recognition we might use [this](https://github.com/ronrest/real_time_multi_digit_recognition) desktop application

### QR Code Generation

We also did some research on the QR code generation feature on the frontend (Documented #20). We plan to use qrcode.js, a library. We added some features to the wireframe. Ishi and Raymond will focus on this more.

