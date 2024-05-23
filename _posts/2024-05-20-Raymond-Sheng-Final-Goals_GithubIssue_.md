---
title: 'Raymond Sheng Final Goals'
layout: post
description : Automatically Populated Github Issue
---

## Final Plans
### Work on File Submissions
We have decided to work on file previews for our assignment objects, and my job will be to work on the backend endpoints to facilitate that.
![image](https://github.com/John-sCC/jcc_frontend/assets/142441804/c852f17d-3f5c-46c6-ab1f-9d3bbf5bc7bb)
![image](https://github.com/John-sCC/jcc_frontend/assets/142441804/bf61cdaf-f145-4925-8235-a817c3c52622)
Our wireframe above indicates the rough idea for my end of the project. Currently, we do not have a specific backend role for teachers/leaders for organizations in our project. Instead, we have lists of leaders in each Class Period which we can iterate through to determine leadership roles in organizations. 
```java
@GetMapping("/preview")
    public ResponseEntity<String> getFilePreview(@CookieValue("jwt") String jwtToken, @PathVariable long id) {
        if (jwtToken.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // getting user data
        String userEmail = tokenUtil.getUsernameFromToken(jwtToken);
        Person existingPerson = personRepository.findByEmail(userEmail);
        if (existingPerson == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        Assignment assignment = repository.findById(id); //find the assignment

        boolean isLeader = false;
        List<AssignmentSubmission> allSubmissionsOut = new ArrayList<>();
        loop1: for (AssignmentSubmission sub : assignment.getSubmissions()) //get all the submissions
        {
            // Person user = sub.getSubmitter(); //get the submitter for each submission to the assignment
            // if (user.getEmail() == userEmail) //if the user is the same as the one in the JWT token
            // {
                List<ClassPeriod> classesInAssignment = classService.getClassPeriodsByAssignment(assignment);
                for (ClassPeriod classP : classesInAssignment) //go through all class periods in the assignment
                {
                    Collection<Person> lead = classP.getLeaders(); //get the leaders of the class period
                    for (Person leaderOfClassPeriod : lead)
                    {
                        if (existingPerson.equals(leaderOfClassPeriod)) //if the user from the JWT token is a leader then grant access
                        {
                            isLeader = true; //after this, send a link describing each submission to the assignment
                            allSubmissionsOut.addAll(assignment.getSubmissions());
                            break loop1;
                        }
                    }
                }
            // }
        }
        if (isLeader)
        {
            String submissionData = "";
            for (AssignmentSubmission eachSub : allSubmissionsOut) {
                submissionData += "Submission ID: " + eachSub.getId() +
                                "\nSubmitter: " + eachSub.getSubmitter().getName() +
                                "\nFile Path: " + eachSub.getFilePath() +
                                "\nTime Submitted: " + eachSub.getTimeSubmitted() +
                                "\nSubmission Number: " + eachSub.getSubmissionNumber() + "\n";
            }
            return ResponseEntity.ok(submissionData);

        }
        else
        {
            return new ResponseEntity<>("Existing user is not a leader for the assignment", HttpStatus.BAD_REQUEST);
        }
        
    }
```

My existing code essentially fetches assignment data if the leader is determined to be a leader in the class period. This currently does not give a file preview, but a plan would be to add a method that would fetch a selected user's file submission to an assignment.

## Frontend
While I haven't been focused on frontend for most of this project, since I will be in charge of file previews

## Relation of Parts of Project
### JWT Token
- We parse the JWT token to determine which user is requesting to view other assignment submissions and determine leaders.
### Class structure
- Assignment -> AssignmentSubmission -> ClassPeriod -> leaders

