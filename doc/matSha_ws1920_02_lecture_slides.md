name: inverse
layout: true
class: center, middle, inverse
---

**Materials and Shading Workshop - Winter Term 19/20**

Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de | Film University Babelsberg *KONRAD WOLF*

Friday, February 15th, 10.00-18.00, Room 2.044, House 7

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

### Recap Friday

???

* Materials?
    * Textures + Shading
* Shading?
* Texture-based Shading?
* Reflections
    * Diffuse / Lambert, cos theta L, N
    * Specular, cos alpha, V, R (reflection strong along refelction vector)
* Phong
* BRDF
    * Phenomenological, Physically-based, hybrid
* Rendering Equation
* 3D engine context - what does that mean?

---
layout: false

## Today


--

* A closer look onto fragment shaders

--
* How to work with Shadertoy examples

--
* 3D Scene Rendering with Ray Tracing

--
* Explore ideas on what to do with shading and shader

--

The focus of today will be more on hands-on, explorative exercises.

???

I tried not to overstuff the day, as I usually do it, now I feel, I have to little - we will see.

---

## Learning Objectives

--

* Understand the the fragment shader

--

* Understand different shader implementations and do some of your own

--
    1. Understand an example

--
    2. Adjust an example

--
    3. (Build your own from scratch)

--

* Explore ideas on what to do with them

???

* CHECK: Know when to do what and how to bring the two scenarios together
* CHECK: Understand given material interfaces better

---
template: inverse

## The Shader Pipeline

---

## The Shader Pipeline

.center[<img src="../img/shader_pipeline_vert.png" alt="shader_pipeline_vert" style="width:105%;">]

---

## The Shader Pipeline

.center[<img src="../img/shader_pipeline_frag.png" alt="shader_pipeline_frag" style="width:100%;">]

---

## The Fragment Shader

The fragment shader is the OpenGL pipeline stage after a primitive is rasterized.  

--
  
.center[<img src="../img/pipeline.png" alt="pipeline" style="width:90%;">]

--

* The 3D engine / host program fills OpenGL-managed memory buffers with arrays of vertices
* These vertices are projected into screen space, assembled into triangles, and rasterized into pixel-sized fragments. 
* Finally, the fragments are assigned color values and drawn to the framebuffer. 

.footnote[[[Evas GL Programming Guide]](https://www.enlightenment.org/playground/evas-gl.md)]


---

## The Fragment Shader

The rasterization step takes each triangle from the triangle assembly, clips it and discards the parts located outside of the screen.  

--

The remaining visible parts are then broken into pixel-sized fragments.  

--

The vertex shader's varying outputs are also interpolated across the rasterized surface of each triangle, assigning a smooth gradient of values to each fragment.  

--

.center[<img src="../img/interpolation.png" alt="interpolation" style="width:50%;">]

If the vertex shader assigns a color value to each vertex, for instance, the rasterizer will blend those colors across the pixelated surface.


.footnote[[[Evas GL Programming Guide]](https://www.enlightenment.org/playground/evas-gl.md)]

???

The fragment shader returns the color and the depth values that get drawn into the framebuffer. The most common fragment shader operations are lighting and texture mapping. The fragment shader is able to perform sophisticated special effects as it runs independently for every pixel drawn. This also makes it the most performance-sensitive part of the graphics pipeline.

Framebuffer, Testing and Blending
The rendering pipeline outputs to the framebuffer. OpenGL allows you to render the final scene to the screen using the default framebuffer, but it also lets you make framebuffer objects that draw into offscreen renderbuffers or into textures for use as inputs to other rendering jobs. 

In addition to the color buffers a framebuffer can have a depth buffer and/or a stencil buffer which can filter fragments before they are drawn. Depth testing discards fragments from objects that are behind the ones already drawn, while stencil testing uses shapes drawn into the stencil buffer to constrain the drawable part of the framebuffer. Fragments that remain have their color value alpha-blended with the color value they are overwriting. The final color, depth and stencil values are then drawn into the target buffers.

---

## The Fragment Shader

Keep in mind that Shaders are mini-programmes compiled to run on the GPU.  

--

The GPU has lots of processors and each rendering stage is or can be split into many separate calculations, for example to compute each fragment.

.center[<img src="../img/gpu_fragments.png" alt="gpu_fragments" style="width:100%;">]

???

* triangles cover n pixels
* n fragment shaders execute in parallel

--

This means that we compute the rendering in parallel - which makes it much faster than doing it with a CPU-based software renderer where we only have 1-8 processors.


.footnote[[[Anton Gerdelan]](http://antongerdelan.net/opengl/shaders.html)]

???

Difference Between Fragments and Pixels
A pixel is a "picture element". In OpenGL lingo, pixels are the elements that make up the final 2d image that it draws inside a window on your display. A fragment is a pixel-sized area of a surface. A fragment shader determines the colour of each one. Sometimes surfaces overlap - we then have more than 1 fragment for 1 pixel. All of the fragments are drawn, even the hidden ones.

Each fragment is written into the framebuffer image that will be displayed as the final pixels. If depth testing is enabled it will paint the front-most fragments on top of the further-away fragments. In this case, when a farther-away fragment is drawn after a closer fragment, then the GPU is clever enough to skip drawing it, but it's actually quite tricky to organise the scene to take advantage of this, so we'll often end up executing huge numbers of redundant fragment shaders.

---
template: inverse

## Shader Language

---

## Shader Language

OpenGL shaders are written in the OpenGL Shading Language (GLSL), which has a syntax based on the C programming language.  

--

OpenGL and GLSL have and are constantly evolving. It is crucial to be clear about the version you are using.  

--

For example OpenGL 3.2 added a new type of shader: geometry shaders, and version 4.0 added tessellation control and tessellation evaluation shaders.  

--

For professional programs the first line in a GLSL shader indicates a version tag, e.g.

```glsl
#version 400
```

.footnote[[[Wikipedia]](https://en.wikipedia.org/wiki/OpenGL_Shading_Language)]


---
template: inverse

## WebGL

---

## WebGL

WebGL (Web Graphics Library) is a JavaScript API for GPU rendering.  

--

WebGL programs consist of control code written in JavaScript and shader code that is written in OpenGL ES Shading Language (ESSL).  

--

OpenGL ES (Embedded Systems) is a cut down version of the full OpenGL specification aimed at mobile devices.  

???

Developed by Vladimir Vukicevic at Mozilla
3D version of Canvas
2006: first prototype

2009: The Khronos Working Group manages the WebGL specification

Contributions from Apple, Google, Mozilla, Oprah, etc.


High API quality
Conformance suite: 2.0.0 contains 340,000 test cases
Workarounds for numerous driver bugs
WebGL 1.0 implements OpenGL ES 2.0 APIs
Supported on Firefox, Chrome, Edge, Safari
Support rate: 98% [*]
WebGL 2.0 implements OpenGL ES 3.0 APIs
Currently supported on Firefox, Chrome
Edge and Safari intend to implement it
Support rate: 41% [*] and increasing 
[*] Data from https://webglstats.com

You should be aware that some people think that WebGL could be a security risk. There's already been a few proofs of concepts around this area. OpenGL to Standard WebGL is based on --- was originally developed with speed in mind, not security, and it was intended to be run on a single device rather than over the web. Having said that, WebGL does run through a number of abstractions and browser vendors are of course, doing their best to ensure this is as secure as possible. Only time will tell how much of a problem security is with WebGL, but you should probably expect WebGL to be disabled in some environments because it won't be subtle for old purposes.


---

## WebGL

WebGL (Web Graphics Library) is a JavaScript API for GPU rendering.  

WebGL programs consist of control code written in JavaScript and shader code that is written in OpenGL ES Shading Language (ESSL).  

OpenGL ES (Embedded Systems) is a cut down version of the full OpenGL specification aimed at mobile devices.  

.center[<img src="../img/webgl.png" alt="webgl" style="width:60%;">]

???

.task[TASK:] Show triangle file.

So in our first WebGL example, I'm just going to change the backgroundcolor to red. You can see we retrieve a reference to the canvas, and then we use the getContext method to get a reference to WebGL context, and we then use this to set the color to green. So here's the results of our first steps of WebGL, a green rectangle. 



So I have some code here that draws a triangle on the screen. I want to give you a taste of what's involved in using raw WebGL. You can see at the top here, we have our canvaselement in order to display our content, and then moving down the page, we have a script block here, and we have a number of different variables that we're going to use. Now, I've divided this into separate functions to try and make it clear what's going on here. In the init function, we get a couple of references to our canvas, and also the WebGL context, and then we have a variable here calledvertices, and these hold the coordinates of our triangle. We then have to perform a bit of logic involving setting something up called buffers, and these are kind of areas of memory we're going touse in order to draw our shape. Next, we have two functions here, createVertexShader and createFragmentShader. Now, shaders are kind of like little drawing programs. And then we have another function here that basically goes and compiles these shader programs and tells the WebGL context to use them. We then have a function called assignShadersToBuffers where we basically pass in some of the information from our buffers before finally drawing everything out. Now if you thought that was a lot of work to do something very simple, I think you'd be right. But don't worry, there's are easier ways of working with WebGL


---

## WebGL

As the usage of pure WebGL is quite tedious, 'helper' frameworks are tremendously popular, as for example Shader Toy.

[A collection of WebGL frameworks and libraries](https://gist.github.com/dmnsgn/76878ba6903cf15789b712464875cfdc)  

???

.task[TASK:] Go to links

---

## WebGL

More useful links

* [API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
* [WebGL specs](https://www.khronos.org/registry/webgl/specs/latest/)
* [List of WebGL frameworks](https://en.wikipedia.org/wiki/List_of_WebGL_frameworks)
* [WebGL engines](https://en.wikipedia.org/wiki/List_of_game_engines)
* [Chrome experiments](https://experiments.withgoogle.com/chrome?tag=WebGL)
* [WebGL 2.0 samples](http://webglsamples.org/WebGL2Samples/)
* [WebGL stats](https://webglstats.com/)
* [WebGL dev list](https://groups.google.com/forum/#!forum/webgl-dev-list)
* [WebGL spec discussion list](https://www.khronos.org/webgl/public-mailing-list/)

---

## Shader Development

Many frameworks, such as ShaderToy, solely focus on fragment shaders.

--

These frameworks have no connection to a 3D scene or engine and start as an empty 2D canvas.

--

Often times they explore how to build a 3D scene or better engine 'inside' of the fragment shader.

???

.task[TASK:] Show basic p5 example


---
template: inverse


## Shader Development


---

## Shader Development

Environments to develop (fragment) shaders differ in details and you can not transfer code from one to the other without adjustments (remember all the code from the triangle example)?

--

The required adjustments range from renaming variables to the access to different shaders which might make a transfer simply impossible.

???

So what do you need to look out for?

---

## Shader Development

When choosing a framework or code examples, the most important aspects to look out for:

--

* The WebGL1 vs WebGL2 version

--

    * WebGL2 is a pretty significant upgrade from WebGL1
--

        * WebGL2 is almost backward compatible with WebGL1
        * Frameworks might not be however
--

* GLSL 3.00 ES vs. GLSL 1.00

--
    * For WebGL2 you should also upgrade to GLSL 3 ES (but don't have to)
    * `#version 300 es` MUST BE THE FIRST LINE in the shader
    * These two versions are not compatible at all!

--

* Which other shaders are used?
    * E.g. the geometry shader becomes more and more popular as it offers great performance improvements

--

* What comes from the core engine?
    * Uniforms, attributes etc.

???

.task[TASK:] Go to [WebGL2 from WebGL1](https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html)


For us at this moment, the most interesting development environments are


---

## Shader Development Frameworks

--

* [p5](https://p5js.org/reference/)

--

* [glsl-canvas](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)
    * (if you are using vscode)
    * [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas)
    * From the [Book of Shaders](https://thebookofshaders.com/)

--

* [Shadertoy](https://www.shadertoy.com/)
    * Countless examples with a great variety
    * Author expertise range from noobs to master of the shader universe
    * Usually some what quality checked

--

* Runner up: [Shaderoo](https://shaderoo.org/?cmd=browse)
    * Incredible examples, mainly from one author
    * Offers geometry shaders, hence your context must enable them also
    * Best solution when performance is crucial

--

* Your own JS environment
    * Full control
    * You will need to learn WebGL



---

## Shader Development Frameworks - Pros and Cons

???

.task[TASK:] Show each

--

* [p5](https://p5js.org/reference/)
    * WebGL 1 only
    * Webcam
    * Your own buffer management

--

* [glsl-canvas](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)
    * WebGL 1 & 2
    * Data configuration from `.code-workspace`
        * Textures, custom uniforms
    * No WebCam (as far as I know)
    * Simple buffer management

???

.task[TASK:] Show texture example

--

* [Shadertoy](https://www.shadertoy.com/)
    * WebGL 2
        * Most WebGL 1 code will work ([WebGL 2.0 vs WebGL 1.0](https://shadertoyunofficial.wordpress.com/2017/02/16/webgl-2-0-vs-webgl-1-0/))
    * Test environment only
    * (Too?) handy and comfortable

???

.task[TASK:] Show ShaderToy options with https://www.shadertoy.com/view/MtKcDG

--

* [Shaderoo](https://shaderoo.org/?cmd=browse)
    * Test environment only
    * Offers geometry shaders, hence your context must enable them also
    * Best solution when performance is crucial


---

## Shader Development Frameworks - Pros and Cons

Know for what you are going to use the shader and work in best suitable environment from the start!

???

ShaderToy is packed with very good examples and code to steal. Hence, you should be familiar with working with Shader Toy examples.


---
template: inverse

## Getting Out Of ShaderToy


---

## Getting Out Of ShaderToy

Most likely, input uniforms and attributes are named differently in different contexts. 

--

E.g. Shadertoy's namings are

```glsl
vec3 iResolution        //The viewport resolution (z is pixel aspect ratio, usually 1.0)
float iTime             //Current time in seconds
float iTimeDelta        //Time it takes to render a frame, in seconds
int iFrame              //Current frame
float iFrameRate        //Number of frames rendered per second
float iChannelTime[4]   //Time for channel (if video or sound), in seconds
vec3 iChannelResolution[4] //Input texture resolution for each channel
vec4 iMouse             //xy = current pixel coords (if LMB is down). zw = click pixel
sampler2D iChannel{i}   //Sampler for input textures i
vec4 iDate              //Year, month, day, time in seconds in .xyzw
float iSampleRate       //The sound sample rate (typically 44100)
```

---

## Getting Out Of ShaderToy

Don't forget to bring in all the uniforms you need. E.g.

```glsl
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
```

---

## Getting Out Of ShaderToy

For a WebGL 1 context you need to change the main function call from (ES 3.0)

```glsl
void mainImage( out vec4 fragColor, in vec2 fragCoord ) 
{
    // fragColor
    // fragCoord
}
```

to (ES 1.0)

```glsl
void main()
{
    // gl_FragCoord
    // gl_fragColor
}
```

---

## Getting Out Of ShaderToy

To make your life easier, you could use define statements to rename uniforms and keywords:

```glsl
#define fragColor gl_FragColor
#define fragCoord gl_FragCoord
#define iResolution u_resolution
#define iTime u_time
#define iMouse u_mouse
```

---

## Getting Out Of ShaderToy

Problems could come from:

* Input channels (understand them in before you start)
* Noise functions
    * Great resource: [GLSL Noise Algorithms](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)
* Buffer

---

## Getting Out Of ShaderToy

How to approach all these scary looking shaders?

--

Goal: Try to find the overall *gist* of the shader.

--

Divide and conquer!

--

* Test different values for constants and defines
* Separate functionalities, e.g. turn of animation, sound, interaction etc.
* Go line by line and display each line separately
* Take out scaling factors, offsets, etc.

???
.task[TASK:] Show first steps in https://www.shadertoy.com/view/MtKcDG

---
template: inverse

## Hands-On! 

### ✋🏼🤚🏼

---

## Hands-On

Understand a shader of your choice!

--

* Chose a shader from shader toy and make it in a different environment work
    * glsl-canvas, p5, ?
* Go through the shader and figure out all steps as well as possible
    * Comment the code

--


Afterwards show us your work.


???

I recommend to stick with just image shaders for now.

Time: ~1.5h

* https://www.shadertoy.com/view/MtKcDG
* https://www.shadertoy.com/view/lslGWr & https://www.shadertoy.com/view/MslGWN
* https://www.shadertoy.com/view/ltB3DG
* https://www.shadertoy.com/view/XtGGRt
* https://www.shadertoy.com/view/XsB3Wc
* https://www.shadertoy.com/view/XslGRr
* https://www.shadertoy.com/view/3l23Rh
* https://www.shadertoy.com/user/flockaroo
* https://www.shadertoy.com/view/MddfR4
* https://www.shadertoy.com/view/XdyyRK

---
template: inverse

## 3D Scene Rendering

---

## 3D Scene Rendering

For rendering, we need to convert a 3D scene representation into a 2D raster. 

.center[<img src="../img/frustum.png" alt="frustum" style="width:70%;">]

---

## 3D Scene Rendering

There are several rendering algorithms to do so in countless flavors. 

???

Which one are the main paradigms?

--

Physically-based rendering is so-called *ray tracing* and its physical foundations are

--

* Light is emitted by light sources
* Transported through the scene by reflection at surfaces
* Ends up in the eye

.center[<img src="../img/raytracing_01.png" alt="raytracing_01" style="width:40%;">]

???

.task[TASK:] Who can explain the algorithm?


---

## 3D Scene Rendering

Light transport is reversible with respect to time and we can trace the light rays backwards, starting in the eye, ending in the light source.

--

.center[<img src="../img/raytracing_02.png" alt="raytracing_02" style="width:40%;">]

Advantage: We are interested only in the light that hits the eye, anyways!

---

## 3D Scene Rendering

.center[<img src="../img/raytracing_02.png" alt="raytracing_02" style="width:40%;">]

For every point on the image plane,

* cast a ray from the eye into the scene,
* determine color and brightness of the light traveling to the eye and
* store it in the image.

???

Dedicated hardware has remained exotic, but general purpose GPU computing is becoming the standard.

Cons

* Hard to pipeline
* Usually needs preprocessing
* Typically higher runtime requirements than for object order rendering

Pros

* “Embarrassingly” parallel
* Every pixel can be computed independently, and needs to be written to only once
* Scales well with scene complexity
* Methodically uncomplicated

---

## 3D Scene Rendering

.center[<img src="../img/raytracing_04.png" alt="raytracing_04" style="width:100%;">]


---
template:inverse

## Let's Implement This!

## 👩🏽‍💻🧑🏻‍💻

---

## 3D Scene Rendering


We are going to implement a simple GPU ray-tracer in our fragment shader. 

--

Keep in mind that this is one of these topics where **there are worlds, or better universes, between the *basic* algorithm and *making it look good*** on a professional or production level.

---

## 3D Scene Rendering

A better implementation is possible, as for example demonstrated here: http://madebyevan.com/webgl-path-tracing/  

In case you want to follow up with this topic, I recommend to continue with these better (but more complicated) implementations: https://www.shadertoy.com/view/Xds3zN https://www.shadertoy.com/view/lsyyWG  

Or, a C++ one in 99 lines: http://www.kevinbeason.com/smallpt/#moreinfo 😁

---
template: inverse

---
template: inverse

## Hands-On! 

### ✋🏼🤚🏼

---

## Hands-On

Adjust a shader of your choice!

* Chose a shader and try to understand it as much as possible

--

* Write down what you would like to change it
* Try to make that happen

OR

* See what happens with the principle of *emergence*.

???

(aka trail-and-error)

--

Afterwards show us your work.

???

Time: ~1.h

---
template: inverse

## Brainstorming 

---

### Brainstorming

Imagine a project requirement is to work with shading (e.g. you got founding of the Shading Appreciation Society).  

--

Which ideas do you have for the application of shaders and shading?

???

20 min brainstorming, then discussion

---
template: inverse

## More on Materials

---

### More on Materials

* [Physically based shading references, at the end of 2019](http://lousodrome.net/blog/light/2020/01/04/physically-based-rendering-references-at-the-end-of-2019/)
* [Physically Based Rendering Algorithms: A Comprehensive Study In Unity3D](https://www.jordanstevenstechart.com/physically-based-rendering)
* Material Studies
    * [Cycles Material Studies](http://www.reynantemartinez.com/cycles-material-studies.html)
    * [Material Studies - Metal](https://hasenjager.cgsociety.org/zkgx/material-studies-met)
    * [Material Studies - Snow](https://hasenjager.cgsociety.org/w3p3/material-studies-sno)
    * [Material Studies - Minerals](https://www.behance.net/gallery/74271431/Material-Studies-Minerals)
    * [Decay in Unreal](https://www.artstation.com/artwork/q08rL)

???

Shader integration into p5

---
template: inverse

### The End of Day 2

## 🎨 🤹🏻‍ 💻 = 💙