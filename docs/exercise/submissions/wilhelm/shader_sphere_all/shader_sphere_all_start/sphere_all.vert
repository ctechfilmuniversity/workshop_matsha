uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

const int LIGHTS_NUMBER_MAX = 5;
uniform int uAmbientLightCount;
uniform vec3 uAmbientColor[LIGHTS_NUMBER_MAX];

attribute vec3 aPosition;
attribute vec3 aNormal;

varying vec3 v_normal;
varying vec3 v_pos_view;
varying vec3 v_light_color_ambient;

void main()
{

  // VERTS & VIEW
  // Object space -> Camera space (view frustum)
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  v_pos_view = viewModelPosition.xyz;
  // Camera space -> Clip space
  gl_Position = uProjectionMatrix * viewModelPosition;

  v_normal = normalize(uNormalMatrix * aNormal);


  v_light_color_ambient = vec3(0.0);
  for (int i = 0; i < LIGHTS_NUMBER_MAX; i++)
  {
      if (i < uAmbientLightCount) 
      {
          v_light_color_ambient += uAmbientColor[i];
      }
  }

}