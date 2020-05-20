name: inverse
layout: true
class: center, middle, inverse
---

**Materials and Shading Workshop - Winter Term 19/20**

Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de | Film University Babelsberg *KONRAD WOLF*

Friday, February 15th, 10.00-18.00, Room 2.044, House 7


## The Workshop

Back in the day, what I had planned...

* Intro Materials and Shading
    * Shading vs. Shader
    * Shader pipeline vs. fragment shader implementations
* Local Illumination
    * Theory
    * Implementation within a 3D engine
        * Re-implementation of p5's shading functionalities
        * Interactive mesh rendering
* NPR Materials
    * Toon
    * Watercolor
    * Lit Sphere
* Advanced Material Properties
* Physically-based Shading
* Material Interfaces
    * JS, p5, Houdini, Touch Designer, Unity
* Modern Fragment Shaders
    * Capabilities
    * Rendering


...this is enough for a term.


## Learning Objectives


* Understand the theory of local lighting and shading within a 3D engine
* Be able to implement basic concept
* Be abler to go from there to explore creative shading options
* Understand advanced and physically-based shading
* Understand modern approaches to shading
* Understand modern shader development the capabilities of fragment shaders
* Be able to implement modern fragment shaders in a creative context

---

## Today

<img src="../img/sphere_all.png" alt="sphere_all" style="width:44%;"> <img src="../img/sphere_toon.png" alt="sphere_toon" style="width:44%;">

Looks simple enough, right? 😎

## Today

* Intro Materials and Shading
* Local Illumination
    * Theory
    * Implementation within a 3D engine
        * Re-implementation of p5's shading functionalities
        * Shaders
* NPR Materials
    * Toon
* Exploration

## Learning Objectives

* Understand the theory of local lighting and shading within a 3D engine
* Understand and be able to implement basic concept
* Be able to go from there to explore creative shading options

At the end of the day we will talk about what to do on Monday.

## Intro

### 3D Engines

We start to think about materials and shading in a 3D engine context.

This means we plug our shading development into a given environment such as p5, Unity, Houdini etc. and work with given assets such lights or material properties.

This is the best option for complex setups and scenes and realistic appearance.

### Fragment Shader

In contrast to this stands modern fragment shader development with aims to do as much a possible within the fragments shader itself, going as far as ray-tracing, geometry and animation. However option are still limited. 

This is the best option for for abstracted, simplified and artistic scenes and whenever performance is crucial (e.g. in a performance scenario).


## 3D Engine Environnement

## Anatomy of a 3D Rendering

<img src="../img/vfx_pipeline.png" alt="vfx_pipeline" style="width:110%;"> 

<img src="../img/pixar_pipeline.png" alt="pixar_pipeline" style="width:100%;">[Pixar, 2015] 


## Materials & Shading

<img src="../img/vfx_pipeline_01.png" alt="vfx_pipeline" style="width:110%;"> 


<img src="../img/vfx_pipeline_02.png" alt="vfx_pipeline_02" style="width:110%;"> 


<img src="../img/egg.png" alt="egg" style="width:100%;"> 


<img src="../img/shading_01.png" alt="shading_01" style="width:100%;">[[Gereon Zwosta]](http://www gereon-zwosta.de)]


<img src="../img/shading_02.png" alt="shading_02" style="width:100%;">[[Gereon Zwosta]](http://www gereon-zwosta.de)]


In the context of creating a certain look for a model, e.g. to make it seamlessly fit into environment, we need to consider

* Texturing
* Shading
* Lighting
* Rendering

*On a Side Note:* Materials are often considered as the combination of textures and shading properties.

Materials = Textures + Shading


## Texturing

*Texturing* is usually understood as attaching an image to a shape or a geometry and the *textures* are the images we “stick” on geometry. 

*UV Maps* define a relationship between the space of the geometry and the texture space. You can also imagine this as taking the geometry and flatting it onto a 2D representation, as for example sewing pattern do.

![3dmapping01](../img/3dmapping01.jpg) [[pluralsight]](https://www.pluralsight.com/courses/3ds-max-uv-mapping-fundamentals)


## Procedural Texturing

A procedural texture is a texture created using a mathematical description (i.e. an algorithm) rather than directly stored data. 

The advantage of this approach is low storage cost, unlimited texture resolution and easy texture mapping.

These kinds of textures are often used for high frequency detail and to model surface or volumetric representations of natural elements such as wood, marble, granite, metal, stone, and others.

[[Wikipedia - Procedural texture]](https://en.wikipedia.org/wiki/Procedural_texture)

<img src="../img/procedural_textures.png" alt="procedural_textures" style="width:100%;"> 


These days textures are also highly relevant for shading and lighting related effects. 


They enable the simulation of near-photorealism in real time by vastly reducing the number of polygons and lighting calculations needed to construct a realistic and functional 3D scene.


There are various more complex mappings such as 

* height mapping, 
* bump and displacement mapping, 
* reflection, specular and occlusion mapping.

These maps are usually put together and controlled by a *materials system* of the rendering enging, such as Unity.

[[Wikipedia - Texture Mapping]](https://en.wikipedia.org/wiki/Texture_mapping)

We will not work with texture maps in this workshop. There are several tutorials and tools online. One common approach is [texture baking](https://blenderartists.org/t/what-is-texture-baking/408872), for example.


## Shading


Shading used in drawing means to apply varying level of darkness for the depiction of depth perception.  

<img src="../img/shadingtechniques.jpg" alt="shadingtechniques" style="width:100%;">[[Nitram]](https:/ nitramcharcoal.com/basic-shading-techniques/)



In computer graphics, shading does pretty much the same thing: a color (e.g. from texture) is altered by varying levels of darkness (and colors). 

<img src="../img/egg.png" alt="egg" style="width:75%;"> 


This is done based on characteristics such as

* the surface's angle and distance to lights
* light properties, and
* material properties.


## Lighting

The standard types of light sources supported by all 3D graphics systems come in four varieties: ambient, directional / distant, point, and spot.


<img src="../img/lights.png" alt="lights" style="width:110%;">[[Houdini Reference]](http://www.sidefx.com/docs houdini/render/lights.html#lights)]


## p5 Scene Setup

The given scene gives the environment for learning to implement basic shading algorithms. It includes

* Ambient light
* Directional, colored lights
* Ambient material
* Specular material

p5 has some behavioral specifics but these are straight-forward to understand. The general concepts should be similar in any other 3D rendering context, e.g. in Unity.


## Goal:

### Implement exactly the same behavior with custom shaders

## Lighting and Shading

The interaction between light and a surface is a complex physical process.  


Photons can be *absorbed*, *reflected*, or *transmitted* when they strike the surface of a material.  

<img src="../img/photons.png" alt="photons" style="width:60%;">[[Wikipedia]](https://en.wikipedia.org/wiki File:BSDF05_800.png)]

To model this interaction using the whole of today’s knowledge of physics would be far too computationally time-consuming.  

Instead, we must settle for models that ***approximate*** the expected appearance of a surface.

> Essentially, all models are wrong, but some are useful. – George E. P. Box

## Local Illumination

One approach to make light-surface interaction more handlebar, is to only consider a *local* interaction between clearly defined lights, a viewer and a surface point.

This powerful approximation is called *local illumination* and one of the oldest but still used techniques for shading.

<img src="../img/lighting_shading_01.png" alt="lighting_shading_01" style="width:100%;"> 

<img src="../img/lighting_shading_02.png" alt="lighting_shading_02" style="width:100%;"> 


* *Lighting* or illumination is used to describe the process by which the color and intensity of light *reaching a surface* is determined. 

<img src="../img/lighting_shading_03.png" alt="lighting_shading_03" style="width:60%;"> 


* *Lighting* or illumination is used to describe the process by which the color and intensity of light *reaching a surface* is determined. 
* *Local Illumination* considers light only provided directly emitted from a light source, travelling in a straight path to the illuminated point.

[Autodesk](https://knowledge.autodesk.com/support/maya-lt/learn-explore/caas/CloudHelp/cloudhelp/2015/ENUMayaLT/files/BoL-Indirect-global-vs-direct-illumination-htm.html)]

<img src="../img/lighting_shading_03.png" alt="lighting_shading_03" style="width:60%;"> 

* *Shading* describes the methods used to determine the color and intensity of light *reaching the viewer* for each point on a surface. 

<img src="../img/lighting_shading_04.png" alt="lighting_shading_04" style="width:60%;"> 


Hence, the final color (the light reaching the viewer) of a surface point depends on the properties of the light sources as well as the reflective characteristics of the surface itself.

<img src="../img/lighting_shading_04.png" alt="lighting_shading_04" style="width:60%;"> 

This computation can be interpreted as a geometric problem.

### View and Light Vectors

We interpret the light transport as the radiance traveling along rays, where

* **L** points to the direction the light is coming from,
* **V** points to the observer and is the direction the light is reflected towards.

<img src="../img/local_coordinate_lv.png" alt="local_coordinate_lv" style="width:60%;"> 

We interpret the light transport as the radiance traveling along rays, where

* **L** points to the direction the light is coming from,
* **V** points to the observer and is the direction the light is reflected towards.

By convention, ||**L**|| = ||**v**|| = 1

<img src="../img/local_coordinate_lv.png" alt="local_coordinate_lv" style="width:60%;"> 


### Multiple Lights

<img src="../img/lighting_shading_05.png" alt="lighting_shading_05" style="width:60%;"> 

The color that we calculate for a point on a surface is the combination of contributions from ***all*** the light sources that illuminate the surface. 

Hence, we need to iterate over all lights and collect their values.

In most render engines, we can get the intensity and/or color of each light separately. 


This is based on the physical fact that the contribution of each light adds up linearly. This means that the contribution of each light just needs to be **summed up**.

<img src="../img/shad-lightlinear2.gif" alt="lightlinear2" style="width:50%;"> [[Scratchapixel]](https://www scratchapixel.com/lessons/3d-basic-rendering/introduction-to-shading/shading-multiple-lights)

### What Are we Summing Up?

The computation of the different light intensities, e.g. for a spot light is given by formulas. Today we do not consider these. 


Today we work with (for the sake of simplicity):

* a constant color for the ambient light, and
* a direction vector and a constant color for each directional light.

### On a Side Note: Color

For today, we are working with the RGB color system and the intensity of reflected light at a point on a surface is calculated for red, green, and blue wavelengths simultaneously.

Hence, whenever we talk about intensity or color, we mean a rgb-vector.


### Materials

Now, we need to know how the incoming light is reflected at a surface point.

<img src="../img/lighting_shading_06.png" alt="lighting_shading_06" style="width:60%;"> 

There are different types of reflections.

How these different types of reflections are computed and combined is defined by various shading models.


### Diffuse Reflection

A diffuse surface is one which scatters the incident light on a point on the surface equally in random directions.

<img src="../img/reflection_diffuse.png" alt="reflection_diffuse" style="width:100%;"> 

This is also called a *Lambertian* reflection, and the appearance of the Lambertian reflection does not depend on the position of the observer.

### Specular Reflection


For a *shiny* or *glossy* reflection there is a preferred angle of reflection, meaning more of the incident light is reflected in a certain angle than in other angles.

<img src="../img/reflection_shiny.png" alt="reflection_shiny" style="width:100%;"> 


### Full Specular Reflection (Mirror Reflection)

For a full specular reflection all light is reflected in the same angle as the incoming angle.

<img src="../img/reflection_specular.png" alt="reflection_specular" style="width:100%;"> 

<img src="../img/reflections.png" alt="reflections" style="width:70%;"> 

### Measured Diffuse Surface Reflection

<img src="../img/diffuse.png" alt="diffuse" style="width:100%;">  [[Hullin et al. 2008]]() 


### Measured Glossy Surface Reflection

<img src="../img/glossy.png" alt="glossy" style="width:100%;">  [[Hullin et al. 2008]]() 


### Measured Layered (diffuse / glossy) Surface Reflection

<img src="../img/layered.png" alt="layered" style="width:100%;">  [[Hullin et al. 2008]]() 

### Diffuse Reflection

The Diffuse Reflection looks the same under all observation directions. 

<img src="../img/reflection_diffuse.png" alt="reflection_diffuse" style="width:100%;"> 


It only depends on the light direction.


### Diffuse Reflection - Light Direction

<img src="../img/lambert_01.png" alt="lambert_01" style="width:100%;"> 

As the angle between the normal vector and the light direction increases, the surface area illuminated by the beam of light (which stays the same) increases...


... and the intensity of the light per unit surface area **decreases**.


### Lambert's Cosine Law

<img src="../img/lambert_02.png" alt="lambert_02" style="width:50%;"> 

If the angle between the normal vector and light direction is θ, then the surface area illuminated by the beam of light is equal to \\(\frac{A}{cosθ}\\).

This results in a decrease in the intensity of the light per unit surface area by a factor of \\({cosθ}\\). 


<img src="../img/lambert_02.png" alt="lambert_02" style="width:40%;">  <img src="../img/dot_product.png" alt="dot_product" style="width:30%;">[[Unity Manual]](https://docs.unity3d.com/Manual/UnderstandingVectorArithmetic.html)]

If the angle between the normal vector and light direction is θ, then the surface area illuminated by the beam of light is equal to \\(\frac{A}{cosθ}\\).

This results in a decrease in the intensity of the light per unit surface area by a factor of \\({cosθ}\\). 


<img src="../img/lambert_02.png" alt="lambert_02" style="width:50%;"> 

The value of \\({cosθ}\\) is given by the dot product between the normal vector **N** and the unit direction to the light source **L**. 

\\({cosθ}\\) = **L** ∙ **N**


<img src="../img/lambert_03.png" alt="lambert_03" style="width:15%;"> 

A negative dot product means that the surface is facing away from the light source and should not be illuminated at all. 


Thus, we clamp the dot product to zero in our illumination calculations. 

max(**L** ∙ **N**, 0)


This is the Lambertian Reflection.


### Lambert Material

In order to compute a diffuse or lambertian material model, we simply use

```
ColorDiffuse * max(L ∙ N, 0);
```

## Let's Implement This!

## 👩🏽‍💻🧑🏻‍💻


## Local Illumination

<img src="../img/reflection_shiny.png" alt="reflection_shiny" style="width:100%;"> 

### Specular Reflection

Surfaces tend to reflect light strongly along the path given by the reflection of the incident direction across the surface normal. This results in the appearance of a shiny highlight on a surface called a secularity. 


<img src="../img/glossy.png" alt="glossy" style="width:50%;">  [[Hullin et al. 2008]]() 


Unlike the diffuse reflection, the specular reflection visible on a surface depends on the position of the viewer. 

### Reflection Vector


The intensity of the specular reflection is related to the angle between the direction to viewer vector V and the direct reflection vector R.

<img src="../img/reflection_vector.png" alt="reflection_vector" style="width:60%;"> 

Most 3D package offer functions such as `reflect(L, N);` in GLSL.

### Specular Reflection

<img src="../img/reflection_vector_normal.png" alt="reflection_vector_normal" style="width:60%;"> 

Based on the given geometry, how can we model specular reflection now?


<img src="../img/reflection_vector_normal.png" alt="reflection_vector_normal" style="width:60%;"> 

A model that recreates believable (but having almost no real physical basis) specular highlights uses again the cos function for modulation.


<img src="../img/reflection_vector_normal.png" alt="reflection_vector_normal" style="width:40%;"> <img src=".. img/shininess.png" alt="shininess" style="width:60%;">

\\[{cos^{n}\alpha} = max(0, R \cdot V)^{n}\\]

With n as a *shininess* exponent. 


### Specular Reflection - Shininess exponent

The specular or shininess exponent n controls the sharpness of the specular highlight. 


A small value of mn produces a dull highlight that fades out over a relatively large distance, and a large value of n produces a sharp highlight that fades out quickly as the vectors V and R diverge.  

<img src="../img/shininess_exponent.png" alt="shininess_exponent" style="width:100%;"> 
on

### Specular Material

Now, we can compute the specular component of a shading model with

```glsl
ColorSpecular * max(0, R ∙ V)^n;
```


A basic specular model could therefore look like:

```glsl
AmbientLight + DiffuseShading + ColorSpecular * max(0, R ∙ V)^n;
```


## Local Illumination

What we just learned is almost already one of the most famous and excessively used shading models, namely the *Phong* shading model.


The Phong model looks as follows:

<!-- \\(I_{Phong} = I_{Ambient} + I_{Diffuse} + I_{Specular}\\) -->
\\(I_{Phong} = I_{Ambient} + I_{Diffuse} + I_{Specular}\\)

<img src="../img/phong_01.png" alt="phong_01" style="width:100%;"> 


### Phong Model

\\(I_{Phong} = I_{Ambient} + I_{Diffuse} + I_{Specular}\\)

With the components modelled as


\\(I_{Ambient} = k_a\\)


\\(I_{Diffuse}: k_d max(N \cdot L, 0)\\)


\\(I_{Specular}: k_s max(R \cdot V, 0)^n\\)



<img src="../img/phong_02.png" alt="phong_02" style="width:80%;"> 


We can now define, how much of an incoming light intensity is reflected on a surface point for a certain view vector


For an incoming light I


\\(I_{Phong} = k_a + k_s max(R \cdot V, 0)^n  I  + k_s max(R \cdot V, 0)^n I \\)

This is also called a **BRDF**, or better in this case the **Phong BRDF**.


We will come back to this.


## Let's Implement Shininess ☀️

## Local Illumination

To describe the reflectance behavior on a surface point there are various different ***Bidirectional reflectance distribution functions (BRDF)***.

<img src="../img/brdf.png" alt="brdf" style="width:70%;">[[Montes 2012]](https://digibug.ugr.es/bitstream handle/10481/19751/rmontes_LSI-2012-001TR.pdf)]


To describe the reflectance behavior on a surface point there are various different ***Bidirectional reflectance distribution functions (BRDF)***.


The BRDF \\({f(\omega_{\text{i}}, \omega{\text{r}})}\\) is a function of four variables:
<!-- The BRDF \\({f(\omega\us{\text{i}}, \omega\us{\text{r}})}\\) is a function of four variables: -->

<img src="../img/brdf_01.png" alt="brdf_01" style="width:40%;"> [[Wikipedia]](https://en.wikipedia.org/wiki Bidirectional_reflectance_distribution_function)]

The function takes an incoming light and an outgoing light direction, and returns the ratio of reflected radiance exiting along to the irradiance incident on the surface from direction. 

This makes \\(\omega_{\text{i}}\\) and \\(\omega_{\text{r}}\\) equivalent to **L**  and **R**.


### BRDF

In other words:
*A BRDF computes the ratio of the incoming to the exiting light.*

By computing the value of a given BRDF for all surface points, we have a description of the surface's shading behavior.

How do we get BRDFs?

* Measured from material samples using calibrated cameras and lightsources
    * In tabular form: expensive, requires interpolation for rendering
    * Editing is difficult


### MERL BRDF Database

<img src="../img/brdf_merl.jpg" alt="brdf_merl" style="width:60%;"> [[Matusik 2003]](https://www.merl.com/brdf )

How do we get BRDFs?

* Measured from material samples using calibrated cameras and lightsources
    * In tabular form: expensive, requires interpolation for rendering
    * Editing is difficult
* Phenomenologically motivated models
    * Few, intuitive parameters
    * Only limited realism
    * Phong [1975], Blinn-Phong [1977], Ward [1992], Lafortune et al. [1997], Ashikhmin et al. [2000],...
* Physically motivated models
    * More exact results
    * Tuning parameters more difficult
    * Cook-Torrance [1981], He et al. [1991]
* Hybrid models
    * Maximize artist ease-of-use 
    * Physical realism
    * “Disney”-BRDF [Burley 2012a] / [Burley 2012b]


<img src="../img/brdf_taxonomy.png" alt="brdf_taxonomy" style="width:100%;"> 


## Global Illumination

Well, local illumination is nice and well but how do we go from there?

<img src="../img/global_illumination.png" alt="global_illumination" style="width:100%;"> 

<img src="../img/global_illumination_01.png" alt="global_illumination_01" style="width:100%;">

We need light from all directions!


<img src="../img/global_illumination_02.png" alt="global_illumination_02" style="width:100%;"> 


## Rendering Equation

How much light is emitted and reflected on surface point x?

<img src="../img/global_illumination_03.png" alt="global_illumination_03" style="width:100%;"> 


Light from all directions...


<img src="../img/global_illumination_04.png" alt="global_illumination_04" style="width:100%;"> 


Reflectance?


BRDF!


<img src="../img/global_illumination_05.png" alt="global_illumination_05" style="width:100%;"> 


BRDF with what? Which light do we get?


<img src="../img/global_illumination_06.png" alt="global_illumination_06" style="width:100%;"> 


Bad news:

The incoming light in x is the rendering equation of y...

<img src="../img/global_illumination_07.png" alt="global_illumination_07" style="width:100%;"> 


<img src="../img/global_illumination_08.png" alt="global_illumination_08" style="width:100%;"> 


Infinite-dimensional!

<img src="../img/global_illumination_09.png" alt="global_illumination_09" style="width:40%;"> 

Once again, 'solutions' are acceptable approximations...


## Global Illumination

<img src="../img/global_illumination_10.png" alt="global_illumination_10" style="width:90%;"> 

* Monte-Carlo Ray and Path Tracing
    * Stochastische Auswertung der Integrale
    * Rauschen durch Varianz der stochastischen Auswertung

* Photon Mapping
    * Erst Lichtpartikelverteilung in der Szene, dann ray tracing
    * Fokussierte Lichteffekte, Kaustiken

* Radiosity-Verfahren
    * Finite-Element-Techniken: Oberflächen in Zellen unterteilt, Lichtsimulation zwischen Zellen
    * Projektion der unendlich dimensionalen Gleichung in einen Funktionenraum endlicher Dimension
    * Effizient für glatte Beleuchtung und Reflexion 


### Well that was a bummer...

### Now, let's have some fun... Toon

## Toon

* Flat shading
* Step function for diffuse shading
* Outline
* Small light highlight
* Outline around highlight

## Let's Implement This!

## 👩🏽‍💻🧑🏻‍💻


## Monday

What do you want to focus on on Monday?


Proposal:

* Fragment shader (2D, 3Dish)
    * Modern capabilities
    * Examples

Options:

* More 3D shading
    * Physically based shading
    * On mesh from Kinect?
    * Working with UVs

* Material Interfaces
    * Photorealistic / Physically based
    * Houdini


### The End of Day 1

## 🤯
