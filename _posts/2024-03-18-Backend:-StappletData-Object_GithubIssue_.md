---
title: 'Backend: StappletData Object'
layout: post
description : Automatically Populated Github Issue
---

### Objects to...

* Store graphing data for reuse in SQL database
    - Potentially separate for categorical and quantitative
* Contain stat calculation methods

### Methods to...

* Construct specified POJO objects
* Calculate mean, SD, median, min, max, correlation, SE, (t, probability, etc.?)


Toby:
1. Quantitative:
```
{ 
  id: int,
  name: string,
  data: list<Double>,
  mean: double,
  size: int,
  stDev: double,
  min: double,
  max: double,
  median: double,
  qOne: double,
  qThree: double,
}
```

2 Quantitative Variables:
```
{
   id: int,
   explanatoryID: int,
   responseID: int,
   correlation: double,
   LSRL: LSRLobj
}
```

2.5 LSRLobj
```
{
   slope: double,
   intercept: double,
   stdDev: double,
   correlationSqr: double
}
```

Isabelle:
3. Categorical
```
{
   id: int,
   size: int,
   data: ArrayList<Catagorical>
}
```

3.5 Categorical 
```
{
     name: String,
     freq: int,
     relFreq: double
}
```

4.0 CategoricalVars
```
{
   id: int,
   explanatoryName: String,
   responseName: String,
   
   Frequencies: double[][]
}
```

4.5 TwoCategorical 
```
{
     Explanatory: String,
     Response: String,
     freq: int,
     relFreq: double
}
```



