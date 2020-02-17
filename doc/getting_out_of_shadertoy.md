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

------

Don't forget to bring in all the uniforms you need. E.g.

```glsl
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
```

------

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

------

To make your life easier, you could use define statements to rename uniforms and keywords:

```glsl
#define fragColor gl_FragColor
#define fragCoord gl_FragCoord
#define iResolution u_resolution
#define iTime u_time
#define iMouse u_mouse
```

------

Problems could come from:

* Input channels (understand them in before you start)
* Noise functions
    * Great resource: [GLSL Noise Algorithms](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)
* Buffer



------

### How to approach all these scary looking shaders?

Goal: Try to find the overall *gist* of the shader.  

Divide and conquer!  

* Test different values for constants and defines
* Separate functionalities, e.g. turn of animation, sound, interaction etc.
* Go line by line and display each line separately
* Take out scaling factors, offsets, etc.

---

🧐