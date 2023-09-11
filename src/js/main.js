import '../scss/styles.scss'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

document.addEventListener("DOMContentLoaded", function() {

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
    let sharkirSize = 0.75;
    // let isMobileDevice = isMobile(window.navigator).any;
    let mouseX = 0,
        mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let fadeMaterial,
        fadeMesh;
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
    let imgScale

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
        opacity: 0.3
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

    function init() {
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
                // mesh1.position.z = i * .05 - .05
                // mesh2.position.z = i * .05 - .05
                // mesh3.position.z = i * .05 - .05
                // mesh4.position.z = i * .05 - .05
                // mesh1.position.z = 0
                // mesh2.position.z = 0
                // mesh3.position.z = 0
                // mesh4.position.z = 0

            imgScale = .06 * i + 1
            mesh1
                .scale
                .set(imgScale, imgScale, imgScale)
            mesh2
                .scale
                .set(imgScale, imgScale, imgScale)
            mesh3
                .scale
                .set(imgScale, imgScale, imgScale)
            mesh4
                .scale
                .set(imgScale, imgScale, imgScale)
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
        imgArray[9].position.z += 0.01;
    }

    for (let i = 0; i < imgcnt; i++) {
        fadeMesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), fadeMaterial);
        fadeMesh.position.z = i * .05 - 0.1
        scene.add(fadeMesh);
    }

    meshSharkie = new THREE.Mesh(new THREE.PlaneGeometry(sharkirSize, sharkirSize), materialSharkie)
    meshSharkie.position.z = .65
    scene.add(meshSharkie);

    let speed = .0004;

    function animate() {
        requestAnimationFrame(animate);

        // for (let i = 0; i < 9; i++) {
        //     if (imgArray[i].position.z <= (i + 1) * .05) {
        //         let ZmovingSpeed = .005;
        //         // imgScale += .0001;
        //         imgArray[i].position.z += ZmovingSpeed;
        //         // imgArray[i]
        //         //     .scale
        //         //     .set(imgScale, imgScale, imgScale);
        //         } else if (imgArray[i].position.z > i * .05) {
        //             // imgScale = 1.05;
        //             // imgArray[i]
        //             //     .scale
        //             //     .set(imgScale, imgScale, imgScale);
        //             imgArray[i].position.z = i*.05
        //     }
        // }
        // console.log(imgArray[1].position.z)
        for (let i = 0; i < 9; i++) {
               if (imgArray[0].position.z < 0.05) {
                let ZmovingSpeed = .05/24;
                // imgScale += .0001;
                imgArray[i].position.z += ZmovingSpeed;
                // imgArray[i]
                //     .scale
                //     .set(imgScale, imgScale, imgScale);
                // console.log("growing")
                } else {
                    // imgScale = 1.05;
                    // imgArray[i]
                    //     .scale
                    //     .set(imgScale, imgScale, imgScale);
                    imgArray[i].position.z -= .05
                    // console.log("return")
            }
        }
        // console.log(imgArray[0].children[0].position.z,imgArray[1].children[0].position.z)

        for (let i = 0; i < imgArray.length; i++) {
            imgArray[i].position.x += (-mouseX / 90000 * i - imgArray[i].position.x) * (.005 * i * i + 0.02);
            imgArray[i].position.y += (mouseY / 90000 * i - imgArray[i].position.y) * (.005 * i * i + 0.02);
        }

        renderer.render(scene, camera);
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

    // console.log(imgArray[0].children[0].position.z)
    // console.log(imgArray[1].children[0].position.z)
    // console.log(imgArray[2].children[0].position.z)

    class marchingImg {
        constructor(x, y, z) {
            this.geometry = new THREE.PlaneGeometry(.03 * imgRatio, .03)
        }
    }

});