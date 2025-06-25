import * as THREE from 'three';
import { MeshStandardMaterial } from 'three/webgpu';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,window.innerWidth/window.innerHeight,1,1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor('skyblue');
renderer.body.appendchild(renderer.domElement);

const geometry = new THREE.BoxGeometry
const material = new MeshStandardMaterial({color:'lightgreen'});
const cube = new THREE.Mesh(cube);

const light = new THREE.DirectionalLight('white',1);
light.position.set(1,1,2)
const ambient = new THREE.AmbientLight(white,0.75)

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);    
}

scene.add(cube);
scene.add(light);
scene.add(ambient);

animate();