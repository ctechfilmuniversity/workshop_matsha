## Setting Up Your Own Shaders

### TODO 1

Create empty `sphere_shader.vert`, `sphere_shader.frag` files.


### TODO 2

```js
// Pass vertex and fragment shaders to engine
shaders = loadShader('sphere_all.vert', 'sphere_all.frag');
```

### TODO 3

```js
// Activate shader to
// overwrite default shading functionality
// with the loaded custom shaders
shader(shaders);
```

## A Basic Shader Pipeline - VERTEX Shader

### TODO 4

Add uniforms and attributes to vertex shader

```glsl
// sphere_all.vert


// TODO 4
// UNIFORMS
// Per-primitive parameters (constant during an entire draw call)
// Defined by the render engine
// Can be used in both, vertex and fragment shaders
// Read-only
// p5: https://github.com/processing/p5.js/blob/1b13b400fcbe2e6c6290262fcf06425dbf4efcf5/contributor_docs/webgl_mode_architecture.md
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

// ATTRIBUTES
// Per-vertex parameters (typically : positions, normals, colors, UVs, ...)
// Defined by the render engine
// Can only be used in vertex shaders
// Read-only
attribute vec3 aPosition;
attribute vec3 aNormal;

// LIGHTS
uniform int uAmbientLightCount;
uniform vec3 uAmbientColor[8];

// VARYINGS
// Per-fragment (or per-pixel) parameters, varying from fragment to fragment
// Custom definition
// Available for writing in the vertex shader, and read-only in a fragment shader
varying vec3 v_normal;
varying vec3 v_pos_view;
varying vec3 v_light_color_ambient;
```

### TODO 5

Apply coordinate transformations and set position

```glsl
// sphere_all.vert

// TODO 5
void main()
{

    // VERTS & VIEW
    // Object space -> Camera space (view frustum)
    vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
    v_pos_view = viewModelPosition.xyz;
    // Camera space -> Clip space
    gl_Position = uProjectionMatrix * viewModelPosition;

    // TODO 10


    // TODO 8

}
```

## A Basic Shader Pipeline - FRAGMENT Shader

### TODO 6

Add uniforms and attributes to vertex shader

```glsl
// sphere_all.frag


// GL_ES: The Standard for Embedded Accelerated 3D Graphics
#ifdef GL_ES
    // Setting numbers to "medium" precision and range
    // Lower precision means faster rendering, but at the cost of quality
    precision mediump float;
    precision mediump int;
#endif

// UNIFORMS
// VIEW
uniform mat4 uViewMatrix;

// MATERIAL
uniform vec4 uMaterialColor;
uniform float uShininess;

// LIGHTS (directional)
uniform int uDirectionalLightCount;
uniform vec3 uLightingDirection[8];
uniform vec3 uDirectionalDiffuseColors[8];
uniform vec3 uDirectionalSpecularColors[8];
uniform bool uSpecular;

// VARYINGS
varying vec3 v_normal;
varying vec3 v_pos_view;
varying vec3 v_light_color_ambient;

// TODO 22

```

### TODO 7

```glsl
// sphere_all.frag

// TODO 7a
void main(void)
{
    // TODO 11


    // TODO 7b
    // vec4 assignment needed for correct display
    gl_FragColor = uMaterialColor;

    // TODO 9, 17, 21

}
```

## Ambient Lighting

### TODO 8

As you can see from the incoming uniforms, there can be more than one light.

Ambient light is constant an can be summed up in the vertex shader

```glsl
// sphere_all.vert

// TODO 8
// LIGHT
// The ambient color does not depend
// one the fragment
v_light_color_ambient = vec3(0.0);
for (int i = 0; i < 8; i++)
{
    if (i < uAmbientLightCount)
    {
        v_light_color_ambient += uAmbientColor[i];
    }
}
```

### TODO 9

```glsl
// sphere_all.frag

    // TODO 9, 17, 21
    gl_FragColor.rgb = gl_FragColor.rgb * v_light_color_ambient;
```

## Diffuse Lighting

We know that we potentially want to parse other component as well, and once again, we can see from the incoming uniforms, that there can be more than one light.

Let's build the following infrastructure:

* In main() we call `all_lights()`, which computes from all lights the diffuse and specular component.
* In `all_lights()` we iterater over all lights and add up the diffuse and specular components of all lights. We computet this by calling `one_light()` for each light.
* `one_light()` returns a `MaterialProperties` struct, consisting of a diffuse and specular component, depending on the chosen reflectance functions.


### TODO 10

First of all, now we need the normal, which we pass in the vertex to the fragment shader

```glsl
// sphere_all.vert

v_normal = normalize(uNormalMatrix * aNormal);
```

(Now, we are done with the vertex shader, nothing will change in it from here on.)


### TODO 11

Calling `all_lights()` in `main()`

```glsl
// sphere_all.frag

// TODO 11
vec3 diffuse;
vec3 specular;

all_lights(v_pos_view, v_normal, diffuse, specular);
```

### TODO 12a

Settting up `all_lights()` in `main()`

```glsl
// sphere_all.frag


// TODO 12a
// Sum up intensities from all lights
// The out parameter syntax is similar to (but not exactly like) pass-by-reference
void all_lights(
                vec3 pos_view,
                vec3 normal_vec,
                out vec3 total_diff,
                out vec3 total_spec
){

    vec3 normal = normalize(normal_vec);
    // Flipping dir so that view vector
    // points from point to camera
    vec3 view_dir = normalize(-pos_view);

    total_diff = vec3(0.0);
    total_spec = vec3(0.0);

    // TODO 12b

}
```


### TODO 12b

Iterating in `all_lights()` over all lights

```glsl
// sphere_all.frag

    // TODO 12
    // We can not use uDirectionalLightCount directly in the
    // loop definition as it is non-constant
    for (int j = 0; j < 8; j++)
    {
        if (j < uDirectionalLightCount)
        {
            // World-space -> Camera space as direction (hom. coord set to 0)
            vec3 light_dir = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;

            // TODO 15

            vec3 light_color_diff = uDirectionalDiffuseColors[j];

            // TODO 16

            // TODO 20

        }
        // The above would be needed to be done for 
        // point- and spotlights as well
        // Execerise: Include point lights
    }

```

### TODO 13

Computing the diffuse shading properties from one light in `one_light()`

```glsl
// TODO 13a
struct MaterialProperties
{
    float diffuse;
    float specular;
};

// TODO 13b
// Compute the material properties for one light
MaterialProperties one_light(
                    vec3 view_dir, 
                    vec3 normal, 
                    vec3 light_vector
){
    vec3 light_dir = normalize(light_vector);

    //Compute diffuse and specular terms
    MaterialProperties mat;

    mat.diffuse = 1.0;
    mat.specular = 1.0;

    // TODO 19

    // TODO 14

    return mat;
}
```


### TODO 14a

Computing a Lambert reflection

```glsl
// sphere_all.frag

// TODO 14a
float diff_lambert(
                    vec3 light_dir, 
                    vec3 normal
){
    return max(0.0, dot(-light_dir, normal));
}
```

### TODO 14b

Call that function in `one_light()`

```glsl
// sphere_all.frag

    // TODO 14b
    mat.diffuse = diff_lambert(light_dir, normal);
```

### TODO 15

Call the `one_light()` function in `all_lights()`

```glsl
// sphere_all.frag

    // TODO 15
    MaterialProperties mat = one_light(view_dir, normal, light_dir);
```

### TODO 16

Multiply the diffuse value to the diffuse color of that light

```glsl
// sphere_all.frag

// TODO 16
total_diff += mat.diffuse * light_color_diff;
```

### TODO 17

Add the diffuse component to the final fragment color computation

```glsl
// sphere_all.frag

    // TODO 9, 17, 21
    gl_FragColor.rgb = gl_FragColor.rgb * 
                       (v_light_color_ambient + diffuse);
```

## Specular Lighting

Now, we pretty much do the same steps for the specular component, but change the computation of the reflection

### TODO 18

Computing a specular reflection

```glsl
// sphere_all.frag

// TODO 18
float spec_phong(
                vec3 light_dir,
                vec3 view_dir,
                vec3 normal,
                float shininess
){
      vec3 R = reflect(light_dir, normal);
      return pow(max(0.0, dot(R, view_dir)), shininess);
}
```


### TODO 19

Computing the specular shading properties from one light in `one_light()`

```glsl
// sphere_all.frag

    // 19
    if (uSpecular)
    {
        mat.specular = spec_phong(light_dir, view_dir, normal, uShininess);
    }
```

### TODO 20

Multiply the specular value to the specular color of that light

```glsl
// sphere_all.frag

// TODO 20
vec3 light_color_spec = uDirectionalSpecularColors[j];
total_spec += mat.specular * light_color_spec; 
```

### TODO 21

Add the specular component to the final fragment color computation

```glsl
// sphere_all.frag

    // TODO 9, 17, 21
    gl_FragColor.rgb = gl_FragColor.rgb * 
                       (v_light_color_ambient + diffuse + specular);
```

## Phong Modell

The Phong model comes with constant factors for the diffuse and spec components, which p5 also employs

### TODO 22

Defining the constants

```glsl
// sphere_all.frag

// TODO 22
// CONSTANTS
// const float c_factor_spec = 2.0;
// const float c_factor_diff = 0.73;
const float c_factor_spec = 1.0;
const float c_factor_diff = 1.0;
```

### TODO 23

Multiplying the constants

```glsl
// sphere_all.frag

    // TODO 23
    // Constant factors (Phong)
    total_diff *= c_factor_diff;
    total_spec *= c_factor_spec;
```

-------

Now we are experts as this is pretty much the same implementation as p5 is using under the hood (or is p5 here just embarrassingly simple?)...