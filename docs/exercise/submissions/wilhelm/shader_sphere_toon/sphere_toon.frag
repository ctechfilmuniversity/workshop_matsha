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


// 2b
const float LEVELS = 5.0;
const float SCALING = 1.0 / LEVELS;

// Sum up intensities from all lights
// The out parameter syntax is similar to (but not exactly like) pass-by-reference
void all_lights(
                vec3 pos_view,
                vec3 normal_vec,
                out vec3 toon_shading
){

    vec3 normal = normalize(normal_vec);
    // Flipping dir so that view vector
    // points from point to camera
    vec3 view_dir = normalize(-pos_view);

    // 1c
    toon_shading = uMaterialColor.rgb;

    for (int j = 0; j < 8; j++)
    {
        if (j < uDirectionalLightCount)
        {
            // World-space -> Camera space as direction (hom. coord set to 0)
            vec3 light_dir_vector = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;
            vec3 light_dir = normalize(light_dir_vector);

            // 2a
            float diffuse = max(0.0, dot(-light_dir, v_normal));
            
            // 2c
            toon_shading += uDirectionalSpecularColors[j] * floor(diffuse * LEVELS) * SCALING;


            // 4a
            vec3 R = reflect(light_dir, normal);
            float spec = pow(max(0.0, dot(R, view_dir)), uShininess);
            float mask = (spec > 0.9) ? 0.8 : 0.0;
            toon_shading += (spec * mask);


            // 4b
            if (spec > 0.88 && spec < 0.9)
            {
                toon_shading = uMaterialColor.rgb;
            }
        }
    }

    // 3
    float edge = (dot(view_dir, normal) > 0.2) ? 1.0 : 0.0;
    toon_shading *= edge;
}

void main(void) 
{
    vec3 toon_shading;
    
    // 1a
    gl_FragColor = uMaterialColor;

    // 1b
    all_lights(v_pos_view, v_normal, toon_shading);
    gl_FragColor.rgb = toon_shading.rgb;

    //gl_FragColor = vec4(1.0);
}




