'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Instances, Instance, InstancedAttribute } from '@react-three/drei';
import { Vector3, Euler, MathUtils } from 'three';

const Petal = function Petal({
    index,
    width,
    height,
    isIntroCrossedCenter,
    setIsIntroCrossedCenter,
    isIntroComplete,
    setIsIntroComplete,
    count,
    ...props
}) {
    const ref = useRef();
    const progressRef = useRef(0);

    useFrame((state, delta) => {
        if (!ref.current) return;

        const { position, rotation } = ref.current;

        //* Update and calculate progress
        progressRef.current += delta * props.speed;
        const t = Math.min(Math.max(0, progressRef.current - props.offset), 1);

        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        //* POSITION LOGIC
        position.x = (-1 + eased * 2) * width + props.position.x;
        position.y = (1 - eased * 2) * height + props.position.y;

        //* ROTATION LOGIC
        rotation.x += delta * props.spin.x;
        rotation.y += delta * props.spin.y;
        rotation.z += delta * props.spin.z;

        //* CROSS CENTER LOGIC
        if (
            index === count / 2 - 1 &&
            position.x > 0 &&
            !isIntroCrossedCenter
        ) {
            setIsIntroCrossedCenter(true);
        }

        //* COMPLETE LOGIC
        const rightEdge = width / 2;
        if (index === count - 1 && position.x > rightEdge && !isIntroComplete) {
            setIsIntroComplete(true);
        }
    });

    return <Instance ref={ref} {...props} />;
};

export default function IntroPetals({
    geometry,
    material,
    setIsIntroCrossedCenter,
    isIntroCrossedCenter,
    setIsIntroComplete,
    isIntroComplete,
    count = 126,
}) {
    const { viewport } = useThree();
    const { width, height } = viewport;

    const petals = useMemo(
        () =>
            Array.from({ length: count }, (_, index) => {
                return {
                    index,
                    offset: (index / count) * 0.5,
                    speed: 0.75,
                    scale: new Vector3().setScalar(
                        MathUtils.randFloat(0.8, 1.2)
                    ),
                    position: new Vector3(
                        MathUtils.randFloatSpread(width * 0.2),
                        MathUtils.randFloatSpread(height * 0.4),
                        MathUtils.randFloat(2, 4)
                    ),
                    rotation: new Euler(
                        MathUtils.randFloat(0, Math.PI * 2),
                        MathUtils.randFloat(0, Math.PI * 2),
                        MathUtils.randFloat(0, Math.PI * 2)
                    ),
                    spin: {
                        x: MathUtils.randFloat(0.2, 0.6),
                        y: MathUtils.randFloat(0.2, 0.6),
                        z: MathUtils.randFloat(0.2, 0.6),
                    },
                };
            }),
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        return () => {
            if (geometry) {
                geometry.dispose();
            }
            if (material) {
                material.dispose();
            }
        };
    }, [geometry, material]);

    return (
        <Instances
            limit={count}
            range={count}
            geometry={geometry}
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
                    count={count}
                    {...props}
                />
            ))}
        </Instances>
    );
}
