name: inverse
layout: true
class: center, middle, inverse
---

**Materials and Shading Workshop - Winter Term 19/20**

Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de | Film University Babelsberg *KONRAD WOLF*

Friday, February 15th, 10.00-18.00, Room 2.044, House 7


---



## Today


* A closer look onto fragment shaders
* How to work with Shadertoy examples
* 3D Scene Rendering with Ray Tracing
* Explore ideas on what to do with shading and shader

The focus of today will be more on hands-on, explorative exercises.

## Learning Objectives

* Understand the the fragment shader
* Understand different shader implementations and do some of your own
    1. Understand an example
    2. Adjust an example
    3. (Build your own from scratch)
* Explore ideas on what to do with them


## The Shader Pipeline

<img src="../img/shader_pipeline_vert.png" alt="shader_pipeline_vert" style="width:105%;">


<img src="../img/shader_pipeline_frag.png" alt="shader_pipeline_frag" style="width:100%;">


The fragment shader is the OpenGL pipeline stage after a primitive is rasterized.  

<img src="../img/pipeline.png" alt="pipeline" style="width:90%;">

* The 3D engine / host program fills OpenGL-managed memory buffers with arrays of vertices
* These vertices are projected into screen space, assembled into triangles, and rasterized into pixel-sized fragments. 
* Finally, the fragments are assigned color values and drawn to the framebuffer. 

[[Evas GL Programming Guide]](https://www.enlightenment.org/playground/evas-gl.md)


---

## The Fragment Shader

The rasterization step takes each triangle from the triangle assembly, clips it and discards the parts located outside of the screen.  

The remaining visible parts are then broken into pixel-sized fragments.  

The vertex shader's varying outputs are also interpolated across the rasterized surface of each triangle, assigning a smooth gradient of values to each fragment.  

<img src="../img/interpolation.png" alt="interpolation" style="width:50%;">

If the vertex shader assigns a color value to each vertex, for instance, the rasterizer will blend those colors across the pixelated surface.


[[Evas GL Programming Guide]](https://www.enlightenment.org/playground/evas-gl.md)


Keep in mind that Shaders are mini-programmes compiled to run on the GPU.  


The GPU has lots of processors and each rendering stage is or can be split into many separate calculations, for example to compute each fragment.

<img src="../img/gpu_fragments.png" alt="gpu_fragments" style="width:100%;">


This means that we compute the rendering in parallel - which makes it much faster than doing it with a CPU-based software renderer where we only have 1-8 processors.


[[Anton Gerdelan]](http://antongerdelan.net/opengl/shaders.html)


## Shader Language


OpenGL shaders are written in the OpenGL Shading Language (GLSL), which has a syntax based on the C programming language.  

OpenGL and GLSL have and are constantly evolving. It is crucial to be clear about the version you are using.  

For example OpenGL 3.2 added a new type of shader: geometry shaders, and version 4.0 added tessellation control and tessellation evaluation shaders.  

For professional programs the first line in a GLSL shader indicates a version tag, e.g.

```glsl
#version 400
```

[[Wikipedia]](https://en.wikipedia.org/wiki/OpenGL_Shading_Language)


## WebGL

WebGL (Web Graphics Library) is a JavaScript API for GPU rendering.  

WebGL programs consist of control code written in JavaScript and shader code that is written in OpenGL ES Shading Language (ESSL).  


OpenGL ES (Embedded Systems) is a cut down version of the full OpenGL specification aimed at mobile devices.  

WebGL (Web Graphics Library) is a JavaScript API for GPU rendering.  

WebGL programs consist of control code written in JavaScript and shader code that is written in OpenGL ES Shading Language (ESSL).  

OpenGL ES (Embedded Systems) is a cut down version of the full OpenGL specification aimed at mobile devices.  

<img src="../img/webgl.png" alt="webgl" style="width:60%;">


As the usage of pure WebGL is quite tedious, 'helper' frameworks are tremendously popular, as for example Shader Toy.

[A collection of WebGL frameworks and libraries](https://gist.github.com/dmnsgn/76878ba6903cf15789b712464875cfdc)  


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

## Shader Development

Many frameworks, such as ShaderToy, solely focus on fragment shaders.

These frameworks have no connection to a 3D scene or engine and start as an empty 2D canvas.

Often times they explore how to build a 3D scene or better engine 'inside' of the fragment shader.

Environments to develop (fragment) shaders differ in details and you can not transfer code from one to the other without adjustments (remember all the code from the triangle example)?

The required adjustments range from renaming variables to the access to different shaders which might make a transfer simply impossible.


When choosing a framework or code examples, the most important aspects to look out for:

* The WebGL1 vs WebGL2 version
    * WebGL2 is a pretty significant upgrade from WebGL1
        * WebGL2 is almost backward compatible with WebGL1
        * Frameworks might not be however
* GLSL 3.00 ES vs. GLSL 1.00
    * For WebGL2 you should also upgrade to GLSL 3 ES (but don't have to)
    * `#version 300 es` MUST BE THE FIRST LINE in the shader
    * These two versions are not compatible at all!
* Which other shaders are used?
    * E.g. the geometry shader becomes more and more popular as it offers great performance improvements
* What comes from the core engine?
    * Uniforms, attributes etc.


## Shader Development Frameworks


* [p5](https://p5js.org/reference/)
* [glsl-canvas](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)
    * (if you are using vscode)
    * [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas)
    * From the [Book of Shaders](https://thebookofshaders.com/)
* [Shadertoy](https://www.shadertoy.com/)
    * Countless examples with a great variety
    * Author expertise range from noobs to master of the shader universe
    * Usually some what quality checked
* Runner up: [Shaderoo](https://shaderoo.org/?cmd=browse)
    * Incredible examples, mainly from one author
    * Offers geometry shaders, hence your context must enable them also
    * Best solution when performance is crucial
* Your own JS environment
    * Full control
    * You will need to learn WebGL

## Shader Development Frameworks - Pros and Cons

* [p5](https://p5js.org/reference/)
    * WebGL 1 only
    * Webcam
    * Your own buffer management
* [glsl-canvas](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)
    * WebGL 1 & 2
    * Data configuration from `.code-workspace`
        * Textures, custom uniforms
    * No WebCam (as far as I know)
    * Simple buffer management
* [Shadertoy](https://www.shadertoy.com/)
    * WebGL 2
        * Most WebGL 1 code will work ([WebGL 2.0 vs WebGL 1.0](https://shadertoyunofficial.wordpress.com/2017/02/16/webgl-2-0-vs-webgl-1-0/))
    * Test environment only
    * (Too?) handy and comfortable
* [Shaderoo](https://shaderoo.org/?cmd=browse)
    * Test environment only
    * Offers geometry shaders, hence your context must enable them also
    * Best solution when performance is crucial


Know for what you are going to use the shader and work in best suitable environment from the start!



## Getting Out Of ShaderToy

Most likely, input uniforms and attributes are named differently in different contexts. 

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


Don't forget to bring in all the uniforms you need. E.g.

```glsl
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
```

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


To make your life easier, you could use define statements to rename uniforms and keywords:

```glsl
#define fragColor gl_FragColor
#define fragCoord gl_FragCoord
#define iResolution u_resolution
#define iTime u_time
#define iMouse u_mouse
```


Problems could come from:

* Input channels (understand them in before you start)
* Noise functions
    * Great resource: [GLSL Noise Algorithms](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)
* Buffer

How to approach all these scary looking shaders?


Goal: Try to find the overall *gist* of the shader.


Divide and conquer!
* Test different values for constants and defines
* Separate functionalities, e.g. turn of animation, sound, interaction etc.
* Go line by line and display each line separately
* Take out scaling factors, offsets, etc.



## Hands-On

Understand a shader of your choice!

* Chose a shader from shader toy and make it in a different environment work
    * glsl-canvas, p5, ?
* Go through the shader and figure out all steps as well as possible
    * Comment the code

Afterwards show us your work.


Some example I like:

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



## 3D Scene Rendering

For rendering, we need to convert a 3D scene representation into a 2D raster. 

<img src="../img/frustum.png" alt="frustum" style="width:70%;">

There are several rendering algorithms to do so in countless flavors. 

Physically-based rendering is so-called *ray tracing* and its physical foundations are

* Light is emitted by light sources
* Transported through the scene by reflection at surfaces
* Ends up in the eye

<img src="../img/raytracing_01.png" alt="raytracing_01" style="width:40%;">

Light transport is reversible with respect to time and we can trace the light rays backwards, starting in the eye, ending in the light source.


<img src="../img/raytracing_02.png" alt="raytracing_02" style="width:40%;">

Advantage: We are interested only in the light that hits the eye, anyways!


<img src="../img/raytracing_02.png" alt="raytracing_02" style="width:40%;">

For every point on the image plane,

* cast a ray from the eye into the scene,
* determine color and brightness of the light traveling to the eye and
* store it in the image.


<img src="../img/raytracing_04.png" alt="raytracing_04" style="width:100%;">


## Let's Implement This!

## 👩🏽‍💻🧑🏻‍💻

## 3D Scene Rendering

We are going to implement a simple GPU ray-tracer in our fragment shader. 

Keep in mind that this is one of these topics where **there are worlds, or better universes, between the *basic* algorithm and *making it look good*** on a professional or production level.


A better implementation is possible, as for example demonstrated here: http://madebyevan.com/webgl-path-tracing/  

In case you want to follow up with this topic, I recommend to continue with these better (but more complicated) implementations: https://www.shadertoy.com/view/Xds3zN https://www.shadertoy.com/view/lsyyWG  

Or, a C++ one in 99 lines: http://www.kevinbeason.com/smallpt/#moreinfo 😁

## Hands-On

Adjust a shader of your choice!

* Chose a shader and try to understand it as much as possible
* Write down what you would like to change it
* Try to make that happen

OR

* See what happens with the principle of *emergence*.

Afterwards show us your work.

## Brainstorming 

Imagine a project requirement is to work with shading (e.g. you got founding of the Shading Appreciation Society).  


Which ideas do you have for the application of shaders and shading?


### More on Materials

* [Physically based shading references, at the end of 2019](http://lousodrome.net/blog/light/2020/01/04/physically-based-rendering-references-at-the-end-of-2019/)
* [Physically Based Rendering Algorithms: A Comprehensive Study In Unity3D](https://www.jordanstevenstechart.com/physically-based-rendering)
* Material Studies
    * [Cycles Material Studies](http://www.reynantemartinez.com/cycles-material-studies.html)
    * [Material Studies - Metal](https://hasenjager.cgsociety.org/zkgx/material-studies-met)
    * [Material Studies - Snow](https://hasenjager.cgsociety.org/w3p3/material-studies-sno)
    * [Material Studies - Minerals](https://www.behance.net/gallery/74271431/Material-Studies-Minerals)
    * [Decay in Unreal](https://www.artstation.com/artwork/q08rL)

---

### The End of Day 2

## 🎨 🤹🏻‍ 💻 = 💙