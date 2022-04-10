import {
    Canvas,
    useThree,
    extend,
    useLoader
} from "react-three-fiber";
import { Suspense } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Dragable from "./Dragable";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
extend({ OrbitControls});

const Orbit = () => {
    const { camera, gl} = useThree();
    return(
        <orbitControls
            args={[camera, gl.domElement]}
            attach='orbitControls'
        />
    )
}
const Bulb = props => {
    return(
        <mesh {...props}>
            <pointLight castShadow/>
            {/*<sphereBufferGeometry args={[0.2, 20, 20]}/>*/}
            <meshPhongMaterial emissive='yellow'/>
        </mesh>
    )
}
const Brain = props => {
    const model = useLoader(
        GLTFLoader,
        props.path
    )
    console.log(model)
    return(
        <primitive
            object={model.scene}
            {...props}
        />
    )
}

const Model = function () {
    return (
        <div style={{height: '90vh', width: '90vw'}}>
            <Canvas
                shadowMap
                style={{background: 'black'}}
                camera={{position: [10,10,10]}}
            >
                <Bulb position={[0,15,0]}/>
                <ambientLight intensity={0.2}/>
                <Dragable>
                    <Suspense fallback={null}>
                        <Brain
                            scale={new Array(3).fill(1)}
                            path='/static/nrtl/test.gltf'
                            position={[4, 0.6, 0]}
                        />
                    </Suspense>
                </Dragable>
                <Orbit/>
            </Canvas>
        </div>
    );
};

export default Model;