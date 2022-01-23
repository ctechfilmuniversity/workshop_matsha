name: inverse
layout: true
class: center, middle, inverse
---

#### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  
#### Film University Babelsberg KONRAD WOLF

# Materials and Shading Workshop

### Day 3

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
* TODO: add properties

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

---
template:inverse

# The Fresnel Effect

---

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

---
template:inverse


# Shading in Houdini

---
## Introduction To Shading in Houdini

--

### Task 1

Watch the tutorials and follow along. I recommend to increase the playback speed, for that you need to download the video and watch it e.g. with the [VLC player](https://www.videolan.org/vlc/). When doing the tutorials, please also turn your brain on.

* [Tutorial 01 - Intro Principled Shader (45:18)]([intro_principled_shader.mov](https://e.pcloud.link/publink/show?code=XZ2z6kZqlc81zzf7E0s3XWxN8pyobkK8gpk)
* [Tutorial 02 - Intro Principled Shader - Layering Shaders (15:48)]([intro_principled_shader_layering](https://e.pcloud.link/publink/show?code=XZWz6kZcPcI7iPYtwYwI8F32cTFwQF733xX)
* [Tutorial 03 - Intro Non-Principled Shader (19:18)]([intro_nonprincipled_shader](https://e.pcloud.link/publink/show?code=XZsz6kZJQ1M2SvwrIFWTdPhEN0Q5JJRvjrV)

???

*Apologies, I am making some slips in my explanations. E.g. in Tutorial 3, at 2:37, I am saying that I turn off the live render update button, but I meant to say that I am turing it on...*
  
--

### Task 2

Investigate materials in the Material Palette and read the documentation about the principled shader or any other shader.

--

### Task 3

Come up with a simple but nice scene including interesting shading effects. Submit a rendering of that scene in your exercise folder until tomorrow.

???

If you prefer to create the scene and image with a different software, e.g. Unity or Unreal, you can do so. However, then also submit an image of your results of the Houdini tutorials.

---
template: inverse

## Happy Shading!

# 👩🏽‍🎨
