// let's not use this for setting up the color values in setup
// "use strict";

let shaders;

// DIRECTIVE SWITCHES
// Only works, once we have the custom shaders
let CUSTOM_SHADER_ON = 0;

// These only works without shaders on
// Lights
let DIR_LIGHTS = 1;
let SPECULAR_ON = 1; // DIR_LIGHTS must be on
let SECOND_DIR_LIGHT =1; // the red light


let CANVAS_SIZE = 768;

// VALUES TO SET IN SETUP
let LIGHT_COLOR_AMBIENT;
let LIGHT_COLOR_DIFF;
let LIGHT_COLOR_SPEC;
let MATERIAL_DIFF;
let MATERIAL_SHINE;

function preload()
{
    // TODO 1
    // Create empty 'sphere_all.vert', 'sphere_all.frag' files
    
    // TODO 2
    // Pass vertex and fragment shaders to engine

}

function setup() 
{
    // GLOBAL COLOR SETTINGS
    LIGHT_COLOR_AMBIENT = color(40, 40, 0);

    LIGHT_COLOR_DIFF = color(200, 200, 0);
    LIGHT_COLOR_DIFF_OPPOSITE = color(200, 0, 0);

    LIGHT_COLOR_SPEC = color(50, 50, 50);

    // White material
    MATERIAL_DIFF = color(255);
    MATERIAL_SHINE = 8;

    // Regular setup stuff
    createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
    background(50);
    noStroke();
    smooth();

    if(CUSTOM_SHADER_ON)
    {
        // TODO 3
        // Activate shader to
        // overwrite default shading functionality
        // with the loaded custom shaders
    }
}

function draw() 
{
    background(50);

    // VIEW
    // Camera with its default values
    camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);

    // ModelView Matrix
    // For checking correct coordinate transforms
    // translate(-200, -200, 0);
    

    // LIGHTING
    // Used to fake global illumination effects
    // Intensity comes from the color value
    ambientLight(LIGHT_COLOR_AMBIENT);

    // Color of the specular highlight 
    // Only works in combination with a
    // specularMaterial and must be defined
    // before the lights
    specularColor(LIGHT_COLOR_SPEC);

    if(DIR_LIGHTS)
    {
        // For WebGL the origin is in the center of the canvas
        // The division by h, w puts the range to 0..1
        // The subtraction by 0.5 to -0.5..0.5
        // The multiplication by -2 (1.) to -1 (canvas top)..1 (canvas bottom) which is a 
        // standard space to define directions, and (2.) to switch
        // directions as the mouse should mimick the
        // source of the light from which the direction
        // goes towards the sphere
        let light_dir_y = ((mouseY / height) - 0.5) * -2;
        let light_dir_x = ((mouseX / width) - 0.5) * -2;

        // Directional light with a diffuse color and a flipped direction
        directionalLight(LIGHT_COLOR_DIFF, light_dir_x, light_dir_y, -0.2);

        if (SECOND_DIR_LIGHT)
        {
            directionalLight(LIGHT_COLOR_DIFF_OPPOSITE, -light_dir_x, -light_dir_y, -0.2);
        }
    }

    // MATERIALS
    // https://p5js.org/examples/3d-materials.html
    if(!SPECULAR_ON)
    {
        ambientMaterial(MATERIAL_DIFF);
        // same as
        // fill(MATERIAL_DIFF);
    }
    else
    {
        // Sets the amount of gloss in the surface of shapes
        // Only works in combination with a specularMaterial
        shininess(MATERIAL_SHINE);
        specularMaterial(MATERIAL_DIFF);
    }

    // GEOMETRY
    sphere(CANVAS_SIZE * 0.25, 24, 24);
}
