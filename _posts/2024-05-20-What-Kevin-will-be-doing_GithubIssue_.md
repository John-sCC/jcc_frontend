---
title: 'What Kevin will be doing'
layout: post
description : Automatically Populated Github Issue
---

## My plan
- My plan is to make it so it searches for specific students in the database based on their subjects of interest
- I am going to add an attribute that will represent the fields of interest of study that will be used for the student search service

## Wireframe
I am going to implement this signup page on the frontend including the styling, which will reuse elements of the sign in page.
![image](https://github.com/John-sCC/jcc_frontend/assets/75040379/b235c8b4-6e84-4c99-9c9c-31d898202df4)



## Actions to code
- [ ] I am going to use a built in method in the Person JPA Repository that will search for people based on subjects of interest
- [ ] I will then create a method in the person details service that calls that person jpa repository method
- [ ] In the person API Controller, I will add a new endpoint with the unique address so that the frontend can call that person detail service method
- [ ] I will make the frontend for the sign up page.

## What I will do
- Firstly, the signup page will create new attributes to the Person object that can help users create their profile that customizes what subjects they enjoy. 
- Secondly, once the user has signed up, the database should have the new users added
- Thirdly, the Student searcher should be able to find the specific people needed in terms of subjects and other criteria the specific user needs in addition to the email for them to contact.

## How my contributions will be used
- The wireframe for the class creation page
- My search feature will be used to find students with similar interests based on their subjects of interests in the white box on the top right.
![image](https://github.com/John-sCC/jcc_frontend/assets/75040379/8701031a-9274-4b2a-bc49-dd6c6e664adc)


## Timeline
- [ ] Backend: New Attributes for the Person Class (5/23)
- [ ] Frontend: Sign Up Page (5/25)
- [ ] Backend: Connect the new users generated after they sign up to the database (5/26)
- [ ] Backend: Integrate the search feature into the class creation part. (5/27)

