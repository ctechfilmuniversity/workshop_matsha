# Basic Toon Shading

## Let's load an obj model

```js
//sketch.js

let obj;
function preload()
{
    obj = loadModel('./duck.obj');

    ...
}
```

```js
//sketch.js

function draw() 
{
    ...

    // OBJ
    scale(-280);
    translate(0, -0.5, 0);
    rotateY(2);
    // rotateX(frameCount * 0.01);
    // rotateY(frameCount * 0.01);
    model(obj);
}
```

## The Toon Shading Model

As the toon shader does not differentiate much between the different light and and reflection properties, we start off with a simpler code frame.

*On a Side Note:* Eveything is done in the fragment shader `sphere_toon.frag`

### TODO 1: Flat Base Color

As base or 'ambient' color, we flat shade with the material diffuse color

```glsl

// TODO 1a
// 'Ambient' color is the material color
gl_FragColor = uMaterialColor;
```

```glsl
// TODO 1b
all_lights(v_pos_view, v_normal, toon_shading);
gl_FragColor.rgb = toon_shading.rgb;
```


```glsl
// TODO 1c
toon_shading = uMaterialColor.rgb;
```

### TODO 2: Step function for diffuse shading

First we compute the diffuse component as usual

```glsl
// TODO 2a
            float diffuse = max(0.0, dot(-light_dir, v_normal));
            //toon_shading = vec3(diffuse); // only for testing
```

The compute diffuse value has a range of 0..1. We can multiply this with the number of shading levels we want to create and use the `floor` function to create the steps. Then we transform the value back to a range of 0..1.

```glsl
// TODO 2b
const float LEVELS = 5.0;
const float SCALING = 1.0 / LEVELS;
```

```glsl
// TODO 2c
// Diffuse step function
toon_shading += uDirectionalSpecularColors[j] * floor(diffuse * LEVELS) * SCALING;
```

### TODO 3: Outline

For creating an outline-like as black line, we can compute and check the the angle between the view direction and the surface normal in the same way we as for the diffuse value for the angle between light direction and the surface normal. 

We want to draw an outline if the view direction and the surface normal are somewhat perpendicular to each other, meaning where their dot product is around 0.

As the outline only depends on the view, we do not need to compute it for each light separately.

```glsl
// TODO 3
// Outline
// Black color if dot product is smaller than 0.2
// else keep the same colors
float edge = (dot(view_dir, normal) > 0.2) ? 1.0 : 0.0;
toon_shading *= edge;
```

### TODO 4: Specular Highlight Dot

For this we clamp the specular reflection value

```glsl

// TODO 4a
// A Small Highlight
vec3 R = reflect(light_dir, normal);
float spec = pow(max(0.0, dot(R, view_dir)), uShininess);
float mask = (spec > 0.9) ? 0.8 : 0.0;
toon_shading += (spec * mask);
```

We can furthermore use the `spec` value to clamp an outline for the highlight if so desired

```glsl

// TODO 4b
// Outline for Highlight
// float edge = (spec > 0.88 && spec < 0.9) ? -1.0 : 1.0; // simply black
// toon_shading *= edge;
if (spec > 0.88 && spec < 0.9)
{
    toon_shading = uMaterialColor.rgb;
}
```

---

The End 👩🏼‍🎨