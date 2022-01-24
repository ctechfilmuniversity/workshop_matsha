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
    // MATERIAL
    // Needed for the material
    v_normal = normalize(uNormalMatrix * aNormal);

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
}
