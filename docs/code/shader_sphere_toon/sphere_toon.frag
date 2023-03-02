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


// TODO 2b


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

    // TODO 1c

    for (int j = 0; j < 8; j++)
    {
        if (j < uDirectionalLightCount)
        {
            // World-space -> Camera space as direction (hom. coord set to 0)
            vec3 light_dir_vector = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;
            vec3 light_dir = normalize(light_dir_vector);

            // TODO 2a

            
            // TODO 2c

            // TODO 4a



            // TODO 4b

        }
    }

    // TODO 3

}

void main(void) 
{
    vec3 toon_shading;
    
    // TODO 1a


    // TODO 1b


    gl_FragColor = vec4(1.0);
}




