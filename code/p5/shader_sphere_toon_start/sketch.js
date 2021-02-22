// let's not use this for setting up the color values in setup
// "use strict";

let shaders;

// DIRECTIVE SWITCHES
let CUSTOM_SHADER_ON = 1;
let OBJ = 0;

// These only works without shaders on
// Lights
let DIR_LIGHTS = 1;
let SPECULAR_ON = 1; // DIR_LIGHTS must be on
let SECOND_DIR_LIGHT = 0;

let CANVAS_SIZE = 768;

// VALUES TO SET IN SETUP
let LIGHT_COLOR_AMBIENT;
let LIGHT_COLOR_DIFF;
let LIGHT_COLOR_DIFF_OPPOSITE;
let LIGHT_COLOR_SPEC;
let LIGHT_COLOR_SPEC_OPPOSITE;
let MATERIAL_DIFF;
let MATERIAL_SPEC;
let MATERIAL_SHINE;

let obj;

function preload()
{
    obj = loadModel('./duck.obj');

    // 1. vertex and fragment shaders need to be passed over
    shaders = loadShader('sphere_all.vert', 'sphere_toon.frag');
}

function setup() 
{
    // GLOBAL COLOR SETTINGS
    LIGHT_COLOR_AMBIENT = color(40, 40, 0);

    LIGHT_COLOR_DIFF = color(200, 200, 0);
    LIGHT_COLOR_DIFF_OPPOSITE = color(200, 0, 0);

    LIGHT_COLOR_SPEC = color(200, 200, 0);
    // LIGHT_COLOR_SPEC = color(200, 200, 0);
    LIGHT_COLOR_SPEC_OPPOSITE = color(0, 200, 0);

    // White material
    MATERIAL_DIFF = color(200, 0, 185);
    // MATERIAL_DIFF = color(41, 128, 185);
    MATERIAL_SPEC = color(255, 255, 0);
    MATERIAL_SHINE = 8;

    // Regular setup stuff
    createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
    background(50);
    noStroke();
    smooth();

    if(CUSTOM_SHADER_ON)
    {
    // 2. Overwrite default shading functionality
    // with the loaded custom shaders
        shader(shaders);
    }
}

function draw() 
{
    background(50);

    // VIEW
    // camera with its default values
    camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);

    // ModelView Matrix
    // To check correct coordinate transforms
    // translate(-200, -200, 0);
    

    // LIGHTING
    // Used to fake global illumination effects
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

        // Directional light with a diffuse color and a direction
        directionalLight(LIGHT_COLOR_DIFF, light_dir_x, light_dir_y, -0.2);
        if (SECOND_DIR_LIGHT)
        {
            specularColor(LIGHT_COLOR_SPEC_OPPOSITE);
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
    if(OBJ)
    {
        // OBJ
        scale(-280);
        translate(0, -0.5, 0);
        rotateY(2);
        // rotateX(frameCount * 0.01);
        // rotateY(frameCount * 0.01);
        model(obj);
    }
    else
    {
        sphere(CANVAS_SIZE * 0.25, 24, 24);
    }
}
