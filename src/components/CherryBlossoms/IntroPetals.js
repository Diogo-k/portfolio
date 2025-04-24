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

const PETAL_COUNT = 150;

const Petal = memo(function Petal({
    index,
    width,
    height,
    isIntroCrossedCenter,
    setIsIntroCrossedCenter,
    isIntroComplete,
    setIsIntroComplete,
    ...props
}) {
    const ref = useRef();

    const progressRef = useRef(0);

    const initialRotation = useRef(props.rotation.clone());

    useFrame((state, delta) => {
        if (!ref.current) return;

        const { position, rotation } = ref.current;
        const time = state.clock.getElapsedTime();

        //* Calculate progress (from 0 to 1)
        progressRef.current += delta * props.speed;
        const t = Math.min(Math.max(0, progressRef.current - props.offset), 1);

        //* Move from top-left to bottom-right in a straight line
        position.x = (-1 + t * 2) * width * 1.2 + props.position.x;
        position.y = (1 - t * 2) * height * 1.2 + props.position.y;

        //* ROTATION LOGIC
        rotation.x = initialRotation.current.x + time * props.spin.x * 0.5;
        rotation.y = initialRotation.current.y + time * props.spin.y * 0.5;
        rotation.z = initialRotation.current.z + time * props.spin.z * 0.5;

        const sinValue = Math.sin(time * 0.5) * 0.1;
        const cosValue = Math.cos(time * 0.3) * 0.1;
        rotation.x += sinValue;
        rotation.z += cosValue;

        if (
            index === PETAL_COUNT / 2 - 1 &&
            position.x > 0 &&
            !isIntroCrossedCenter
        ) {
            // console.log('Intro Crossed the Center!');
            setIsIntroCrossedCenter(true);
        }

        const rightEdge = width / 2;
        if (
            index === PETAL_COUNT - 1 &&
            position.x > rightEdge &&
            !isIntroComplete
        ) {
            // console.log('Intro Complete - All Petals are Off Screen!');
            setIsIntroComplete(true);
        }
    });

    return <Instance ref={ref} {...props} />;
});

export default memo(function IntroPetals({
    setIsIntroCrossedCenter,
    isIntroCrossedCenter,
    setIsIntroComplete,
    isIntroComplete,
}) {
    const { nodes } = useGLTF('/petal.glb');
    const material = usePetalMaterial(nodes.petal.material);

    const { viewport } = useThree();
    const { width, height } = viewport;

    const petals = useMemo(
        () =>
            Array.from({ length: PETAL_COUNT }, (_, i) => {
                return {
                    index: i,
                    offset: (i / PETAL_COUNT) * 0.5,
                    speed: 0.65, // 0.65
                    position: new THREE.Vector3(
                        THREE.MathUtils.randFloatSpread(width * 0.2),
                        THREE.MathUtils.randFloatSpread(height * 0.4),
                        THREE.MathUtils.randFloat(2, 3)
                    ),
                    rotation: new THREE.Euler(
                        THREE.MathUtils.randFloat(0, Math.PI * 2),
                        THREE.MathUtils.randFloat(0, Math.PI * 2),
                        THREE.MathUtils.randFloat(0, Math.PI * 2)
                    ),
                    scale: new THREE.Vector3().setScalar(
                        THREE.MathUtils.randFloat(0.8, 1.2)
                    ),
                    spin: {
                        x: THREE.MathUtils.randFloat(-0.8, 0.8),
                        y: THREE.MathUtils.randFloat(-0.8, 0.8),
                        z: THREE.MathUtils.randFloat(-0.8, 0.8),
                    },
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
                <Petal
                    key={i}
                    width={width}
                    height={height}
                    isIntroCrossedCenter={isIntroCrossedCenter}
                    setIsIntroCrossedCenter={setIsIntroCrossedCenter}
                    isIntroComplete={isIntroComplete}
                    setIsIntroComplete={setIsIntroComplete}
                    {...props}
                />
            ))}
        </Instances>
    );
});
