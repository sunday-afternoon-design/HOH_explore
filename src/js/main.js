import '../scss/styles.scss'

import * as THREE from 'three'




/* -------------------------------------------------------------------------- */
/*                                 Basic Setup                                */
/* -------------------------------------------------------------------------- */
// image ratio
let imgRatio = 483 / 256;
// let isMobileDevice = isMobile(window.navigator).any;
let mouseX = 0,
    mouseY = 0;
let mouseOX = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let texture, material, mesh;

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5;

scene.add(camera)


window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/* -------------------------------------------------------------------------- */
/*                                 light setup                                */
/* -------------------------------------------------------------------------- */
// const light2 = new THREE.DirectionalLight(0xffffff, .95); // Color, Intensity
// const light3 = new THREE.DirectionalLight(0xffffff, .4); // Color, Intensity

// light2.position.set(0, 0, 2); // pointlight
// light3.position.set(-3, 0, 2); // pointlight
// const targetPosition2 = new THREE.Vector3(0.5, 0, 0);
// light2.target.position.copy(targetPosition2);
// const targetPosition3 = new THREE.Vector3(-2, 3, 0);
// light3.target.position.copy(targetPosition3);
// light2.castShadow = true; // Enable shadow casting
// light2.shadow.mapSize.width = 4096;
// light2.shadow.mapSize.height = 4096;
// scene.add(light2);
// scene.add(light3);

// const lighth = new THREE.HemisphereLight(0x7c7c7c, 0.5);
// scene.add(lighth);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


function init() {

    texture = new THREE.TextureLoader().load('./h1.png');
    material = new THREE.MeshBasicMaterial({ map: texture });

    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2 * imgRatio, 2), material);
    scene.add(mesh);
}

let stopPosition = 3; // Define at what position the image will stop
let speed = 0.03; // Define the speed of the image movement

function animate() {
    requestAnimationFrame(animate);

    if (mesh.position.z < stopPosition) {
        mesh.position.z += speed;
    }

    renderer.render(scene, camera);
}
init();
animate();