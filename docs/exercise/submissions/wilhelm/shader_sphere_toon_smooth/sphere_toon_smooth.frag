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




// Sum up intensities from all lights
// The out parameter syntax is similar to (but not exactly like) pass-by-reference
void all_lights_specular(
                vec3 view_dir,
                vec3 normal,
                out vec3 specular
){

    specular = vec3(0.);

    for (int j = 0; j < 8; j++)
    {
        if (j < uDirectionalLightCount)
        {
            // World-space -> Camera space as direction (hom. coord set to 0)
            vec3 light_dir_vector = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;
            vec3 light_dir = normalize(light_dir_vector);


            vec3 R = reflect(light_dir, normal);
            float spec = pow(max(0.0, dot(R, view_dir)), uShininess);
            specular += uDirectionalSpecularColors[j] * spec;
        }
    }
}



void main(void) 
{

    gl_FragColor = uMaterialColor;

    vec3 normal = normalize(v_normal);
    vec3 view_dir = normalize(-v_pos_view);

    vec3 specular;
    all_lights_specular(view_dir, normal, specular);

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


    
    // gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_both_color, rim) + specular;
    // gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_color, rim);
    // gl_FragColor.rgb = rim_color;
    // gl_FragColor.rgb = vec3(rim);
    // gl_FragColor.rgb = vec3(cos_view_normal);
    gl_FragColor.rgb = mix(uMaterialColor.rgb, rim_both_color, rim) + specular + specular;
}







