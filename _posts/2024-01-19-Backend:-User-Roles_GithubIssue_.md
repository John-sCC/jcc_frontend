---
title: 'Backend: User Roles'
layout: post
description : Automatically Populated Github Issue
---

Branch for UserRoles: Created when process begins

REQUIREMENTS:
- Attributes:
    - ID (auto)
    - Name
    - (The base role info can be used)
- Methods
    - Add: init() method 
        - Initialize with two roles: "ROLE_USER" and "ROLE_ADMIN" for now
- Outside changes for functionality
    - Initialize with the new `.init()` in `ModelInit.java` BEFORE Person initializes
    - Save the two base roles to `rolesRepo` (`@Autowired PersonRoleJpaRepository rolesRepo` with declarations)
    - Add method that fetches Person roles using the person's Username
        - This should be added to the PersonApiController to be used for a pull and restricted to logged-in users
        - Current point of confusion: how can we limit the roles fetch to only the user that has been signed in? Look into using the username (?) of the userdata as a source of authorization in `SecurityConfig.java`

