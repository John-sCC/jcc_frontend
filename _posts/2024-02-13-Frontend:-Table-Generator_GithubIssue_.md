---
title: 'Frontend: Table Generator'
layout: post
description : Automatically Populated Github Issue
---

## Wireframe

First, Drew and I worked on a [wireframe](https://docs.google.com/presentation/d/1DYGLNGXvdMkkJJSRu71eUlVI5elo95R_dUn3O1zLDcs/edit#slide=id.g2aeaabeaaf8_0_16) to get an idea of what it would look like, which we then edited to its [current](https://docs.google.com/presentation/d/1DYGLNGXvdMkkJJSRu71eUlVI5elo95R_dUn3O1zLDcs/edit#slide=id.g2b03190a054_0_6) form

### Version 1:
![Image](https://github.com/John-sCC/jcc_frontend/assets/112529809/31ad5fde-3896-4b89-b893-07f2a04dbffc) 

### Version 2:
![Image](https://github.com/John-sCC/jcc_frontend/assets/112529809/d5cb4f0f-187f-4e72-a4b5-1e6c3a3b547d)

## Initial Testing

Started out by testing the functionality on a markdown page, linked [here](https://john-scc.github.io/jcc_frontend/2024/02/02/table_generator_test.html). This page splits the input by line, then randomly assigns them to groups, divided by rows.

![Image](https://github.com/John-sCC/jcc_frontend/assets/112529809/ae816a98-daaf-4364-9b60-18fd851a4423)

In this image, the groups are [3, 4], [2, 1], and [5]

## Conversion to real page

I started with styling with SCSS and HTML, then adding script functionality while tweaking some of the styling at the same time.

![Image](https://github.com/John-sCC/jcc_frontend/assets/112529809/4056b7d1-df61-48db-946b-e59222c771ea)

[You can mess with it here](https://john-scc.github.io/jcc_frontend/tablegenerator)

## Future needs

Currently this is mostly completed, but it runs with localstorage, and will be fully finished after integration with user accounts and the backend.

We will also need somewhere to link this to, such as a resources tab or under the classes page



