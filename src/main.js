//threejs library
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { HemisphereLightHelper } from 'three/webgpu';

//declaration
const aspect = window.innerWidth/window.innerHeight;
const zoom = 5;
const shape = new THREE.Shape();
const width = 3.5;
const height = 6;
const radius = 0.2;

// Init
RectAreaLightUniformsLib.init();

//scene creation (its like a stage where all 3d, camera, light are within)
const scene = new THREE.Scene();

//camera creation (your eyes in 3d world)
const camera = new THREE.OrthographicCamera(
    -aspect * zoom, // left
    aspect * zoom,  // right
    zoom,           // top
    -zoom,          // bottom
    1.0,            //near clip (anything closer 1.0 is not rendered)
    1000            //far clip (anything farther 1000 is not rendered)
);

//moves camera 5 units away trom the center to see the id
camera.position.set(0,0,5);
//renderer creation (draws the scene into a canvas using WEBGL)
const renderer = new THREE.WebGLRenderer();
//make the canvas fill the whole browserwindow
renderer.setSize(window.innerWidth, window.innerHeight)
//set canvas background color
renderer.setClearColor('skyblue');
//adds the canvas into HTML<body>
document.body.appendChild(renderer.domElement);

// Start from top-left corner and draw a rounded rectangle
shape.moveTo(-width/2 + radius, height/2);
shape.lineTo(width/2 - radius, height/2);
shape.quadraticCurveTo(width/2, height/2, width/2, height/2 - radius);
shape.lineTo(width/2, -height/2 + radius);
shape.quadraticCurveTo(width/2, -height/2, width/2 - radius, -height/2);
shape.lineTo(-width/2 + radius, -height/2);
shape.quadraticCurveTo(-width/2, -height/2, -width/2, -height/2 + radius);
shape.lineTo(-width/2, height/2 - radius);
shape.quadraticCurveTo(-width/2, height/2, -width/2 + radius, height/2);

// Extrude it into 3D
const extrudeSettings = {
  depth: 0.05,
  bevelEnabled: false
};

//set up the object (w,h,d)
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

//add look/surface
const material = new THREE.MeshStandardMaterial({
    color:'white', 
    metalness: 0.1,      // 0 - non metal, 1 - full metal
    roughness: 0,        // 0 - super shinny, 1- very rough
    clearcoat: 1    
});

//combines geometry and material into a visible 3d obj called mesh
const id = new THREE.Mesh(geometry, material);
id.position.set(5,0,0);
id.rotation.set(0,0,0.1)

//set up lighting
const light = new THREE.RectAreaLight('white',5,50,1);
light.position.set(0,-4,5);
light.lookAt(0,0,0);

//ambient light
const ambient = new THREE.AmbientLight('skyblue',0.3);

// Hemisphere light: simulates light from the sky and ground
const hemiLight = new THREE.HemisphereLight('violet', 'darkblue', 2);

const lightHelper = new RectAreaLightHelper(light);
const hemiLightHelper = new HemisphereLightHelper(hemiLight);

//animation (loop)
function animate() {
    //creates loop every 60 times per second
    requestAnimationFrame(animate);
    //every frame it rotates a little so its spins    
    id.rotation.y += 0.01;
    light.rotation.z += 0.01
    //tells the renderer to draw current view from camera's pov
    renderer.render(scene, camera);
}

scene.add(id);    //add id to the scene
scene.add(light)    //add lighting
scene.add(ambient)  //add ambient lighting
scene.add(hemiLight);


//helpers
// scene.add(lightHelper);
// scene.add(hemiLightHelper);
    
animate();         //starts animation