import '../scss/styles.scss'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------------------------------------------------- */
    /* Basic Setup */
    /* -------------------------------------------------------------------------- */
    // image ratio
    let imgRatio = 483 / 256;
    // let isMobileDevice = isMobile(window.navigator).any;
    let mouseX = 0,
        mouseY = 0;
    let mouseOX = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let texture1,
        material1,
        mesh1;
    let texture2,
        material2,
        mesh2;
    let texture3,
        material3,
        mesh3;
    let texture4,
        material4,
        mesh4;
    let imgArray = [];
    let imgSet = new THREE.Group();

    let imgcnt = 10;

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const canvas = document.querySelector('canvas.webgl')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        1000
    )
    camera.position.z = 5;

    scene.add(camera)
    scene.background = new THREE.Color(0x000000);

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = sizes.width / sizes
            .height
            camera
            .updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /* -------------------------------------------------------------------------- */
    /* light setup */
    /* -------------------------------------------------------------------------- */
    // const light2 = new THREE.DirectionalLight(0xffffff, .95);  Color, Intensity
    // const light3 = new THREE.DirectionalLight(0xffffff, .4);  Color, Intensity
    // light2.position.set(0, 0, 2);  pointlight light3.position.set(-3, 0, 2);
    // pointlight const targetPosition2 = new THREE.Vector3(0.5, 0, 0);
    // light2.target.position.copy(targetPosition2); const targetPosition3 = new
    // THREE.Vector3(-2, 3, 0); light3.target.position.copy(targetPosition3);
    // light2.castShadow = true;  Enable shadow casting light2.shadow.mapSize.width
    // = 4096; light2.shadow.mapSize.height = 4096; scene.add(light2);
    // scene.add(light3); const lighth = new THREE.HemisphereLight(0x7c7c7c, 0.5);
    // scene.add(lighth);

    const renderer = new THREE.WebGLRenderer(
        {canvas: canvas, antialias: true, alpha: true}
    )
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    function init() {

        texture1 = new THREE
            .TextureLoader()
            .load('./h1.png');
        material1 = new THREE.MeshBasicMaterial({map: texture1});
        texture2 = new THREE
            .TextureLoader()
            .load('./h2.png');
        material2 = new THREE.MeshBasicMaterial({map: texture2});
        texture3 = new THREE
            .TextureLoader()
            .load('./h3.png');
        material3 = new THREE.MeshBasicMaterial({map: texture3});
        texture4 = new THREE
            .TextureLoader()
            .load('./h4.png');
        material4 = new THREE.MeshBasicMaterial({map: texture4});
        for (let i = 0; i < imgcnt; i++) {
            mesh1 = new THREE.Mesh(new THREE.PlaneGeometry(.5 * imgRatio, .5), material1);
            mesh2 = new THREE.Mesh(new THREE.PlaneGeometry(.5 * imgRatio, .5), material2);
            mesh3 = new THREE.Mesh(new THREE.PlaneGeometry(.5 * imgRatio, .5), material3);
            mesh4 = new THREE.Mesh(new THREE.PlaneGeometry(.5 * imgRatio, .5), material4);
            mesh1.position.x = -.5 + -.05 * i
            mesh1.position.y = -.3 + -.03 * i
            mesh2.position.x = .5 + .05 * i
            mesh2.position.y = -.3 + -.03 * i
            mesh3.position.x = -.5 + -.05 * i
            mesh3.position.y = .3 + .03 * i
            mesh4.position.x = .5 + .05 * i
            mesh4.position.y = .3 + .03 * i

            mesh1.position.z = i * .05
            mesh2.position.z = i * .05
            mesh3.position.z = i * .05
            mesh4.position.z = i * .05
            let imgScale = .06*i + 1
            mesh1.scale.set(imgScale,imgScale,imgScale)
            mesh2.scale.set(imgScale,imgScale,imgScale)
            mesh3.scale.set(imgScale,imgScale,imgScale)
            mesh4.scale.set(imgScale,imgScale,imgScale)
            imgSet.add(mesh1)
            imgSet.add(mesh2)
            imgSet.add(mesh3)
            imgSet.add(mesh4)
            let imgGroup = new THREE.Group();
            imgGroup.add(mesh1)
            imgGroup.add(mesh2)
            imgGroup.add(mesh3)
            imgGroup.add(mesh4)
            imgArray.push(imgGroup)
            scene.add(imgGroup);
        }
    
    }

    let stopPosition = 3; // Define at what position the image will stop
    let speed = 0.03; // Define the speed of the image movement
    // const controls = new OrbitControls(camera, renderer.domElement);
    function animate() {
        requestAnimationFrame(animate);

        // if (imgArray[0].position.z < stopPosition) {     imgArray[0].position.z +=
        // speed;     imgArray[0].position.x += speed/2;     imgArray[0].position.y +=
        // speed/2; } for(let i =0;i<imgcnt;i++){     if (imgArray[i].position.z <
        // stopPosition) {         imgArray[i].position.z += speed/(i+1);
        // imgArray[i].position.x += speed/(i+1);          imgArray[i].position.y +=
        // speed/(i+1);     } }
// console.log(mouseX,mouseY)
for(let i = 0;i<imgArray.length;i++){
    imgArray[i].position.x += (-mouseX / 8500 -  imgArray[i].position.x) * .07;
    imgArray[i].position.y += (mouseY / 8500 - imgArray[i].position.y) * .1;
    // imgArray[i].position.x += (-mouseX / 8500*i/3 -  imgArray[i].position.x) * .07;
// imgArray[i].position.y += (mouseY / 8500 *i/3 - imgArray[i].position.y) * .1;
// console.log(imgArray[i])    


}
        renderer.render(scene, camera);
    }
    init();
    animate();
    // console.log(imgArray)

// imgArray[0].position.set(1,2,0);
    document.addEventListener('mousemove', onDocumentMouseMove);

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 4;
    mouseY = (event.clientY - windowHalfY) * 4;
}

});

