name: inverse
layout: true
class: center, middle, inverse
---

#### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  
#### Film University Babelsberg KONRAD WOLF

# Materials and Shading Workshop

### 01 - Overview

<!--

Start server in /doc/


h or ?: Toggle the help window
j: Jump to next slide
k: Jump to previous slide
b: Toggle blackout mode
m: Toggle mirrored mode.
c: Create a clone presentation on a new window
p: Toggle PresenterMode
f: Toggle Fullscreen
t: Reset presentation timer
<number> + <Return>: Jump to slide <number>
-->

---
layout: false

## The Workshop

Materials & Shading is a complex topic, enough for a term...

---
## Materials & Shading

* Intro Materials and Shading
* Shading vs. Shader
* Local Illumination
* BRDFs
* Advanced Material Properties
* Physically-based Shading
* Global Illumination
* Material Interfaces
* Real-time Implementations
* NPR Materials
* ...

???

Why am I saying this? To give a better overview of the topic field and if there is interest we can always do additional days and / projects.

---

## Workshop Topics

Day 1

--

* Intro to Shading

--
* Local Illumination

--
* Local Shading Models

--
* Example: Implementation of p5's materials



--

Day 2

--
* NPR

--
* Advanced Material Properties

--
* Physically-based Shading

--
* Global Illumination

--
* Example: Scene rendering in a fragment shader







---

## Learning Objectives

--
* Understand what shading is

--
* Grasp core theoretical concepts of shading and lighting

--
* Be able to implement basic shading concept within a given software and as fragment shader

--
* Be able to go from there to explore creative shading options


---

## Let's Start

--

.center[<img src="img/sphere_all.png" alt="sphere_all" style="width:44%;"> <img src="img/sphere_toon.png" alt="sphere_toon" style="width:44%;">]

--

Looks simple enough, right? 😎

???

* The goal is to re-implement the material available in p5
* And with that I want to demonstrate that commonly used concepts aren't that complicated

