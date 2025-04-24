'use client';

import React, { memo, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import {
    useGLTF,
    Instances,
    Instance,
    InstancedAttribute,
} from '@react-three/drei';
import * as THREE from 'three';

import usePetalMaterial from './usePetalMaterial';

const PETAL_COUNT = 100;

const Petal = memo(function Petal({ index, width, height, ...props }) {
    const ref = useRef();
    const animationProgress = useRef(0);
    const timeOffset = index / PETAL_COUNT;

    const initialRotationSpeed = useRef({
        x: props.speed.rotationX,
        y: props.speed.rotationY,
        z: props.speed.rotationZ,
    });

    const randomOffset = useRef({
        x: THREE.MathUtils.randFloatSpread(width), //* Spread of the petals inside a line
        y: THREE.MathUtils.randFloatSpread(height), //* Spread of the petals inside a line
        speedFactor: THREE.MathUtils.randFloat(0.05, 0.075), //* Speed of the petals
    });

    useFrame((state, delta) => {
        if (!ref.current) return;

        const { geometry, position, rotation } = ref.current;

        const time = state.clock.getElapsedTime();

        //* UPDATE ANIMATION PROGRESS
        animationProgress.current +=
            delta * 0.5 * randomOffset.current.speedFactor;

        //* CALCULATE PROGRESS FOR THIS FRAME
        const progress = Math.min(
            Math.max(0, animationProgress.current - timeOffset),
            1
        );
        const easedProgress = 1 - (1 - progress) * (1 - progress); // Inline easeOutQuad

        //* Y AXIS LOGIC
        position.y =
            (1 - easedProgress * 2) * height * 1.2 + randomOffset.current.y;

        //* X AXIS LOGIC
        position.x =
            (-1 + easedProgress * 2) * width * 1.2 + randomOffset.current.x;

        //* Z AXIS LOGIC
        position.z +=
            Math.sin(
                time * props.floatParams.freqZ + props.floatParams.phaseZ
            ) *
            props.floatParams.ampZ *
            delta *
            2;

        //* ROTATION LOGIC
        const rotationModX = Math.sin(time * 0.3 + props.seed * 7) * 0.2 + 1;
        const rotationModY = Math.sin(time * 0.5 + props.seed * 3) * 0.3 + 1;
        const rotationModZ = Math.cos(time * 0.4 + props.seed * 5) * 0.2 + 1;
        rotation.x +=
            initialRotationSpeed.current.x * rotationModX * delta * 60;
        rotation.y +=
            initialRotationSpeed.current.y * rotationModY * delta * 60;
        rotation.z +=
            initialRotationSpeed.current.z * rotationModZ * delta * 60;

        //! FADE LOGIC (NEEDS FIX)
        // let startFade = -height * 0.8; // Adjusted to be relative to viewport
        // let endFade = -height * 1.1; // Adjusted to be relative to viewport
        // if (position.y <= startFade) {
        //     const distanceFromEnd = position.y - endFade;
        //     const fadeRange = startFade - endFade;
        //     const fadeProgress = Math.max(0, 1 - distanceFromEnd / fadeRange);

        //     // More gentle fade out curve
        //     const opacity = THREE.MathUtils.clamp(
        //         0.8 * (1 - Math.pow(fadeProgress, 2)),
        //         0,
        //         0.8
        //     );

        //     if (geometry.attributes.aOpacity) {
        //         geometry.attributes.aOpacity.needsUpdate = true;
        //         geometry.attributes.aOpacity.array[index] = opacity;
        //     }
        // }
        //! FADE LOGIC (NEEDS FIX)

        //* RESET LOGIC (NEEDS VALIDATION)
        const resetBoundaryX = width / 2 + 5;
        const resetBoundaryY = -height / 2 + 5;

        const needsReset =
            progress >= 0.99 ||
            (position.x >= resetBoundaryX && position.y <= resetBoundaryY);

        if (needsReset) {
            // console.log(
            //     `Reset petal ${index} at x=${position.x.toFixed(2)}, y=${position.y.toFixed(2)}`
            // );

            // Reset position to starting position with some randomness
            position.x = -width + THREE.MathUtils.randFloatSpread(width);
            position.y = height + THREE.MathUtils.randFloatSpread(height);
            position.z = THREE.MathUtils.randFloat(-3, 0);

            // Reset animation progress with some randomness to avoid syncing
            animationProgress.current = timeOffset - 0.01; //! Validate value

            // Reset opacity to initial value
            if (geometry.attributes.aOpacity) {
                geometry.attributes.aOpacity.needsUpdate = true;
                geometry.attributes.aOpacity.array[index] = 0.8;
            }
        }
        //* RESET LOGIC (NEEDS VALIDATION)
    });

    return <Instance ref={ref} {...props} />;
});

export default memo(function FlyingPetals() {
    const { nodes } = useGLTF('/petal.glb');
    const material = usePetalMaterial(nodes.petal.material);

    const { viewport } = useThree();
    const { width, height } = viewport;

    const petals = useMemo(
        () =>
            Array.from({ length: PETAL_COUNT }, (_, i) => {
                const seed = Math.random();

                return {
                    index: i,
                    position: new THREE.Vector3(
                        -width,
                        height,
                        THREE.MathUtils.randFloat(-3, 0)
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
                        rotationX: THREE.MathUtils.randFloat(-0.0015, 0.0015),
                        rotationY: THREE.MathUtils.randFloat(-0.001, 0.001),
                        rotationZ: THREE.MathUtils.randFloat(-0.0012, 0.0012),
                    },
                    floatParams: {
                        freqZ: THREE.MathUtils.randFloat(0.2, 0.4),
                        ampZ: THREE.MathUtils.randFloat(0.01, 0.02),
                        phaseZ: THREE.MathUtils.randFloat(0, Math.PI * 2),
                    },
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
            frustumCulled={true}
        >
            <InstancedAttribute name="aOpacity" defaultValue={0.8} />
            {petals.map((props, i) => (
                <Petal key={i} width={width} height={height} {...props} />
            ))}
        </Instances>
    );
});
