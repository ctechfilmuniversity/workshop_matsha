name: inverse
layout: true
class: center, middle, inverse
---

#### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  
#### Film University Babelsberg KONRAD WOLF

# Materials and Shading Workshop

### 07 - Day 3

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

## What happened so far?

* Intro to Shading
* Local Illumination
* Local Shading Models
* Global Illumination and the Rendering Equation

  
* Implementation of p5's material

---
template:inverse

## Recap

---

## Local Illumination

???

.task[ASK:]  

* How do you describe local illumination

--

.center[<img src="../img/local_coordinate_lv.png" alt="local_coordinate_lv" style="width:100%;">]

---

## BRDFs

???

.task[ASK:]  

* What is a BRDF?

--

BRDF stands for ***Bidirectional Reflectance Distribution Functions (BRDF)***.
 
BRDFs describe the reflectance behavior on a surface point. A BRDF returns the *ratio* of incoming irradiance to reflected radiance. 


The BRDF \\( {f(\omega{\text{i}}, \omega{\text{r}})} \\) is a function of four variables:
<!-- The BRDF \\({f(\omega\us{\text{i}}, \omega\us{\text{r}})}\\) is a function of four variables: -->

.center[<img src="../img/brdf_01.png" alt="brdf_01" style="width:40%;"> [[Wikipedia]](https://en.wikipedia.org/wiki/Bidirectional_reflectance_distribution_function)]

???

.task[COMMENT:]  

* Each direction \omega is itself parameterized by azimuth angle \phi and zenith angle \theta, therefore the BRDF as a whole is a function of 4 variables. 
* Research on BRDFs is still going strong: https://conferences.eg.org/eg2021/program/full-papers/
* https://github.com/romanlarionov/BRDFViewer
* https://github.com/chicio/Spectral-BRDF-Explorer

---

.header[BRDFs]

## Diffuse Reflection


.center[<img src="../img/lambert_comparison_02.png" alt="lambert_comparison_02" style="width:100%;">[[wiki]](http://en.wikipedia.org/wiki/Oren–Nayar_reflectance_model
)]


???
.task[COMMENT:]  

* Lambert is too dark when we compute it in grazing angles.
* Solution: Oren-Nayar BRDF model





---

.header[BRDFs]

## Diffuse Reflection


.center[<img src="../img/lambert_comparison_01.png" alt="lambert_comparison_01" style="width:100%;">[[filament]](https://google.github.io/filament/Filament.html#materialsystem)]


???
.task[COMMENT:]  

*  a comparison between a simple Lambertian diffuse BRDF and the higher quality Disney diffuse BRDF, using a fully rough dielectric material. For comparison purposes, the right sphere was mirrored. The surface response is very similar with both BRDFs but the Disney one exhibits some nice retro-reflections at grazing angles (look closely at the left edge of the spheres). 

---

.header[BRDFs]

## Diffuse & Specular Reflection

.center[<img src="../img/brdfs_compare_01.png" alt="brdfs_compare_01" style="width:80%;"> [[blender]](https://docs.blender.org/manual/en/2.79/render/blender_render/materials/properties/diffuse_shaders.html)]

---

.header[BRDFs]

## Glossiness

BRDFs are often a carful mixture of diffuse und specular reflection, e.g. for glossiness.

--

Glossiness is between the diffuse and specular BRDF. It has broader highlights than a mirror and is more view-dependent than a diffuse surface.


.footnote[[TU Wien | Rendering 186.101 | Károly Zsolnai-Fehér]]

---

.header[BRDFs]

## Glossiness

.center[<img src="../img/glossy_01.png" alt="glossy_01" style="width:75%;">[[strelok]](http://www.luxrender.net/forum/gallery2.php?g2_itemId=16543)]

.footnote[[TU Wien | Rendering 186.101 | Károly Zsolnai-Fehér]]

---

.header[BRDFs]

## Glossiness

.center[<img src="../img/glossy_02.png" alt="glossy_02" style="width:75%;">[[strelok]](http://www.luxrender.net/forum/gallery2.php?g2_itemId=16543)]

.footnote[[TU Wien | Rendering 186.101 | Károly Zsolnai-Fehér]]

---

.header[BRDFs]

## Disney BRDF Explorer

.center[<img src="../img/brdf_explorer_01.png" alt="brdf_explorer_01" style="width:50%;"> [[Disney]]()]


---
.header[BRDFs]

## Phong

.center[<img src="../img/sphere_all.png" alt="sphere_all" style="width:60%;">]

???
.task[COMMENT:]  

* Works how?
* Explain bug with float precision

---

## Global Illumination

???

.task[ASK:]  

* What does global illumination refer to?

--

.center[<img src="../img/global_illumination.png" alt="global_illumination" style="width:100%;">]

---
.header[Globale Illumination]

## Indirect Illumination

.center[<img src="../img/illu_indirect_01.png" alt="illu_indirect_01" style="width:80%;"> [[aztadom]](http://aztadom.co/wp-content/uploads/2014/04/cuki_aranyos_allat_10.jpg
)]

.footnote[[TU Wien | Rendering 186.101 | Károly Zsolnai-Fehér]]

---
.header[Globale Illumination]

## Indirect Illumination

.center[<img src="../img/illu_indirect_02.png" alt="illu_indirect_02" style="width:80%;"> [[fantasylab]](http://www.fantasylab.com/newpages/back.jpg)]

.footnote[[TU Wien | Rendering 186.101 | Károly Zsolnai-Fehér]]

---
.header[Globale Illumination]

## Indirect Illumination

.center[<img src="../img/illu_indirect_03.png" alt="illu_indirect_03" style="width:80%;"> [[Lux Renderer]]()]

.footnote[[TU Wien | Rendering 186.101 | Károly Zsolnai-Fehér]]


---

## Global Illumination

We need light from all directions!

.center[<img src="../img/global_illumination_02.png" alt="global_illumination_02" style="width:100%;">]

---

## Rendering Equation


.center[<img src="../img/global_illumination_03.png" alt="global_illumination_03" style="width:100%;">]

--

The outgoing light is the sum of the emitted light and the reflected light. 

--

The reflected light itself is the sum from all directions of the incoming light multiplied by the surface reflection and cosine of the incident angle. 

???

.task[ASK:]  

* What does it do?
* The physical basis for the rendering equation is the law of conservation of energy.  

---

## Rendering Equation


.center[<img src="../img/global_illumination_04.png" alt="global_illumination_04" style="width:80%;">]





---

## Rendering Equation

.center[<img src="../img/global_illumination_07.png" alt="global_illumination_07" style="width:100%;">]



---
template:inverse

# Today

---

# Today

.left-even[
* NPR shading, example toon
]
.right-even[<img src="../img/sphere_toon.png" alt="sphere_toon" style="width:70%;">]


---

# Today

.left-even[
* NPR shading, example toon
* Fresnel effect
]
.right-even[<img src="../img/sphere_toon.png" alt="sphere_toon" style="width:70%;">]

---

# Today

.left-even[
* NPR shading, example toon
* Fresnel effect
]
.right-even[<img src="../img/sphere_toon.png" alt="sphere_toon" style="width:70%;"> <img src="../img/npr_shading_01.png" alt="npr_shading_01" style="width:70%;">]

---

## NPR Shading

--

.center[<img src="../img/sphere_toon.png" alt="sphere_toon" style="width:60%;">]

???

.task[ASK:]  

* Show live version
* What properties do you see?
    * Flat shading
    * Step function for diffuse shading
    * Outline
    * Small light highlight
    * Outline around highlight 


---

## NPR Shading

Many NPR shaders make use of the outline of an object.

???

.task[ASK:]  

* How do we detect the outline?

--

The outline of an object is detected by the angle between the normal of the surface point and the view vector.

--

.center[<img src="../img/outline_01.png" alt="outline_01" style="width:40%;">]

---

## NPR Shading

Many NPR shaders make use of the outline of an object.

The outline of an object is detected by the angle between the normal of the surface point and the view vector.

.center[<img src="../img/outline_02.png" alt="outline_02" style="width:40%;">]

---

## NPR Shading

Many NPR shaders make use of the outline of an object.

The outline of an object is detected by the angle between the normal of the surface point and the view vector.

.center[<img src="../img/outline_03.png" alt="outline_03" style="width:40%;">]

--

\\({cosθ}\\) = **V** ∙ **N**

--

```js
float cos_view_normal = max(0.0, dot(view_dir, normal));
```
---

## NPR Shading

Once again...

\\({cosθ}\\) = **A** ∙ **B**

.center[<img src="../img/dot_product_values.gif" alt="dot_product_values" style="width:40%;">]

---

## NPR Shading

.center[<img src="../img/sphere_toon.png" alt="sphere_toon" style="width:60%;">]


Let's Implement This! 👩🏽‍💻 🧑🏻‍💻

---

## NPR Shading II

.center[<img src="../img/npr_shading_01.png" alt="npr_shading_01" style="width:60%;">]

???

.task[ASK:]  

* What do you see?
* smooth transitions, more than one rim, no diffuse shading

--

Let's Implement This! 👩🏽‍💻 🧑🏻‍💻

???

.task[ASK:]  

* Show code file
* Live coding together, go step by step as questions
* [sphere_toon_smooth_steps](../../shader_sphere_toon_smooth/shader_sphere_toon_smooth/sphere_toon_smooth_steps.md)


---

## NPR Shading II

.center[<img src="../img/npr_shading_01.png" alt="npr_shading_01" style="width:60%;">]

This effect is based on the *Fresnel effect*.

???

.task[COMMENT:]  

* The internet uses the term *Fresnel effect* very loosely or wrongly.
