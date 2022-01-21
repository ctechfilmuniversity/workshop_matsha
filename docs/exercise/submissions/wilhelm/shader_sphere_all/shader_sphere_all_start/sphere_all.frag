#ifdef GL_ES
    // Setting numbers to "medium" precision and range
    // Lower precision means faster rendering, but at the cost of quality
    precision mediump float;
    precision mediump int;
#endif

uniform mat4 uViewMatrix;

// MATERIAL
uniform vec4 uMaterialColor;
uniform float uShininess;

// LIGHTS (directional)
const int LIGHTS_NUMBER_MAX = 5;
uniform int uDirectionalLightCount;
uniform vec3 uLightingDirection[LIGHTS_NUMBER_MAX];
uniform vec3 uDirectionalDiffuseColors[LIGHTS_NUMBER_MAX];
uniform vec3 uDirectionalSpecularColors[LIGHTS_NUMBER_MAX];
uniform bool uSpecular;


// VARYINGS
varying vec3 v_normal;
varying vec3 v_pos_view;
varying vec3 v_light_color_ambient;

const float c_factor_spec = 2.0;
const float c_factor_diff = 1.0;
// 18
float spec_phong(
  vec3 light_dir,
  vec3 view_dir,
  vec3 normal,
  float shininess
){
  vec3 R = reflect(light_dir, normal);
  return pow(max(0.0, dot(R, view_dir)), shininess);
}

float diff_lambert(
  vec3 light_dir, 
  vec3 normal
){
  return max(0.0, dot(-light_dir, normal));
}

struct MaterialProperties
{
  float diffuse;
  float specular;
};

// Compute the material properties for one light
MaterialProperties one_light(
  vec3 view_dir, 
  vec3 normal, 
  vec3 light_vector
){
    vec3 light_dir = normalize(light_vector);

    //Compute diffuse and specular terms
    MaterialProperties mat;

    mat.diffuse = .0;
    mat.specular = .0;

    // 19
    if (uSpecular)
    {
      mat.specular = spec_phong(light_dir, view_dir, normal, uShininess);
    }

    mat.diffuse = diff_lambert(light_dir, normal);

    return mat;
}
// TODO 13a

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
    // We can not use uDirectionalLightCount directly in the
    // loop definition as it is non-constant
    for (int j = 0; j < LIGHTS_NUMBER_MAX; j++)
    {
        if (j < uDirectionalLightCount)
        {
            // World-space -> Camera space as direction (hom. coord set to 0)
            vec3 light_dir = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;

            MaterialProperties mat = one_light(view_dir, normal, light_dir);

            vec3 light_color_diff = uDirectionalDiffuseColors[j];

            total_diff += mat.diffuse * light_color_diff;

            // 20
            vec3 light_color_spec = uDirectionalSpecularColors[j];
            total_spec += mat.specular * light_color_spec; 
            // OR (as p5 does it) 
            // total_spec += mat.specular * light_color_spec * light_color_diff; 

        }
        // The above would be needed to be done for 
        // point- and spotlights as well
        // Exercise: Include point lights
        // You can use p5's implementation as reference
        // https://github.com/processing/p5.js/blob/main/src/webgl/shaders/lighting.glsl
    }
    // TODO 23
}

// TODO 7a
void main(void)
{
    //  11
    vec3 diffuse;
    vec3 specular;

    all_lights(v_pos_view, v_normal, diffuse, specular);


    // TODO 7b
    // vec4 assignment needed for correct display
    gl_FragColor = uMaterialColor;

    gl_FragColor.rgb = gl_FragColor.rgb * 
      (v_light_color_ambient + diffuse + specular);

}