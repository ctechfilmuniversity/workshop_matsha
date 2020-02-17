# Implementation of a (*Very*) Simple Raytracer

## TODO 1

Infrastructure

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// Ray-Tracing: For each pixel, shoot a ray from the camera through each fragement. If the ray collides with geometry in the scene, create new rays for reflection and refraction and follow that ray. The number of bounces you follow determines the quality of your global illumination effects.
// This code is based on: https://www.tinycranes.com/blog/2015/05/annotated-realtime-raytracing/


// TODO 2

// TOD0 4

// TODO 3c

// TODO 6a

// TODO 3b


void main() 
{
    // Scale fragment coordinate to range between 0..1
    // within the canvas and move the origin to the center
    vec2 uv = gl_FragCoord.xy / u_resolution.xy - vec2(0.5);
    uv.x *= u_resolution.x / u_resolution.y;

    const vec3 camera_position = vec3(0.0, 2.5, 12.0);

    // TODO 3a

}

```

## TODO 2

The needed data structures

```glsl
//---------------------------------------
// DATA 
//---------------------------------------

// GLOBAL CONSTANTS
//---------------------------------------


// Due to floating point precision errors, intersection points might 
// just be slightly *under* the surface. 
// The subsequent reflection ray would then bounce off the *inside* wall of the
// surface. This is known as self-intersection.
// It is therefore common to add an offset epsilon to move 
// an interserction point outward.
const float EPSILON = 1e-3;



// This is also often called 'iteration depth'
const int BOUNCES = 16;
// On a Side Note: CPU ray tracing algorithm are usually recursive. However, GLSL does not
// support recursion, so we need to iterate over all ray bounces.


// Values for tone mapping
// (to approximate with our very limited range 
// the appearance of high-dynamic-range images)
const float EXPOSURE = 1e-2;
const float GAMMA = 2.2;

// SCENE ELEMENTS
//---------------------------------------

// LIGHTS
struct LightDirectional 
{
    vec3 color;
    vec3 direction;
};

const float LIGHT_AMBIENT_INTESITY = 100.0;

// Divison with GAMMA here?
const vec3 SKY = vec3(0.3, 0.4, 0.5) * LIGHT_AMBIENT_INTESITY;


// SHADING

struct Material 
{
    vec3 color;
    float diffuse;
    float specular;
};

// GEOMETRY

struct Sphere 
{
    float radius;
    vec3 position;
    Material material;
};

// The floor has a fixed position  at the origin 
struct Plane 
{
    vec3 normal;
    Material material;
};

// HELPER
//---------------------------------------

// The ray we are shooting from the camera into the scene 
struct Ray 
{
    vec3 origin;
    vec3 direction;
};

// For an ray-surface intersection point, we need to store
// * the distance along the ray
// * the surface normal (for bouncing the next ray)
// * for shading.
struct IntersectionData 
{
    float distance;
    vec3 normal;
    Material material;
};



//---------------------------------------
// SCENE SETUP 
//---------------------------------------


// For a Static Light
LightDirectional light = LightDirectional(vec3(1.0) * LIGHT_AMBIENT_INTESITY, 
                                            normalize(vec3(-1.0, 0.75, 1.0)));

// For a Rotating Light
// LightDirectional light = LightDirectional(vec3(1.0) * LIGHT_AMBIENT_INTESITY, 
//                                             normalize(vec3(-1.0 + 4.0 * cos(u_time), 4.75,
//                                             1.0 + 4.0 * sin(u_time))));


```


## TODO 3

The ray-tracing logic

```glsl
// TODO 3a
// For each fragment, create a ray at the fixed camera position and
// shoot 'through' the coordinates of the current fragment.
Ray ray = Ray(camera_position, normalize(vec3(uv.x, uv.y, -1.0)));
vec3 shading = raytracer(ray);

// Linear gamma correction
// https://www.shadertoy.com/view/lslGzl
gl_FragColor = vec4(pow(shading * EXPOSURE, vec3(1.0 / GAMMA)), 1.0);
```

```glsl
// TODO 3b
// The raytracer() computes the radiance at a hit surface point.
// We start the first ray, shot from the camera, and then follow its
// bounces through the scene as often as defined by the BOUNCES constant.
// The intersection data from each hit is added up.
vec3 raytracer(Ray ray) 
{
    vec3 color = vec3(0.0);
    // Determines the fraction of the reflected light 
    // in the current ray with respect to the original
    // 'how much is left?'
    vec3 attenuation = vec3(1.0);
    
    // Factor which describes the attenuation behavior
    vec3 fresnel = vec3(0.0);

    for (int i = 0; i <= BOUNCES; ++i) 
    {
        
        IntersectionData hit = intersectScene(ray);
        if(surfaceIntersection(hit))
        {

            // TODO 6b
           

            // New bounce (reflection ray)
            // This is the most severe over-simplification in this implementation.
            // By always following the reflection vector, we can only create a
            // shiney-ish, e.g. metallic surface - no matter what.
            // We should chose different refelction vector directions to follow
            // such as random directions for a diffuse surface.
            // https://en.wikipedia.org/wiki/Path_tracing
            
            ray = Ray(hit_position + EPSILON * reflection, reflection);
        } 
        // If we didn't intersect an object, the ray goes into the sky.
        else
        {
            // We add the skylight with whatever is left from
            // the radinace in attenuation
            color += attenuation * SKY; 

            break; // we did hit the sky, no further bounces
        }
    }
    return color;
}
```


```glsl
// TODO 3c
// Check the given ray for intersections with the scene geometry.
IntersectionData intersectScene(Ray ray) 
{
    // SCENE SETUP
    // The scene geometry is integrated into the function
    // as there are no global arrays in GLSL possible.
    // In a 'real' scenario, the scene data might come from a scene
    // engine such as p5 or should be defined as 
    // distance functions, which gives better quality
    // (http://iquilezles.org/www/articles/distfunctions/distfunctions.htm)

    Plane groundplane = Plane(vec3(0.0, 1.0, 0.0), Material(vec3(0.3608, 0.0, 0.2902), 1.0, 0.0));
    
    const int spheres_num = 3;
    Sphere spheres[spheres_num];

    // radius, position, material
    // Keep in mind that the z-value is relevant for
    // the intersection computation later!
    spheres[0] = Sphere(5.0, 
                        // vec3( 3.0 + cos(u_time), 5.0, -8.0), // animated
                        vec3(3.0, 5.0, -8.0),
                        Material(vec3(1.0, 0.6, 0.0), 1.0, 0.0)
                        );
    spheres[1] = Sphere(2.0, 
                        // vec3(-3.0, 4.0 + sin(u_time), -2), // animated
                        vec3(-3.0, 2.0, -2.0),
                        Material(vec3(1.0, 0.8, 0.2), 1.0, 0.001)
                        );
    spheres[2] = Sphere(1.0, 
                        vec3(0.0, 1.0, 2.0),
                        Material(vec3(0.8, 0.2, 0.0), 0.5, 0.25));


    // TODO 5

}

```



## TODO 4

We need to compute all kinds of intersections, for this we define helper functions.

```glsl
// TOD0 4
//---------------------------------------
// FUNCTIONS
//---------------------------------------

// HELPER
//---------------------------------------


// QUICK & DIRTY... but does the trick
// GLSL does not support dynamic return values, hence we can not simply
// return false, if the ray does not hit a surface. Instead, we 
// set the intersection data to zero values (as I said: quick and dirty...)
const IntersectionData NO_INTERSECTION = IntersectionData(0.0, vec3(0.0), 
                                                        Material(vec3(0.0), -1.0, -1.0));

// Check for valid intersection data
bool surfaceIntersection(IntersectionData hit)
{
    if (hit.material.diffuse > 0.0 || hit.material.specular > 0.0) return true;
    else return false;
}

// Ray-sphere intersection
// 1. Compute if the ray intersects the sphere
// (either hit or miss)
// http://en.wikipedia.org/wiki/Line-sphere_intersection
// 2. If yes, determine which of the two intersection points
// (the ray enters and exists the sphere) is the one closer
// to the camera, meaning the one 'in front' from which
// we want the surface properties for rendering.
IntersectionData intersect(Ray ray, Sphere sphere) 
{
    // Check for a Negative Square Root
    vec3 oc = sphere.position - ray.origin;
    float l = dot(ray.direction, oc);
    float det = pow(l, 2.0) - dot(oc, oc) + pow(sphere.radius, 2.0);
    if (det < 0.0) return NO_INTERSECTION;

    // Find the Closer of Two Solutions
    float len = l - sqrt(det);
    if (len < 0.0) len = l + sqrt(det);
    if (len < 0.0) return NO_INTERSECTION;
    return IntersectionData(len, (ray.origin + len*ray.direction - sphere.position) / sphere.radius, sphere.material);
}

// Ray-plane intersection
// http://en.wikipedia.org/wiki/Line-plane_intersection
// Only needed for reflection
IntersectionData intersect(Ray ray, Plane plane) 
{
    float len = -dot(ray.origin, plane.normal) / dot(ray.direction, plane.normal);
    if (len < 0.0) return NO_INTERSECTION;
    return IntersectionData(len, plane.normal, plane.material);
}
```

## TODO 5

Let's apply these functions in `intersectScene(Ray ray)`

```glsl
    // TODO 5
    // Computing the hits is sensitive to the actual z-order of the objects!
    // Here, we need to make sure that we first check the plane and then
    // go from objects in the back to the front.
    // This would usually be solved with a z-Buffer.
    IntersectionData intersection = NO_INTERSECTION;
    IntersectionData hit_plane = intersect(ray, groundplane);

    if(surfaceIntersection(hit_plane))
    { 
        intersection = hit_plane; 
    }

    for (int i = 0; i < spheres_num; i++) 
    {
        IntersectionData hit_sphere = intersect(ray, spheres[i]);
        if(surfaceIntersection(hit_sphere))
        {
            intersection = hit_sphere;
        }
    }
    return intersection;
```

## TODO 6

The computation of the collected color and attenuation along the bouncing rays.

## TODO 6a

Helper functions for the shading

```glsl

// TODO 6a
float reflection_diffuse(
                    vec3 light_dir, 
                    vec3 normal
){
    return clamp(dot(light_dir, normal), 0.0, 1.0);
}

// float reflection_specular(
//                 vec3 reflection_dir,
//                 vec3 view_dir,
//                 float shininess
// ){
//       return pow(max(0.0, dot(reflection_dir, view_dir)), shininess);
// }

// Schlick Approximation (https://en.wikipedia.org/wiki/Schlick%27s_approximation)
// for the Fresnel equation. The Fresnel equations describes the
// behavior of light as it moves between media with different
// indices of refraction.
// (https://en.wikipedia.org/wiki/Fresnel_equations)
vec3 schlick(IntersectionData hit, Ray ray) 
{
    vec3 fresnel = vec3(0.0);

    // F ≈ R0 + (1 - R0)(1 − cosθi)^5
    vec3 R0 = hit.material.color.rgb * (hit.material.specular + hit.material.diffuse);
    float hv = clamp(dot(hit.normal, -ray.direction), 0.0, 1.0);
    fresnel = R0 + (1.0 - R0) * pow(1.0 - hv, 5.0);
    return fresnel;
}
```

## TODO 6b

Bouncing around and computing crappy-looking shading with a fresnel term to reduce the intensity for each bounce.

```glsl
// TODO 6b
vec3 hit_position = ray.origin + hit.distance * ray.direction;

// Fresnel lets the light decrease with the
// bounces
fresnel = schlick(hit, ray);
attenuation *= fresnel;
vec3 reflection = reflect(ray.direction, hit.normal);

// Shadow ray
// Ray from the origin of the ray to the light 
// If there is no intersection, no object occludes the light falling
// onto the object and there is no shadow, otherwise there is a shadow and
// we simply do not collect any color
if(intersectScene(Ray(hit_position + EPSILON * light.direction, light.direction)) == NO_INTERSECTION) 
{
    // Diffuse
    // float lambert = reflection_diffuse(hit.normal, light.direction);
    // color += lambert * light.color * hit.material.color.rgb * hit.material.diffuse;
    // attenuation *= lambert* (1.0 - fresnel) * attenuation / fresnel;

    color += reflection_diffuse(hit.normal, light.direction) * light.color
            * hit.material.color.rgb * hit.material.diffuse
            * (1.0 - fresnel) * attenuation / fresnel;

    // Specular Reflection not yet working... :(
    // color += reflection_specular(reflection, light.direction, 10.0) * light.color
    //        * hit.material.color.rgb * hit.material.specular;
    //        * (1.0 - fresnel) * attenuation / fresnel;
}

```
