'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
    useGLTF,
    Preload,
    Stats,
    useDetectGPU,
    Instances,
    Instance,
    InstancedAttribute,
} from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/petal.glb');

const PETAL_COUNT = 100;

function usePetalMaterial(petalMaterial) {
    return useMemo(() => {
        const material = petalMaterial.clone();

        material.color = new THREE.Color(1, 0.3, 0.3);
        material.transparent = true;
        material.depthWrite = false;

        material.onBeforeCompile = (shader) => {
            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>',
                `
                #include <common>
                attribute float aOpacity; // Add aOpacity attribute
                varying float vOpacity; // Pass aOpacity to fragment shader
                `
            );
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                vOpacity = aOpacity; // Assign aOpacity to vOpacity
                `
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <common>',
                `
                #include <common>
                varying float vOpacity; // Receive opacity value from vertex shader
                `
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `
                gl_FragColor.a *= vOpacity; // Multiply alpha by opacity
                #include <dithering_fragment>
                `
            );
        };

        return material;
    }, [petalMaterial]);
}

function Petal({ index, width, ...props }) {
    const ref = useRef();

    const prevTime = useRef(0);

    const initialRotationSpeed = useRef({
        x: props.speed.rotationX,
        y: props.speed.rotationY,
        z: props.speed.rotationZ,
    });

    useFrame((state) => {
        if (!ref.current) return;

        const { geometry, position, rotation } = ref.current;

        const time = state.clock.getElapsedTime();
        const deltaTime = time - prevTime.current;
        prevTime.current = time;

        //! Y AXIS LOGIC
        position.y -= props.speed.fall * deltaTime * 60;

        //! X AXIS LOGIC
        const primaryXMovement =
            Math.sin(
                time * props.floatParams.freqX + props.floatParams.phaseX
            ) *
            props.floatParams.ampX *
            deltaTime *
            2;
        const secondaryXMovement =
            Math.sin(
                time * props.floatParams.freqX * 2.5 +
                    props.floatParams.phaseX * 1.7
            ) *
            props.floatParams.ampX *
            0.4 *
            deltaTime *
            2;

        position.x += primaryXMovement + secondaryXMovement;

        const heightFactor = Math.max(0, Math.min(1, (20 - position.y) / 28));
        position.x +=
            heightFactor * props.driftDirection * 0.02 * deltaTime * 60;

        //! Z AXIS LOGIC
        position.z +=
            Math.sin(
                time * props.floatParams.freqZ + props.floatParams.phaseZ
            ) *
            props.floatParams.ampZ *
            deltaTime *
            2;

        //! ROTATION LOGIC
        const rotationModX = Math.sin(time * 0.3 + props.seed * 7) * 0.2 + 1;
        const rotationModY = Math.sin(time * 0.5 + props.seed * 3) * 0.3 + 1;
        const rotationModZ = Math.cos(time * 0.4 + props.seed * 5) * 0.2 + 1;
        rotation.x +=
            initialRotationSpeed.current.x * rotationModX * deltaTime * 60;
        rotation.y +=
            initialRotationSpeed.current.y * rotationModY * deltaTime * 60;
        rotation.z +=
            initialRotationSpeed.current.z * rotationModZ * deltaTime * 60;

        //! RESET LOGIC
        let startFade = -3;
        let endFade = -6;
        if (position.y <= startFade) {
            const distanceFromEnd = position.y - endFade;
            const fadeRange = startFade - endFade;
            const fadeProgress = Math.max(0, 1 - distanceFromEnd / fadeRange);

            // More gentle fade out curve
            const opacity = THREE.MathUtils.clamp(
                0.85 * (1 - Math.pow(fadeProgress, 2)),
                0,
                0.85
            );

            geometry.attributes.aOpacity.needsUpdate = true;
            geometry.attributes.aOpacity.array[index] = opacity;
        }

        const xLimit = width;
        const yLimit = -8;
        if (
            position.x > xLimit ||
            position.x < -xLimit ||
            position.y < yLimit
        ) {
            position.set(
                THREE.MathUtils.randFloatSpread(width),
                THREE.MathUtils.randFloat(12, 20),
                THREE.MathUtils.randFloat(-4, 0)
            );

            geometry.attributes.aOpacity.array[index] = 0.8;
        }
        //! RESET LOGIC
    });

    return <Instance ref={ref} {...props} />;
}

function Petals() {
    const { nodes } = useGLTF('/petal.glb');
    const material = usePetalMaterial(nodes.petal.material);

    const { viewport } = useThree();
    const data = useMemo(
        () =>
            Array.from({ length: PETAL_COUNT }, () => {
                const seed = Math.random();

                return {
                    position: new THREE.Vector3(
                        THREE.MathUtils.randFloatSpread(viewport.width),
                        THREE.MathUtils.randFloat(12, 20),
                        THREE.MathUtils.randFloat(-4, 0)
                    ),
                    rotation: new THREE.Euler(
                        THREE.MathUtils.randFloat(0, Math.PI * 2),
                        THREE.MathUtils.randFloat(0, Math.PI * 2),
                        THREE.MathUtils.randFloat(0, Math.PI * 2)
                    ),
                    scale: new THREE.Vector3().setScalar(
                        THREE.MathUtils.randFloat(0.8, 1.2)
                    ),
                    speed: {
                        fall: THREE.MathUtils.randFloat(0.01, 0.025),
                        rotationX: THREE.MathUtils.randFloat(-0.0015, 0.0015),
                        rotationY: THREE.MathUtils.randFloat(-0.001, 0.001),
                        rotationZ: THREE.MathUtils.randFloat(-0.0012, 0.0012),
                    },
                    floatParams: {
                        freqX: THREE.MathUtils.randFloat(0.2, 0.5), // Frequency of x-axis oscillation
                        ampX: THREE.MathUtils.randFloat(0.01, 0.03), // Amplitude of x-axis oscillation
                        phaseX: THREE.MathUtils.randFloat(0, Math.PI * 2),
                        freqZ: THREE.MathUtils.randFloat(0.2, 0.4), // Frequency of z-axis oscillation
                        ampZ: THREE.MathUtils.randFloat(0.01, 0.02), // Amplitude of z-axis oscillation
                        phaseZ: THREE.MathUtils.randFloat(0, Math.PI * 2),
                    },
                    windFactor: THREE.MathUtils.randFloat(0.6, 2.0),
                    driftDirection: THREE.MathUtils.randFloat(-1, 1), // Random drift direction
                    seed,
                };
            }),
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <Instances
            limit={PETAL_COUNT}
            range={PETAL_COUNT}
            geometry={nodes.petal.geometry}
            material={material}
        >
            <InstancedAttribute name="aOpacity" defaultValue={0.8} />
            {data.map((props, i) => (
                <Petal key={i} index={i} width={viewport.width} {...props} />
            ))}
        </Instances>
    );
}

export default function CherryBlossom3D() {
    const detectedGPU = useDetectGPU();
    console.log(detectedGPU);

    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        >
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Preload all />

            <Stats />

            <Petals />
        </Canvas>
    );
}
