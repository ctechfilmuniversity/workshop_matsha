name: inverse
layout: true
class: center, middle, inverse
---

#### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  
#### Film University Babelsberg KONRAD WOLF

# Materials and Shading Workshop

### 06 - Global Illumination

<!--
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
layout:false

## Local Illumination

Well, that is all nice and well but what is still missing?

???

.task[TASK:] What is missing?

--

.center[<img src="../img/global_illumination.png" alt="global_illumination" style="width:90%;">]

---
template:inverse

# Global Illumination

---

## Global Illumination

We need light from all directions!

.center[<img src="../img/global_illumination_01.png" alt="global_illumination_01" style="width:100%;">]


---

## Global Illumination

We need light from all directions!

.center[<img src="../img/global_illumination_02.png" alt="global_illumination_02" style="width:100%;">]

---

## Local Illumination

.center[<img src="../img/direct_lighting.png" alt="direct_lighting" style="width:88%;"> ]  
.footnote[[[wiki](https://www.wikiwand.com/en/Global_illumination)]]

---

## Global Illumination

.center[<img src="../img/global_illumination1.png" alt="global_illumination1" style="width:88%;">]  
.footnote[[[wiki](https://www.wikiwand.com/en/Global_illumination)]]


---
template: inverse

## Rendering Equation

---

## Rendering Equation

How much light is emitted and reflected on surface point x?

--

.center[<img src="../img/global_illumination_03.png" alt="global_illumination_03" style="width:100%;">]

---

## Rendering Equation

Light from all directions...

--

.center[<img src="../img/global_illumination_04.png" alt="global_illumination_04" style="width:100%;">]

---

## Rendering Equation

Reflectance?

--

BRDF!

--

.center[<img src="../img/global_illumination_05.png" alt="global_illumination_05" style="width:100%;">]

---

## Rendering Equation

BRDF with what? Which light do we get?

--

.center[<img src="../img/global_illumination_06.png" alt="global_illumination_06" style="width:100%;">]

---

## Rendering Equation

Bad news:

--

The incoming light in x is the rendering equation of y...

--

.center[<img src="../img/global_illumination_07.png" alt="global_illumination_07" style="width:100%;">]


---

## Rendering Equation

.center[<img src="../img/global_illumination_08.png" alt="global_illumination_08" style="width:100%;">]

--

Infinite-dimensional!

--

.center[<img src="../img/global_illumination_09.png" alt="global_illumination_09" style="width:40%;">]

--

Once again, 'solutions' are acceptable approximations...

---
.header[Global Illumination]

## Example: More Rays

.center[<img src="../img/global_illumination_10.png" alt="global_illumination_10" style="width:80%;">]



???
.task[COMMENT:]  

* Ray tracing, radiosity, (bi-directional) path tracing, Metropolis light transport, precomputed radiance transfer, (stochastic progressive) photon mapping, irradiance caching, path space regularization, vertex connection and merging


* Monte-Carlo Ray and Path Tracing
    * Stochastic integral solutions
    * Noise from variance in stochastic processes

* Photon Mapping
    * Distribute light particles in scene, then ray tracing
    * Good for spatially focused light effects such as caustics


* Radiosity
    * Finite element method: surfaces each divided up into one or more smaller surfaces
    * Light is simulated between patches based on a view factor
    * Reduces the infinite dimensional rendering equation to a finite number of dimensions
    * Efficient for overall smooth lighting and reflections


* https://ohiostate.pressbooks.pub/graphicshistory/chapter/19-5-global-illumination/


