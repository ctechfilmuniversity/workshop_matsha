name: inverse
layout: true
class: center, middle, inverse
---

#### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  
#### Film University Babelsberg KONRAD WOLF

# Materials and Shading Workshop

### 08 - Fresnel

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
template:inverse

# The Fresnel Effect

---
layout:false

## The Fresnel Effect


.center[<img src="../img/fresnel-animation-1.gif" alt="fresnel" style="width:50%;">]

.footnote[[[Dorian Iten]](https://www.dorian-iten.com/fresnel/)]


???

.task[ASK:]  

* What do you see?

---

## The Fresnel Effect

.center[<img src="../img/fresnel-animation-1.gif" alt="fresnel" style="width:25%;">]

.center[<img src="../img/fresnel_01.jpg" alt="fresnel_01" style="width:100%;"> ]


.footnote[[[Dorian Iten]](https://www.dorian-iten.com/fresnel/)]

???

.task[COMMENT:]  

* The angle is here between viewer and surface, not surface normal

---

## The Fresnel Effect

.center[<img src="../img/fresnel_02.jpg" alt="fresnel_02" style="width:100%;"> ]

The larger the angle between viewer and **surface normal**, the stronger the reflection.


.footnote[[[Dorian Iten]](https://www.dorian-iten.com/fresnel/)]

???

.task[COMMENT:]  

* The angle is here between viewer and surface, not surface normal


---

## The Fresnel Effect

.center[<img src="../img/npr_shading_01.png" alt="npr_shading_01" style="width:66%;">]


---

## The Fresnel Effect

.center[<img src="../img/fresnel_06.png" alt="fresnel_06" style="width:56%;">]



---

## The Fresnel Effect

[Everything has Fresnel](http://filmicworlds.com/blog/everything-has-fresnel/)

.center[<img src="../img/fresnel_07.png" alt="fresnel_07" style="width:90%;">[[vray]](https://shop.spreadshirt.com/vrayinfo/everything+has+fresnel-A5d89cfe86bbdbb2e6a4903d7?productType=175)]

---

## The Fresnel Effect

> The Fresnel effect models the fact that the amount of light the viewer sees reflected from a surface depends on the viewing angle.

---

## The Fresnel Effect

### Reflections Change With Distance


???

.task[ASK:]  

* Any ideas how this could connect to a viewer's distance to an object?

--

.center[<img src="../img/fresnel_03.jpg" alt="fresnel_03" style="width:100%;"> ]



.footnote[[[Dorian Iten]](https://www.dorian-iten.com/fresnel/)]


???

.task[COMMENT:]  

* As you look down to the ground close to your feet, the angle of incidence is very steep. If you look at a point on the ground that’s further away from you, the angle gets more shallow – and the reflection becomes more visible.

---

## The Fresnel Effect

### Reflections Change With Distance

???

.task[ASK:]  

* Any ideas how this could affect reflection and refraction? 
* Any related real world experiences you can think of?

--


.center[<img src="../img/fresnel_04.png" alt="fresnel_04" style="width:30%;"> 
<img src="../img/fresnel_05.png" alt="fresnel_05" style="width:30%;">]


.footnote[[[Dorian Iten]](https://www.dorian-iten.com/fresnel/)]


???

.task[COMMENT:]  

* As you look down to the ground close to your feet, the angle of incidence is very steep. If you look at a point on the ground that’s further away from you, the angle gets more shallow – and the reflection becomes more visible.


---

## Fresnel Equations

### Reflective and Refractive Material

.center[<img src="../img/fresnel_08.png" alt="fresnel_08" style="width:100%;"> [[scratchapixel]](https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-shading/reflection-refraction-fresnel)]



???

.task[ASK:]  

* What do you see?

---

## Fresnel Equations

### Reflective and Refractive Material

.center[<img src="../img/fresnel_09.png" alt="fresnel_09" style="width:70%;"> [[scratchapixel]](https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-shading/reflection-refraction-fresnel)]

---

## Fresnel Equations

### Reflective and Refractive Material

.center[<img src="../img/fresnel_10.png" alt="fresnel_10" style="width:100%;"> [[filament]](https://google.github.io/filament/Filament.html)]

---

## Fresnel Equations

### Reflective and Refractive Material

The [Fresnel Equations](https://www.wikiwand.com/en/Fresnel_equations) define for transparent materials such as glass and water how much light is reflected vs. how much light is transmitted.  

---

## Fresnel Equations

### Reflective and Refractive Material

.center[<img src="../img/fresnel_13.png" alt="fresnel_13" style="width:70%;"> [[wiki]](http://en.wikipedia.org/wiki/Refraction)]

.footnote[[TU Wien | Rendering 186.101 | Károly Zsolnai-Fehér]]

---

## Fresnel Equations

### Reflective and Refractive Material

More precisely, they describe **the reflection and transmission of light** from one medium to a different one by computing the ratio of reflected and transmitted energy. 

--

.center[<img src="../img/partial_transmittance.gif" alt="partial_transmittance" style="width:90%;"> [[wiki]](https://www.wikiwand.com/en/Fresnel_equations)]

???

.task[TASK:]  

* Go to wikipage

---

## Fresnel Equations

### Schlick's Approximation 

In computer graphics, [Schlick's approximation](https://www.wikiwand.com/en/Schlick%27s_approximation) is a formula for approximating the contribution of the Fresnel factor, shaping the reflection and transmission of light between media.

???

.task[TASK:]  

* Go to wikipage
* Go to [Filament](https://google.github.io/filament/Filament.html#materialsystem/specularbrdf/fresnel(specularf))

---

## Filament for Web

*On a side note:* Check out this awesome renderer: [Filament](https://google.github.io/filament/)
* [Cheat Sheet](https://google.github.io/filament/Material%20Properties.pdf)
* [Material Overview](https://google.github.io/filament/Materials.html)
* [Theoretical Backgrounds](https://google.github.io/filament/Filament.html#imagingpipeline)
