---
layout: layout.hbs
---

# Week 13 - Learning Challenges

# Team

- [Zayo - Part II](TBA)

# Individual

## Sonar Data

Report: [sonar.html](individual/sonar.html)

The development of this learning exercise is in collaboration with Dr.
Carrie Bell, who is a fisheries acoustician working for CIRES, the
Cooperative Institute for Research in Environmental Sciences.

This dataset contains water column measurement data off the coast of New York.
Your job is to help analyze and visualize this data, in doing so, getting a
taste of what it is like to work with big data for science.

You are given a small slice of the dataset for this exercise. This slice
contains about 300 measurements. Each measurement is taken at a location
with the GPS coordinate recorded.

Five frequencies are used to understand different components of what's in
the water column. Lower frequencies (18 & 38 kHz) have longer wavelengths and
are better at identifying large targets (like fish - especially those with a
swimbladder, an air filled sac used for buoyancy). Higher frequencies
(120 & 200 kHz) have shorter wavelengths and are better at identifying smaller
targets like zooplankton - little tiny marine critters including shrimp and baby
fish.

At each measurement location, 1000 samples were taken. Each sample corresponds
to a depth point between 0 to 2000 meters below the sea level. For example,
the 500-th value corresponds to responses at 1000 meters deep.

Sonar responses from these five frequencies are "fused" into a single value using
the following coding scheme, where each frequency is mapped to a unique integer:

* 18 kHz is mapped to 1
* 38 kHz is mapped to 3
* 70 kHz is mapped to 29
* 120 kHz is mapped to 7
* 200 kHz is mapped to 13

And depending on which subset of these frequencies had responses at that location,
the value would be the sum of the integers. For instance, if responses were
recorded at 18kHz and 70kHz (not the others), the "fused" value would be 1+29=30.

## Deliverables

Your job is to develop a data analysis report [sonar.html](individual/sonar.html) by
implementing the code in [analysis.js](individual/analysis.js).
