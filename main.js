import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const maxRot = Math.PI / 10;

//Make renderer
const canvas = document.getElementById('backCanvas');
const renderer = new THREE.WebGLRenderer({canvas : canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//Make scene and camera + ability to orbit around 0 0 0
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);

const orbit = new THREE.Object3D();
orbit.position.y = 1;
orbit.rotation.order = "YXZ";
scene.add(orbit);

camera.position.z = 20;
orbit.add(camera);

//Load 3d model from file
const loader = new GLTFLoader();
loader.load(
    'data/SoA1-0.glb',
    function(gltf) {
        scene.add(gltf.scene);
        /* Might do stuff might not \_o^o_/
        gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
        */
    },
    function(xhr) {
        //Check loading progress
        console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function(error) {
        console.log('ERROR');
    }
);

document.addEventListener('mousemove', function(e){
    let scale = -0.002;
    if(orbit.rotation.y >= -maxRot && orbit.rotation.y <= maxRot) {
        orbit.rotateY( e.movementX * scale );
    }
    else {
        if(orbit.rotation.y > 0) {
            orbit.rotation.y = maxRot;
        }
        else {
            orbit.rotation.y = -maxRot;
        }
    }
    if(orbit.rotation.x >= -maxRot && orbit.rotation.x <= maxRot) {
        orbit.rotateX( e.movementY * scale );
    }
    else {
        if(orbit.rotation.x > 0) {
            orbit.rotation.x = maxRot;
        }
        else {
            orbit.rotation.x = -maxRot;
        }
    }
    console.log(maxRot);
    orbit.rotation.z = 0;
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//Begin
animate();