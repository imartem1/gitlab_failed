import React from 'react';
import * as THREE from "three";


function checkStatus(response) {
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    return response;
}


function fitCameraToObject( camera, object, controls, offset ) {

    offset = offset || 1.25;

    const boundingBox = new THREE.Box3();

// get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject( object );

//console.log(boundingBox);
    const center = new THREE.Vector3( );
    boundingBox.getCenter(center);

    const size = new THREE.Vector3( );
    boundingBox.getSize(size);

// get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max( size.x, size.y, size.z );
    const fov = camera.fov * ( Math.PI / 180 );
    let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

    cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    if ( controls ) {
        // set camera to rotate around center of loaded object
        controls.target = center;
        // prevent camera from zooming out far enough to create far plane cutoff
        controls.maxDistance = cameraToFarEdge * 2;
        controls.saveState();
    } else {
        camera.lookAt( center )
    }
}


const matrices1 = [
    [
        1 ,      0    ,   0   ,    0,
        0   ,    1  ,     0     ,  0,
        0   ,    0   ,    1    ,   0,
        0   ,    0    ,   0   ,    1
    ],
    [
        -0.553227,       -0.741223 ,      0.38017 ,0,
        0.581886 ,      -0.670424 ,      -0.46037 ,       0,
        0.596111  ,      -0.0334733 ,     0.802204 ,       0,
        -232.249  ,      71.2069, 47.7504, 1
    ],
    [
        -0.749634  ,     0.308407   ,     0.585606   ,     0,
        -0.641254  ,     -0.557464   ,    -0.527282  ,     0,
        0.163837   ,     -0.770791   ,    0.615661,       0,
        -110.219    ,    244.988, 103.973, 1
    ],
    [
        -0.749634 ,      0.308407  ,      0.585606  ,      0,
        -0.641254 ,      -0.557464 ,      -0.527282  ,     0,
        0.163837  ,      -0.770791 ,      0.615661   ,     0,
        -110.219   ,     244.988, 103.973, 1
    ],

];

const matrices = [
    [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
    [0.416299,-0.892893,-0.171578,0,0.87321,0.445213,-0.198221,0,0.253379,-0.067305,0.965023,0,-102.509,37.3779,11.7846,1],
    [0.460574,-0.757703,-0.462339,0,0.872977,0.4809,0.0815229,0,0.160569,-0.441159,0.882948,0,-56.6951,139.398,32.3305,1],
    [0.44577,-0.762017,-0.469701,0,0.871831,0.48857,0.0347845,0,0.202976,-0.425006,0.88214,0,-61.3886,140.627,32.6434,1],
    [0.123859,-0.93325,-0.3372,0,0.951225,0.208424,-0.227444,0,0.282543,-0.292582,0.913546,0,-83.8114,101.342,22.0016,1]
];


let cubes = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );


//const exporter = new THREE.GLTFExporter();
const renderer = new THREE.WebGLRenderer({antialias:true, canvas: document.getElementById('view')});
let windowHalfX = renderer.domElement / 2,
    windowHalfY = renderer.domElement / 2,
    mouseX = 0,
    mouseY = 0;


//const controls = new THREE.CameraControls( camera, renderer.domElement );
renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);


const color = 'pink';
//const material = new THREE.MeshDepthMaterial({ color: 'white' });

const materialTract1 = new THREE.MeshPhongMaterial({
    color:"red",
    side: THREE.DoubleSide,
});
const materialTract2 = new THREE.MeshPhongMaterial({
    color:"green",
    side: THREE.DoubleSide,
});
//const material = new THREE.MeshNormalMaterial();

renderer.setClearColor(0xDDDDDD, 1);
renderer.setSize( renderer.domElement.width, renderer.domElement.height );
//document.body.appendChild( renderer.domElement );

const light = new THREE.DirectionalLight( 0xffffff , 1);
//const light = new THREE.AmbientLight();

scene.add( light );

Promise.all([0, 1, 2, 3, 4 ].map(id => {

        fetch(`http://localhost/mesh_${id}.vert.bin`)
            .then(response => checkStatus(response) && response.arrayBuffer())
            .then(buffer => {

                fetch(`http://localhost/mesh_${id}.norm.bin`)
                    .then(response1 => checkStatus(response1) && response1.arrayBuffer())
                    .then(buffer1 => {

                        fetch(`http://localhost/mesh_${id}.ind.bin`)
                            .then(response2 => checkStatus(response2) && response2.arrayBuffer())
                            .then(buffer2 => {

                                console.log(id);
                                const positions = new Float32Array(buffer);
                                const normals = new Float32Array(buffer1);
                                const indices = new Uint32Array(buffer2);

                                const geometry = new THREE.BufferGeometry();
                                const positionNumComponents = 3;
                                const normalNumComponents = 3;


                                geometry.setAttribute('position',
                                    new THREE.BufferAttribute(positions, positionNumComponents));
                                geometry.setAttribute('normal',
                                    new THREE.BufferAttribute(normals, normalNumComponents));

                                geometry.setIndex(new THREE.BufferAttribute(indices, 1));
                                const m = new THREE.Matrix4();
                                m.fromArray(matrices[id]);
                                geometry.applyMatrix4(m);

                                const material = new THREE.MeshPhongMaterial({
                                    color,
                                    opacity: 0.5,
                                    transparent: true,

                                    side: THREE.DoubleSide,

                                    emissive:"white",
                                    emissiveIntensity:0.5
                                });

                                const cube = new THREE.Mesh( geometry, material )


//if(id == 3)
//{
                                cubes.push(cube);
                                scene.add( cube );
//}
                                animate();
                                //render();

                            })
                            .catch(err2 => console.error(err2));

                    })
                    .catch(err1 => console.error(err1));
            })
            .catch(err => console.error(err)); // Never forget the final catch!


    }

)).then(()=>{
    console.log("loaded");


});

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 10;
    mouseY = (event.clientY - windowHalfY) / 10;

    console.log(`...${mouseX}...${mouseY}`);
}

function animate() {
    //requestAnimationFrame( animate );

    //controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    fitCameraToObject(camera, scene);

    renderer.render( scene, camera );
}

function render() {

    //let
    fitCameraToObject(camera, cubes[0]);


    renderer.render( scene, camera );

}


const ViewerModels = () => {
    return (
        <div>
            
        </div>
    );
};

export default ViewerModels;