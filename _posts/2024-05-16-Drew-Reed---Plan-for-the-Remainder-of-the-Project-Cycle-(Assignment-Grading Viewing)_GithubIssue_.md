---
title: 'Drew Reed - Plan for the Remainder of the Project Cycle (Assignment Grading/Viewing)'
layout: post
description : Automatically Populated Github Issue
---

## Current State

As things currently are, the assignment object has the following attributes:
- Assignment name
- Date assignment was created
- Date the assignment is due to be submitted
- Content of the assignment

The frontend only currently has the capacity to:
- Display the assignment name
- Display the date that an assignment is due
- Display the content of the assignment

The frontend is also unfinished in terms of design:

<img width="700" alt="Screen Shot 2024-05-15 at 10 49 49 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/4f69fda7-c6c5-4d75-8c65-2c0ea5810712">

There are unfinished and not completely functional measures that have been tested to accept file uploads to assignments.

## The Ideal Final Product

### Assignment Object and Methods

These should all be implemented as attributes of the assignment class:
- Assignment name
- Date assignment was created
- Date the assignment is due to be submitted
- Content of the assignment
- The number of points the assignment is worth
- The allowed submission file types
- A list of assignment submissions (see details below)

Methods should be added/modified such that...
- Assignment data can be fetched with the JWT cookie as context, determining if the user has submitted a given assignment and if they have been graded


### Assignment Submission Object and Methods

The object exists already and is in progress, but should eventually contain:
- The submitter
- The file path of the upload
- The grade (starting at -1 if not graded)
- The time of submission
- The number of submissions for the user

Methods that should exist (many currently exist) are...
- Creating a new submission with a file upload implemented with it, using the student JWT token
- Fetching all submissions sorted by the submitter (for teacher grading)
- Using a JWT cookie to find all submissions for a given user
- Using a JWT cookie to verify that the user is a teacher, a submission should be able to be graded (within the point limitations)

### Frontend Redesign

This is the plan for the appearance of the page for students and their submissions:

<img width="756" alt="Screen Shot 2024-05-15 at 12 19 45 PM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/0310b9d4-b7f8-4062-8349-7835faba6459">

The teachers should be able to see student submissions based on the time and order of their submissions, and to view a preview to the left (see below). They should also be able to submit a grade for a submission on this page (to be implemented where the bolded ratio numbers are listed):

<img width="757" alt="Screen Shot 2024-05-16 at 9 33 14 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/20cc59fb-fa38-442f-87f7-8223a94805e1">

