## Smooth Toon Shading

## 1. Getting the Angle

```glsl
void main(void) 
{

    gl_FragColor = uMaterialColor;

    vec3 normal = normalize(v_normal);
    vec3 view_dir = normalize(-v_pos_view);

    vec3 specular;
    all_lights_specular(view_dir, normal, specular);

    // 1. Angle view - normal
    float cos_view_normal = max(0.0, dot(view_dir, normal));
    // gl_FragColor.rgb = vec3(cos_view_normal);
}
```

## 2. Shaping The Rim

```glsl
void main(void) 
{
    ...

    // 1. Angle view - normal
    float cos_view_normal = max(0.0, dot(view_dir, normal));

    // 2. Shaping the rim
    float rim_width = 0.5;
    float rim = pow((1. - cos_view_normal), rim_width);

    // gl_FragColor.rgb = vec3(cos_view_normal);
    gl_FragColor.rgb = vec3(rim);
}
```

* https://graphtoy.com/
* Show x, x^2, X^0.5

## 3. Coloring The Rim

```glsl
void main(void) 
{
    ...

    // 1. Angle view - normal
    float cos_view_normal = max(0.0, dot(view_dir, normal));

    // 2. Shaping the rim
    float rim_width = 0.5;
    float rim = pow((1. - cos_view_normal), rim_width);

    // 3. Coloring the rim
    vec3 rim_color = vec3(1.0, 0.75, 0.0);
    rim_color *= rim;


    // gl_FragColor.rgb = vec3(cos_view_normal);
    // gl_FragColor.rgb = vec3(rim);
    gl_FragColor.rgb = rim_color;
}
```


## 4. Mixing Base Material And The Colored Rim

```glsl
void main(void) 
{
    ...

    // 1. Angle view - normal
    float cos_view_normal = max(0.0, dot(view_dir, normal));

    // 2. Shaping the rim
    float rim_width = 0.5;
    float rim = pow((1. - cos_view_normal), rim_width);

    // 3. Coloring the rim
    vec3 rim_color = vec3(1.0, 0.75, 0.0);
    rim_color *= rim;


    // gl_FragColor.rgb = vec3(cos_view_normal);
    // gl_FragColor.rgb = vec3(rim);
    //gl_FragColor.rgb = rim_color;

    // 4. Mixing base material and the colored rim
    gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_color, rim);
    // gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_color, rim) + specular;
}
```


## 5. Optional: A Second Color In The Rim

```glsl
void main(void) 
{
    ...

    // 1. Angle view - normal
    float cos_view_normal = max(0.0, dot(view_dir, normal));

    // 2. Shaping the rim
    float rim_width = 0.5;
    float rim = pow((1. - cos_view_normal), rim_width);

    // 3. Coloring the rim
    vec3 rim_color = vec3(1.0, 0.75, 0.0);
    rim_color *= rim;

    // 5. Optional: a second color in the rim
    // vec3 rim_glow_color =vec3(0.349, 0.0, 1.0);
    vec3 rim_glow_color = vec3(1.0);
    float rim_glow = pow((1. - cos_view_normal), rim_width * 4.);
    rim_glow_color *= rim_glow;

    vec3 rim_both_color = mix(rim_color, rim_glow_color, rim_glow);


    // gl_FragColor.rgb = vec3(cos_view_normal);
    // gl_FragColor.rgb = vec3(rim);
    //gl_FragColor.rgb = rim_color;

    // 4. Mixing base material and the colored rim
    // gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_color, rim);
    // gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_color, rim) + specular;

    // With a second rim color
    // gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_both_color, rim);
    gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_both_color, rim) + specular;
}
```
