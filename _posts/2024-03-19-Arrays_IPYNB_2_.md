---
title: CORN group ( FRQ 1 - ArrayLists)
description: Lesson with FRQ 2017 using COOOORN!
toc: True
layout: post
---

# Arrays Overview

## Important Vocabulary
**Array** is a data structure used to implement a list of primitive or object data
**Element** is a single value within the array
The **index of an element** is the position of the element within the array
    - For Java, the first element is at index 0
The **length** of an array is the number of elements in the array
    - <code>length</code> is a <code>public final</code> data member of an array
        - Since <code>length</code> is <code>public</code>, we can access it in any class
        - Since <code>length</code> is final, we cannot change an array's length after it has been created
        
In Java, the last element of an array list is at index <code>list.length - 1</code>

# 2017 FRQ #1

[View FRQ here](https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-frq-2017.pdf)


## Syntax to remember

- This part importantly declares an array and references the '.add' function

Remember the syntax:
```Java 
// declare the array list
[arrayName] = new ArrayList<Integer>();

// add to the list
[arrayName].add([position], [value])
// ---OR---
[arrayName].add([value])

// get from the list at a position
[arrayName].get([position]);

// modify a list at a specific position
[arrayName].set([position], [value]);

// get the size of an array
[arrayName].size();

// not pertaining to arrays but still good to know
// the .intValue() method is used to convert an object of a wrapper class for primitive types (such as Integer, Double, Float, etc.) into its corresponding primitive int value.
Integer integerValue = new Integer(10); // Creating an Integer object with value 10
int intValue = integerValue.intValue(); // Extracting the int value from the Integer object
// This is needed because java arrayLists store wrapper objects for 'int' primitive values
```


```java
public class Digits
{
    private ArrayList<Integer> digitList;

    // Part (a)
    public Digits(int num)
    {
        digitList = new ArrayList<Integer>();
        if (num == 0)
        {
            digitList.add(new Integer(0));
        }
        while (num > 0)
        {
            digitList.add(0, new Integer(num % 10));
            num /= 10;
        }
    }

    // Part (b)
    public boolean isStrictlyIncreasing()
    {
        for (int i = 0; i < digitList.size()-1; i++)
        {
            if (digitList.get(i).intValue() >= digitList.get(i+1).intValue())
            {
                return false;
            }
        }
        return true;
    } 
} 
```

# Common Mistakes

1. Failure to use the `intValue()` method.
   - This is important because Java by default stores data in arrayLists using wrapper classes liek `Interger`. In this case the wrapper class needs to be converted into a primitive `int` datatype to perform operations on it.

2. Failure to use `num % 10` or `num /= 10`.
   - These lines are meant to target the last digit to either add to the arrayList or to remove from the integer 



## CollegeBoard MCQs


```java
public static int findMiddle (String[] arr, String find) {
    return  // a, b, c, d,or e
}
// a: arr[].indexOf(find);
// b: arr.indexOf(find);
// c: arr[arr.length/2 + 1].indexOf(find);
// d: arr[arr.length].indexOf(find);
// e: arr[arr.length/2].indexOf(find);
```


```java
public static int mystery(int[] arr) {
    return arr[1] + arr[3]/2;
}

int[] list = {3, 7, 2, 9, 8};
int result = mystery(list);

// What is stored after running this code?
// a: 2.5
// b: 4
// c: 8
// d: 11
// e: 11.5
```
