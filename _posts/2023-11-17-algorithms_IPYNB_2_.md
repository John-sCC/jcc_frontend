---
layout: post
title: Sorting Algorithms Test
description: Creating different sorting methods and testing inheritance
courses: {'csa': {'week': 13}}
categories: []
type: tangibles
---

## Globals


```Java
// Initialize test array for sorting
public int[] test = new int[]{1, 5, 6, 3, 78, 2, 2};

// Method for displaying array
public String printArr(int[] arr) {
    // Show start of list
    String text = "[";

    // Add elements to list String
    for (int i = 0; i < arr.length; i ++) {
        text += arr[i];

        // Add commas if not last element in list
        if (i != arr.length - 1) {
            text += ", ";
        }
    }

    // Add end of list
    text += "]";

    return text;
}
```

## Selection Sort

### For loop


```Java
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
```




    [1, 2, 2, 3, 5, 6, 78]



### While Loop


```Java
private static int[] selectionWhile(int[] arr) {
    // While loop to iterate through whole array, except last value because it will already be sorted by then
    int i = 0;
    while (i < arr.length - 1) {
        // Define the minimum index by setting it to the first element not iterated yet
        int minIndex = i;

        // While loop to iterate through all elements after previous run
        int j = i + 1;
        while (j < arr.length) {
            // If selected value is lower than current minimum, set the new minimum
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

            j += 1;
        }

        // If the minimum is different from the current value, swap them
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        i += 1;
    }

    return arr;
}

printArr(insertionWhile(test));
```




    [1, 2, 2, 3, 5, 6, 78]



## Recursive


```Java
private static int[] selectionRecur(int[] arr, int n) {
  // If passing the last element in the array, stop
  if (n == arr.length - 1) {
    return arr;
  }

  // Set minimum index to current
  int minIndex = n;
  
  // If different value is less than current minimum, set minIndex to that value's index
  for (int j = n + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
          minIndex = j;
      }
  }

  // Swap minimum with initial index
  if (minIndex != n) {
      int temp = arr[n];
      arr[n] = arr[minIndex];
      arr[minIndex] = temp;
  }

  // Recursive call for the next index
  selectionRecur(arr, n + 1);

  return arr;
}

printArr(selectionRecur(test, 0));
```




    [1, 2, 2, 3, 5, 6, 78]



## Bubble Sort

### For loop


```Java
private static int[] bubbleFor(int[] arr) {
    // Iterate through list
    for (int i = 0; i < arr.length - 1; i ++) {
        // Iterate through previous element in list
        for (int j = 0; j < arr.length - i - 1; j ++) {
            // Swap if necessary
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

printArr(bubbleFor(test));
```




    [1, 2, 2, 3, 5, 6, 78]



### While loop


```Java
private static int[] bubbleWhile(int[] arr) {
    int i = 0;
    while (i < arr.length - 1) {
        int j = 0;

        while (j < arr.length - i - 1) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }

            j++;
        }

        i++;
    }
    return arr;
}

printArr(bubbleWhile(test));
```




    [1, 2, 2, 3, 5, 6, 78]



### Recursive


```Java
private static int[] bubbleRecur(int[] arr) {
    for (int i = 0; i < arr.length - 1; i ++) {
        if (arr[i] > arr[i + 1]) {
            int temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
            bubbleRecur(arr);
        }
    }
    return arr;
}

printArr(bubbleRecur(test));
```




    [1, 2, 2, 3, 5, 6, 78]



## Inheritance Testing


```Java

```


```Java
import java.util.ArrayList;

public class Sort {
    double time;
    int[] array;
    ArrayList swaps = new ArrayList();

    // array setter
    public void setArray(int[] arr) {
        this.array = arr;
    }

    // Method for adding each swap
    public void swap(int i, int j) {
        this.swaps.add(i);
        this.swaps.add(j);
    }

    // Method for displaying array
    public String printArr() {
        // Show start of list
        String text = "[";
        int[] arr = this.array;

        // Add elements to list String
        for (int i = 0; i < arr.length; i ++) {
            text += arr[i];

            // Add commas if not last element in list
            if (i != arr.length - 1) {
                text += ", ";
            }
        }

        // Add end of list
        text += "]";

        return text;
    }
}

public class Selection extends Sort {
    int[] arr = super.array;

    public int[] forLoop() {
        int[] arr = this.arr;

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

    private int[] whileLoop() {
        int[] arr = this.arr;

        // While loop to iterate through whole array, except last value because it will already be sorted by then
        int i = 0;
        while (i < arr.length - 1) {
            // Define the minimum index by setting it to the first element not iterated yet
            int minIndex = i;
    
            // While loop to iterate through all elements after previous run
            int j = i + 1;
            while (j < arr.length) {
                // If selected value is lower than current minimum, set the new minimum
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
    
                j += 1;
            }
    
            // If the minimum is different from the current value, swap them
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
    
            i += 1;
        }
    
        return arr;
    }

    private int[] recursive() {
        int[] arr = this.arr;
        return recursiveSwap(0);
    }

    private int[] recursiveSwap(int n) {
        // If passing the last element in the array, stop
        if (n == arr.length - 1) {
          return arr;
        }
      
        // Set minimum index to current
        int minIndex = n;
        
        // If different value is less than current minimum, set minIndex to that value's index
        for (int j = n + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
      
        // Swap minimum with initial index
        if (minIndex != n) {
            int temp = arr[n];
            arr[n] = arr[minIndex];
            arr[minIndex] = temp;
        }
      
        // Recursive call for the next index
        recursiveSwap(arr, n + 1);
      
        return arr;
    }
}

Sort algorithm = new Selection();
// algorithm.setArray([0, 3, 2, 1]);


```


