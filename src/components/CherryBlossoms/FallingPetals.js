'use client';

import React, { useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Instances, Instance, InstancedAttribute } from '@react-three/drei';
import { Vector3, Euler, MathUtils } from 'three';

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

        //* Y AXIS LOGIC
        position.y -= props.speed.fall * deltaTime * 60;

        //* X AXIS LOGIC
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

        //* Z AXIS LOGIC
        position.z +=
            Math.sin(
                time * props.floatParams.freqZ + props.floatParams.phaseZ
            ) *
            props.floatParams.ampZ *
            deltaTime *
            2;

        //* ROTATION LOGIC
        const rotationModX = Math.sin(time * 0.3 + props.seed * 7) * 0.2 + 1;
        const rotationModY = Math.sin(time * 0.5 + props.seed * 3) * 0.3 + 1;
        const rotationModZ = Math.cos(time * 0.4 + props.seed * 5) * 0.2 + 1;
        rotation.x +=
            initialRotationSpeed.current.x * rotationModX * deltaTime * 60;
        rotation.y +=
            initialRotationSpeed.current.y * rotationModY * deltaTime * 60;
        rotation.z +=
            initialRotationSpeed.current.z * rotationModZ * deltaTime * 60;

        //* FADE LOGIC
        let startFade = -3;
        let endFade = -6;
        if (position.y <= startFade) {
            const distanceFromEnd = position.y - endFade;
            const fadeRange = startFade - endFade;
            const fadeProgress = Math.max(0, 1 - distanceFromEnd / fadeRange);

            // More gentle fade out curve
            const opacity = MathUtils.clamp(
                0.85 * (1 - Math.pow(fadeProgress, 2)),
                0,
                0.85
            );

            geometry.attributes.aOpacity.needsUpdate = true;
            geometry.attributes.aOpacity.array[index] = opacity;
        }
        //* FADE LOGIC

        //* RESET LOGIC
        const xLimit = width;
        const yLimit = -8;
        if (
            position.x > xLimit ||
            position.x < -xLimit ||
            position.y < yLimit
        ) {
            position.set(
                MathUtils.randFloatSpread(width),
                MathUtils.randFloat(12, 20),
                MathUtils.randFloat(-4, 0)
            );

            geometry.attributes.aOpacity.array[index] = 0.8;
        }
        //* RESET LOGIC
    });

    return <Instance ref={ref} {...props} />;
}

export default function FallingPetals({ geometry, material, count = 100 }) {
    const { viewport } = useThree();
    const { width } = viewport;

    const petals = useMemo(
        () =>
            Array.from({ length: count }, () => {
                const seed = Math.random();

                return {
                    position: new Vector3(
                        MathUtils.randFloatSpread(width),
                        MathUtils.randFloat(12, 20),
                        MathUtils.randFloat(-4, 0)
                    ),
                    rotation: new Euler(
                        MathUtils.randFloat(0, Math.PI * 2),
                        MathUtils.randFloat(0, Math.PI * 2),
                        MathUtils.randFloat(0, Math.PI * 2)
                    ),
                    scale: new Vector3().setScalar(
                        MathUtils.randFloat(0.8, 1.2)
                    ),
                    speed: {
                        fall: MathUtils.randFloat(0.01, 0.025),
                        rotationX: MathUtils.randFloat(-0.0015, 0.0015),
                        rotationY: MathUtils.randFloat(-0.001, 0.001),
                        rotationZ: MathUtils.randFloat(-0.0012, 0.0012),
                    },
                    floatParams: {
                        freqX: MathUtils.randFloat(0.2, 0.5), // Frequency of x-axis oscillation
                        ampX: MathUtils.randFloat(0.01, 0.03), // Amplitude of x-axis oscillation
                        phaseX: MathUtils.randFloat(0, Math.PI * 2),
                        freqZ: MathUtils.randFloat(0.2, 0.4), // Frequency of z-axis oscillation
                        ampZ: MathUtils.randFloat(0.01, 0.02), // Amplitude of z-axis oscillation
                        phaseZ: MathUtils.randFloat(0, Math.PI * 2),
                    },
                    seed,
                };
            }),
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <Instances
            limit={count}
            range={count}
            geometry={geometry}
            material={material}
        >
            <InstancedAttribute name="aOpacity" defaultValue={0.8} />
            {petals.map((props, i) => (
                <Petal key={i} index={i} width={width} {...props} />
            ))}
        </Instances>
    );
}
