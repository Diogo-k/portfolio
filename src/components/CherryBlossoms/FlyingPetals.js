'use client';

import React, { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Instances, Instance, InstancedAttribute } from '@react-three/drei';
import * as THREE from 'three';

const PETAL_COUNT = 75;

const Petal = function Petal({ index, width, height, speed }) {
    const ref = useRef();
    const progress = useRef(index / PETAL_COUNT);

    const [data] = useState({
        index,
        offset: {
            x: THREE.MathUtils.randFloatSpread(width),
            y: THREE.MathUtils.randFloatSpread(height),
        },
        scale: new THREE.Vector3().setScalar(
            THREE.MathUtils.randFloat(0.8, 1.2)
        ),
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
        spin: {
            x: THREE.MathUtils.randFloat(0.1, 0.3),
            y: THREE.MathUtils.randFloat(0.1, 0.3),
            z: THREE.MathUtils.randFloat(0.1, 0.3),
        },
    });

    useFrame((state, delta) => {
        if (!ref.current) return;

        const { geometry, position, rotation } = ref.current;
        const time = state.clock.getElapsedTime();

        //* Update progress
        progress.current += delta * speed;

        //* Animation calculations
        const t = Math.min(
            1,
            Math.max(0, progress.current - index / PETAL_COUNT)
        );
        const eased = 1 - (1 - t) * (1 - t); // easeOutQuad

        //* POSITION LOGIC
        position.x = (-1 + eased * 2) * width + data.offset.x;
        position.y = (1 - eased * 2) * height + data.offset.y;
        position.z += Math.sin(time + index) * 0.01 * delta;

        //* ROTATION LOGIC
        rotation.x += delta * data.spin.x * (1 + Math.sin(time * 0.5) * 0.2);
        rotation.y += delta * data.spin.y * (1 + Math.sin(time * 0.3) * 0.2);
        rotation.z += delta * data.spin.z * (1 + Math.sin(time * 0.4) * 0.2);

        //* FADE OUT LOGIC
        if (geometry.attributes.aOpacity) {
            const startFadeY = -height * 0.3;
            const endFadeY = -height * 0.4;
            if (position.y <= startFadeY) {
                const distanceFromEnd = position.y - endFadeY;
                const fadeRange = startFadeY - endFadeY;

                const fadeProgress = Math.max(
                    0,
                    1 - distanceFromEnd / fadeRange
                );

                const opacity = THREE.MathUtils.clamp(
                    0.8 * (1 - Math.pow(fadeProgress, 2)),
                    0,
                    0.8
                );

                geometry.attributes.aOpacity.needsUpdate = true;
                geometry.attributes.aOpacity.array[index] = opacity;
            }
        }

        //* RESET LOGIC
        const isOffscreenX = position.x > width * 0.8;
        const isOffscreenY = position.y < -height * 0.6;
        const isComplete = t >= 0.99;

        if (isComplete || isOffscreenX || isOffscreenY) {
            //* Reset position to starting position with some randomness
            position.x = -width;
            position.y = height;
            position.z = THREE.MathUtils.randFloat(-3, 3);

            //* Reset animation progress
            progress.current = index / PETAL_COUNT;

            if (geometry.attributes.aOpacity) {
                geometry.attributes.aOpacity.needsUpdate = true;
                geometry.attributes.aOpacity.array[index] = 0.8;
            }
        }
    });

    return <Instance ref={ref} {...data} />;
};

export default function FlyingPetals({ geometry, material, speed }) {
    const { viewport } = useThree();
    const { width, height } = viewport;

    return (
        <Instances
            limit={PETAL_COUNT}
            range={PETAL_COUNT}
            geometry={geometry}
            material={material}
            frustumCulled={true}
        >
            <InstancedAttribute name="aOpacity" defaultValue={0.8} />
            {Array.from({ length: PETAL_COUNT }, (_, i) => (
                <Petal
                    key={i}
                    index={i}
                    width={width}
                    height={height}
                    speed={speed}
                />
            ))}
        </Instances>
    );
}
