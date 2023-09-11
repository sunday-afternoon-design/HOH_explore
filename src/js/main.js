import '../scss/styles.scss'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats-js';
document.addEventListener("DOMContentLoaded", function() {
    var stats = new Stats();
    document.body.appendChild(stats.dom);

    // const scontent = ['IMMERSIVE WORLDS', 'GAMING ENVIRONMENTS', 'CONTENT CREATION', 'FOOD & BEVERAGE'];
    // const scontentcss = ['titleStyle1', 'titleStyle2', 'titleStyle3', 'titleStyle4'];
    // for (let i = 0; i < scontent.length; i++) {
    //     let exploreTitles = document.createElement('div');
    //     exploreTitles.textContent = scontent[i];
    //     exploreTitles
    //         .classList
    //         .add("title")
    //     exploreTitles.setAttribute('id', scontentcss[i]);
    //     document
    //         .body
    //         .appendChild(exploreTitles);
    // }


    /* -------------------------------------------------------------------------- */
    /* Basic Setup */
    /* -------------------------------------------------------------------------- */
    let imgRatio = 640 / 375;
    let speed = 0.004;
    let sharkirSize = 0.75;
    // let isMobileDevice = isMobile(window.navigator).any;
    let mouseX = 0,
        mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let fadeMaterial,
        fadeMesh;
    let texture1,
        material1;
    let texture2,
        material2;
    let texture3,
        material3;
    let texture4,
        material4;



    let imgcnt = 10;

    texture1 = new THREE
        .TextureLoader()
        .load('./h1.png');
    material1 = new THREE.MeshBasicMaterial({ map: texture1 });
    texture2 = new THREE
        .TextureLoader()
        .load('./h2.png');
    material2 = new THREE.MeshBasicMaterial({ map: texture2 });
    texture3 = new THREE
        .TextureLoader()
        .load('./h3.png');
    material3 = new THREE.MeshBasicMaterial({ map: texture3 });
    texture4 = new THREE
        .TextureLoader()
        .load('./h4.png');
    material4 = new THREE.MeshBasicMaterial({ map: texture4 });

    fadeMaterial = new THREE.MeshBasicMaterial({
        color: 0x000,
        transparent: true,
        opacity: 0.05
    });

    let textureSharkie,
        materialSharkie,
        meshSharkie;
    textureSharkie = new THREE
        .TextureLoader()
        .load('./new sharkie.png');
    materialSharkie = new THREE.MeshBasicMaterial({ map: textureSharkie, transparent: true });

    const sizes = {
        width: window.innerWidth,
        height: window.innerWidth * 0.71875
    }

    const canvas = document.querySelector('canvas.webgl')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        1000
    )
    camera.position.z = 2;

    scene.add(camera)
    scene.background = new THREE.Color(0x000000);

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerWidth * 0.71875
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerWidth * 0.71875 / 2;
        camera.aspect = sizes.width / sizes
            .height
        camera
            .updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const controls = new OrbitControls(camera, renderer.domElement);


    class MarchingImage {
        constructor(material, imgRatio, initialZ, speed, id, x, y, imgScale) {
            this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * imgRatio, 0.5), material);
            this.id = id;
            this.mesh.position.z = initialZ;
            this.mesh.position.x = x * .5 + x * .05 * this.id;
            this.mesh.position.y = y * .3 + y * .03 * this.id;
            // this.mesh.scale.set(imgScale, imgScale, imgScale);
            this.speed = speed;
            this.movingForward = true;
        }

        updatePosition(x, y) {
            if (this.movingForward) {
                this.mesh.position.z += this.speed;
                this.mesh.position.x += this.speed * x;
                this.mesh.position.y += this.speed / 5 * 3 * y;
            } else {
                this.mesh.position.z = 0;
                this.mesh.position.x = x * .5;
                this.mesh.position.y = y * .3;
            }

            if (this.mesh.position.z >= .5) {
                this.movingForward = false;
            } else {
                this.movingForward = true;
            }
        }

    }

    let images1 = [];
    let images2 = [];
    let images3 = [];
    let images4 = [];
    let imgStack = [];

    function init() {

        for (let i = 0; i < imgcnt; i++) {
            let image1 = new MarchingImage(material1, imgRatio, i * 0.05, speed, i, -1, -1, .06 * i + 1);
            let image3 = new MarchingImage(material3, imgRatio, i * 0.05, speed, i, 1, 1, .06 * i + 1);
            let image2 = new MarchingImage(material2, imgRatio, i * 0.05, speed, i, 1, -1, .06 * i + 1);
            let image4 = new MarchingImage(material4, imgRatio, i * 0.05, speed, i, -1, 1, .06 * i + 1);
            let imgGroup = new THREE.Group();
            imgGroup.add(image1.mesh)
            imgGroup.add(image2.mesh)
            imgGroup.add(image3.mesh)
            imgGroup.add(image4.mesh)
            scene.add(imgGroup);
            imgStack.push(imgGroup);
            images1.push(image1);
            images2.push(image2);
            images3.push(image3);
            images4.push(image4);
        }


        let front1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * imgRatio, 0.5), material1)
        let front2 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * imgRatio, 0.5), material2)
        let front3 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * imgRatio, 0.5), material3)
        let front4 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * imgRatio, 0.5), material4)
        front1.position.set(-1, -.6, .51)
        front2.position.set(1, -.6, .51)
        front3.position.set(1, .6, .51)
        front4.position.set(-1, .6, .51)
        let imgGroup = new THREE.Group();
        imgGroup.add(front1)
        imgGroup.add(front2)
        imgGroup.add(front3)
        imgGroup.add(front4)
        imgStack.push(imgGroup)
        scene.add(imgGroup);
    }

    for (let i = 0; i < imgcnt * 10; i++) {
        fadeMesh = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), fadeMaterial);
        fadeMesh.position.z = i * .05 / 10 - 0.1;
        scene.add(fadeMesh);
    }

    meshSharkie = new THREE.Mesh(new THREE.PlaneGeometry(sharkirSize, sharkirSize), materialSharkie)
    meshSharkie.position.z = .65
    scene.add(meshSharkie);

    function animate() {
        stats.begin();
        requestAnimationFrame(animate);

        for (let i = 0; i < imgcnt; i++) {
            images1[i].updatePosition(-1, -1);
            images2[i].updatePosition(1, -1);
            images3[i].updatePosition(1, 1);
            images4[i].updatePosition(-1, 1);
        }

        // for (let i = 0; i < (imgcnt + 1); i++) {

        for (let i = 0; i < imgStack.length; i++) {


            imgStack[i].position.x += (-mouseX / 90000 * i - imgStack[i].position.x) * (.005 * i * i + 0.02);

            imgStack[i].position.y += (mouseY / 90000 * i - imgStack[i].position.y) * (.005 * i * i + 0.02);

        }
        renderer.render(scene, camera);
        stats.end();
    }
    init();
    animate();

    document.addEventListener('mousemove', onDocumentMouseMove);

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 4;
        mouseY = (event.clientY - windowHalfY) * 4;
    }

    document.addEventListener("mousemove", (event) => {
        const cursorPosition = new THREE.Vector3(
            (event.clientX / window.innerWidth) * 3 - 1, -((event.clientY / window.innerHeight) * 3 - 1),
            0.5
        );
        cursorPosition.unproject(camera);
        meshSharkie.lookAt(cursorPosition);
    });


});