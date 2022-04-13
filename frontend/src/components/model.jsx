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
const Brain = (props) => {
    const model = useLoader(
        GLTFLoader,
        props.path
    )
    model.nodes["mesh_0"].visible=props.visible0
    model.nodes["mesh_1"].visible=props.visible1
    model.nodes["mesh_2"].visible=props.visible2
    model.nodes["mesh_3"].visible=props.visible3
    //console.log('ищу опасити', model.nodes["mesh_0"].material.opacity)
    model.nodes["mesh_0"].material.opacity = props.opacity0
    model.nodes["mesh_1"].material.opacity = props.opacity1
    model.nodes["mesh_2"].material.opacity = props.opacity2
    model.nodes["mesh_3"].material.opacity = props.opacity3
    return(
        <primitive
            object={model.scene}
            {...props.path+props.scale+props.position}
        />


    )
}

const Model = (
    {
        children,
        flag0,
        flag1,
        flag2,
        flag3,
        opac0,
        opac1,
        opac2,
        opac3,
    }
) =>{
    //console.log('flag',flag0)
    return (
        <div style={{height: '90vh', width: '86vw'}}>
            <Canvas
                shadowMap
                style={{background: 'black'}}
                camera={{position: [50,50,50]}}
            >
                <Bulb position={[0,15,0]}/>
                <ambientLight intensity={0.2}/>
                <Dragable>
                    <Suspense fallback={null}>
                        <Brain
                            scale={new Array(3).fill(1)}
                            path='/static/nrtl/test.gltf'
                            position={[0, 0, 0]}
                            visible0={flag0}
                            visible1={flag1}
                            visible2={flag2}
                            visible3={flag3}
                            opacity0={opac0}
                            opacity1={opac1}
                            opacity2={opac2}
                            opacity3={opac3}
                        />
                    </Suspense>
                </Dragable>
                <Orbit/>
            </Canvas>
        </div>
    );
};

export default Model;