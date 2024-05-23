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
- [x] The number of points the assignment is worth
- [x] The allowed submission file types
- [x] A list of assignment submissions (see details below)

Methods should be added/modified such that...
- [x] Assignment data can be fetched with the JWT cookie as context, determining if the user has submitted a given assignment and if they have been graded


### Assignment Submission Object and Methods

The object exists already and is in progress, but should eventually contain:
- [x] The submitter
- [x] The file path of the upload
- [x] The grade (starting at -1 if not graded)
- [x] The time of submission
- [x] The number of submissions for the user

Methods that should exist (many currently exist) are...
- [ ] Creating a new submission with a file upload implemented with it, using the student JWT token
- [x] Fetching all submissions sorted by the submitter (for teacher grading)
- [x] Using a JWT cookie to find all submissions for a given user
- [x] Using a JWT cookie to verify that the user is a teacher, a submission should be able to be graded (within the point limitations)

### Frontend Redesign

This is the plan for the appearance of the page for students and their submissions:
- [ ] Data Display
- [ ] Submission functionality
- [ ] Styling

<img width="756" alt="Screen Shot 2024-05-15 at 12 19 45 PM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/0310b9d4-b7f8-4062-8349-7835faba6459">

The teachers should be able to see student submissions based on the time and order of their submissions and to view a preview to the left (see below). They should also be able to submit a grade for submissions on this page (to be implemented where the bolded ratio numbers are listed):

- [ ] Data Display
- [ ] Grading functionality
- [ ] Preview functionality (Raymond portion)
- [ ] Styling

<img width="760" alt="Screen Shot 2024-05-20 at 11 23 34 AM" src="https://github.com/John-sCC/jcc_frontend/assets/111479240/3fb09bda-69de-4334-b7c9-3b0075859005">

## Ideal Event Demonstration

After user creation (Kevin), site navigation (Ekam/Ishi), and class period creation (Drew?)...
- Show assignment creation (AJ's focus)
- Show assignment submission (Drew/Raymond focus, Drew pilots for Raymond to take following...)
- Show teacher view of submission and grading (Drew/Raymond focus, Raymond pilots discussion of preview)

Then continue to teacher communication...

## Timeline

| Feature | Deadline | Details |
| --- | --- | --- |
| Backend: New Methods, Attributes | Tuesday, May 21 | Finish methods for Assignment and AssignmentSubmission classes detailed in the issue above. |
| Frontend: Student Submission View | Thursday, May 23 | Finish styling and communication of backend data to the student frontend screen, including a pull that determines student relationship to an assignment |
| Frontend: Teacher Submission View | Friday, May 24 | Should be primarily adapted from the student view, but with accommodation of teacher grading capability. Raymond's preview feature will be implemented if possible, but if not, grading will at least be accommodated. Worst case, file downloads are utilized. |
| Backend: Testing and Update to Deployment | Monday, May 27 | Over this weekend, I will ensure that all changes made locally to the Assignment branch are reflected to the deployed format. Deployed link will be used on the frontend as well.

