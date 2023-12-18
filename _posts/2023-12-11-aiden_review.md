---
toc: True
comments: True
layout: post
title: Individual Review Ticket - Aiden
description: Aiden's final review for mini-project
courses: {'csa': {'week': '14'}}
type: review
---

## Features/Runtime:
* [Main sort page](http://aidenhuynh.github.io/sortsortsort):
    - Edited Toby's CSS to make it more like the wireframe
    - Added functioning random list insert
    - Fixed scaling of number tiles
    - Added functioning user input list

### Backend
* [Sorting Algorithm Starters](https://aidenhuynh.github.io/sortsortsort/2023/11/17/algorithms_IPYNB_2_.html)
    - Wrote 6 algorithms for variants of bubble and selection sort
    - <details closed>
        <summary>Example algorithm: For loop selection sort</summary>
        <pre>
            private static int[] selectionFor(int[] arr) {
                // For loop to iterate through whole array, except last value because it will already be sorted by then
                for (int i = 0; i < arr.length - 1; i ++) {
                    // Define the minimum index by setting it to the first element not iterated yet
                    int minIndex = i;

                    // For loop to iterate through all elements after previous run
                    for (int j = i + 1; j < arr.length; j ++) {
                        // If selected value is lower than current minimum, set the new minimum
                        if (arr[j] < arr[minIndex]) {
                            minIndex = j;
                        }
                    }

                    // If the minimum is different from the current value, swap them
                    if (minIndex != i) {
                        int temp = arr[i];
                        arr[i] = arr[minIndex];
                        arr[minIndex] = temp;
                    }
            }

                return arr;
            }

            printArr(selectionFor(test));

* Backend integration:
    - Moved algorithms from notebook to backend
    - <details closed>
        <summary>Example algorithm: For loop selection sort</summary>
        <pre>
            public class ForSortSelection extends Selection {
                public ForSortSelection(){
                    super("Insertion Sort For Loop");
                }

                public ArrayList<Integer> runSort(ArrayList<Integer> arr){
                    super.list = arr;
                    long startTime = System.nanoTime();
                    int n = arr.size();
                    
                    // For loop to iterate through whole array, except last value because it will already be sorted by then
                    for (int i = 0; i < n - 1; i ++) {
                        // Define the minimum index by setting it to the first element not iterated yet
                        int minIndex = i;
                        super.iterations += 1;
                
                        // For loop to iterate through all elements after previous run
                        for (int j = i + 1; j < n; j ++) {
                            super.iterations += 1;
                            super.comparisons += 1;
                            // If selected value is lower than current minimum, set the new minimum
                            if (arr.get(j) < arr.get(minIndex)) {
                                minIndex = j;
                            }
                        }
                
                        // If the minimum is different from the current value, swap them
                        if (minIndex != i) {
                            super.swaps.add(arr.get(minIndex));
                            super.comparisons += 1;
                            int temp = arr.get(i);
                            super.swaps.add(temp);
                            arr.set(i,arr.get(minIndex));
                            arr.set(minIndex, temp);
                        }
                    }
                    super.times.add(System.nanoTime() - startTime);
                        return arr;
                }
            }

## Key Commits:
* [Selection and Bubble Sorts](https://github.com/aidenhuynh/sortsortsort/commit/5d4392808ae1cda28296a7684474ec0bff8946db)
* [Main UI](https://github.com/aidenhuynh/sortsortsort/commit/3e51d6a026b03fbe848668a94f7969bbde87d44d)

## GitHub Analytics:
* [Frontend Commits](https://github.com/aidenhuynh/sortsortsort/commits?author=aidenhuynh)
* [Backend Commits](https://github.com/aidenhuynh/springspringspring/commits/master?author=aidenhuynh)
* [Profile](https://github.com/aidenhuynh)

![commits]({{site.baseurl}}/images/aiden/commits.png)

## Video:
<iframe src="https://drive.google.com/file/d/1BnfJDzmkSS0JGXpt4Ap0D4pgvdszqo9d/preview" width="640" height="480"></iframe>
## Reflection:
### Learning:
I have definitely gotten a lot more used to Java syntax (I don't forget semicolons every single time now), as I have done a lot more work with it than before. This is the most OOP I have done and honestly, I still don't enjoy doing it.

### Improvements:
I need to be able to make myself work even if I do not feel strongly about the project. This was a very simple sorting algorithm project that was not at all hard to code and yet this is the lowest score I have gotten in the class because I simply did not want to work on it. I don't think the lack of challenge necessarily demotivated me but the subject matter definitely did. I enjoy making things for fun that can be used in outside contexts, but this project is pretty much exclusively going to be used just for grading once and then never again. I understand that this is teaching us analysis, but I think this could all be gathered from a student lesson or tech talk (we did do one in CSP).

I also need to work harder as a Scrum Master, because I am still struggling to keep all members working. After all, they are also demotivated probably for the same reasons as me. Primarily, I would like to increase communication within my group, and to do so, I will likely start moving away from Slack, because it seems that some people do not use it outside of class.

I was not able to make a video to demonstrate my features working because the team could not pull together in the last step of integrating the frontend and backend, as we lacked communication as addressed before. 

### Summary:
- Learned Java Syntax
- Most practice with OOP
- Need better collaboration
- Need better communication
- Need more motivation