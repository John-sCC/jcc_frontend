---
title: 'JCC - Ideation and Brainwrite Documentation (Week 1)'
layout: post
description : Automatically Populated Github Issue
---

## Planning for Requirements

When working on our project, here are some overarching ideas that would make our work more professional and align better with the teacher requirements.

- Edit the README file to specify our own purposes. This is especially important if we want our site to be used across Del Norte for years to come.
- Always cite code that is borrowed from outside resources, including teacher and ChatGPT. This is for proper citing practices.
- Data should be represented in tables when possible. "If your site isn't using tables, it indicates that there isn't data."
- Settings/preferences for users
- LocalStorage for saving User preferences and accessing user-specific data from the backend
- “Related data excellent” (?), probably talking about relationships between objects in data

### Copied from Requirements

These are ABSOLUTE requirements. The backend must be done in Java. Also, Java must have a central role in your project for managing Data and Data Structures. This includes use of Spring, REST services with Spring, Spring Security, JWT, JPA, and SQL.

Classroom common requirement. The frontend (FE) for user must be done in JavaScript and GitHub Pages. User Login and screens and designs will use SASS for style. There must be clear separation between CSS/Style and HTML/DOM.

Backend (BE) and Thymeleaf. The backend must have an administrative UI. The backend framework that you were given utilizes bootstrap, you can change this to any framework of your choice. To support backend design here is an [older project](To support backend design here is an older project)

Teacher expects that your program follows the REST API and Database paradigm. There must be evidence of this paradigm in your project, in multiple places.

## Project Ideas

### Overall

Our project will be creating a site that Del Norte teachers can use for common teacher-related tasks. We want to have a specific emphasis on STEM courses, but the features of this website can be applied by teachers across the board.

We know that the site will incorporate the ability for a teacher to create an account, and then create their classes for each period of the day. For example, Mr. Jenkins could create an account, and then, within the 2023 Trimester 2 section, create five classes (one for each period of the day) that contain the names of each student. Each student will be its own object that has a relationship to the classroom and the other students. We are considering using a system that would allow students to sign into the site and be enrolled in the teacher's classroom, allowing them to use features offered to them. The question is which services specifically should be implemented.

#### Overall Services

This section focuses on ideas for non-specific subject courses. This will be the main focus of the Period 1 JCC, as our ideas so far are only as interconnected as the teacher and student objects are concerned (less direct connection to each other). Here are our current concepts:
- (Mr. Jenkins Idea): Random/custom table generation with student drag and drop.
- (AJ): Similar to Kahoot, but students already have class accounts so there's no problem with weird nicknames. Scores saved to student objects
    - This assumes we follow through on student sign-in option.
    - (Toby): I have experience with websockets so I can help make this one work if we want it to be a live situation like Kahoot.
    - Note: this basic idea has been done before by another group and mostly improved upon Kahoot with cool animations, but we want to make it easier for the teacher by having it in the same place as other resources and integrating it with the class roster features.
- (Period 1 Group Discussion): Similar to Canvas (kind of), as an extension of teachers being able to make quizzes (live or not live), there could also be informational posts/assignment materials posted on the class pages.
    - Limitations: it would be difficult to make this better than it already is on Canvas. It would also probably require some sort of calendar-based display system that would be kind of intensive to creative.

Our group of three (period 1) plans on also taking care of the login and signup pages for teachers (and students).

#### Data Science/Statistics Content

This section focuses on us spreading data science usage and knowledge to the rest of the school by providing more convenient resources. The Period 3 JCC will be more focused on this part of the project, as the group is all present and . Here are our current concepts:
- (Aiden): Stapplet (statistics) resources made more accessible and easier to use on our site. This would be a great step forward for data science offerings. We will look further into more specifically data-science-related functions to offer.
    - With login, users could potentially store their past work in the backend (POST or PUT request) and bring it back up later. This would be good for stats stuff.
    - (Raymond): We are considering which of the functions from Stapplet would be best to bring over. At the very least, we want to make it easier to input data than it is on Stapplet. We don't know exactly how we'll do that yet.
    - (Ekam): Bring Stapplet collaborative features to the existing connections between teacher and student. The teacher can send out a Stapplet data set link to students (if possible, use URL queries to specify data, etc.) and the students can add to the graph for class data collection.
- (Ishi): QR code generator and redirector for stats surveys. This would save TONS of time for stats students and for the responders. We could have the students be able to create their surveys on the site.
    - Limits, as discussed as group: Would need to ensure the same person didn't respond twice without the need for personal identification, since this can cause response bias in anonymous surveys.
- (Period 3 group discussion): Implementing CSV files into data resources (possibly Stapplet resources reworked) would be a great way of promoting data science

#### Uncertain Ideas That Came From Brainstorming/Brainwriting

Here are some things that we aren't sure about that appeared in brainstorming/brainwriting sessions:

- Using image recognition to convert lists of numbers from the worksheets to a set of numbers for a data set
    - (Aiden): optical character recognition!! raaah!
- (Mr. Carter, the Jenkins sub + Drew): If possible, it would be nice to use this to take attendance. He made a complaint about the current state of attendance and mentioned that he thinks there is a way to connect to Synergy through an API, similar to how Canvas does it. We aren't completely sure about how this will work or if it even COULD, but we wanted to note it.

