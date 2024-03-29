---
title: CORN group (objects and 2D arrays)
description: Lesson on Objects and 2D arrays using COOOORN!
toc: True
layout: post
---


[House Demo](https://john-scc.github.io/jcc_frontend/2024/03/13/house-demo.html)

# Farming Simulator

This Java code simulates a farm field using a 2D array. The `Corn` class defines corn objects with age and moisture level. The `FarmingSimulator` class initializes the field with random Corn objects, provides a method to retrieve data at specific coordinates, and displays the field. Object instantiation creates a `FarmingSimulator` instance, allowing visualization of the field and access to Corn data. The `main()` method orchestrates the simulation by initializing the simulator, displaying the field, and demonstrating data retrieval. Overall, the code demonstrates object-oriented principles, encapsulation, and basic array manipulation to simulate a farming scenario.

# 2D Arrays

The program iterates through each sub array of the main array using a nested for loop and uses a random probability(50%) that it will add corn to that index.

```Java
for (int i = 0; i < FIELD_ROWS; i++) {
    for (int j = 0; j < FIELD_COLS; j++) {
        if (Math.random() < 0.5) { // 50% chance of having a corn in a cell
            int age = (int) (Math.random() * 10); // Random age between 0 and 9
            int moistureLevel = (int) (Math.random() * 100); // Random moisture level between 0 and 99
            field[i][j] = new Corn(age, moistureLevel);
        }
    }
}
```

# Object Instantiation

When the program deems an index suitable for corn, a new instance of the `Corn` class is made based on its constructor

```Java
// Constructor
public Corn(int age, int moistureLevel) {
    this.age = age;
    this.moistureLevel = moistureLevel;
}

// Instance
field[i][j] = new Corn(age, moistureLevel);
```

# Full Code:


```java
public class Corn {
    private int age;
    private int moistureLevel;

    public Corn(int age, int moistureLevel) {
        this.age = age;
        this.moistureLevel = moistureLevel;
    }

    // Getters and setters for age and moistureLevel

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getMoistureLevel() {
        return moistureLevel;
    }

    public void setMoistureLevel(int moistureLevel) {
        this.moistureLevel = moistureLevel;
    }
}

public class FarmingSimulator {
    private static final int FIELD_ROWS = 5;
    private static final int FIELD_COLS = 5;
    private Corn[][] field;

    public FarmingSimulator() {
        field = new Corn[FIELD_ROWS][FIELD_COLS];
        initializeField();
    }

    private void initializeField() {
        // Fill the field with some Corn objects and leave some empty
        // This is just a basic example, you can customize it as needed
        for (int i = 0; i < FIELD_ROWS; i++) {
            for (int j = 0; j < FIELD_COLS; j++) {
                if (Math.random() < 0.5) { // 50% chance of having a corn in a cell
                    int age = (int) (Math.random() * 10); // Random age between 0 and 9
                    int moistureLevel = (int) (Math.random() * 100); // Random moisture level between 0 and 99
                    field[i][j] = new Corn(age, moistureLevel);
                }
            }
        }
    }

    public Corn getDataAtPosition(int row, int col) {
        if (row < 0 || row >= FIELD_ROWS || col < 0 || col >= FIELD_COLS) {
            return null; // Coordinates out of bounds
        }
        return field[row][col];
    }

    public void displayField() {
        for (int i = 0; i < FIELD_ROWS; i++) {
            for (int j = 0; j < FIELD_COLS; j++) {
                if (field[i][j] != null) {
                    System.out.print("C "); // Representing a cell with corn
                } else {
                    System.out.print(". "); // Representing an empty cell
                }
            }
            System.out.println(); // Move to the next row
        }
    }

    public static void main(String[] args) {
        FarmingSimulator simulator = new FarmingSimulator();
        simulator.displayField();

        // Example usage of getDataAtPosition method
        int row = 2;
        int col = 3;
        Corn dataAtPosition = simulator.getDataAtPosition(row, col);
        if (dataAtPosition != null) {
            System.out.println("Position: (" + row + ", " + col + ")");
            System.out.println("Age: " + dataAtPosition.getAge());
            System.out.println("Moisture Level: " + dataAtPosition.getMoistureLevel());
        } else {
            System.out.println("No data at position (" + row + ", " + col + ")");
        }
    }
}


FarmingSimulator farm = new FarmingSimulator();
farm.main(null);
```

    C . . C . 
    . . C . C 
    C C C C . 
    C . C C C 
    C C C . . 
    Position: (2, 3)
    Age: 8
    Moisture Level: 90

