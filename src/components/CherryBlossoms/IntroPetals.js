'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useThree, useFrame } from '@react-three/fiber';
import { Instances, Instance, InstancedAttribute } from '@react-three/drei';
import { Vector3, Euler, MathUtils } from 'three';

/**
 * A single petal component for the cherry blossoms intro
 *
 * @param {number} index - The index of the petal
 * @param {number} width - The width of the viewport
 * @param {number} height - The height of the viewport
 * @param {boolean} isIntroCrossedCenter - Whether the intro has crossed the center
 * @param {function} setIsIntroCrossedCenter - Function to set the intro crossed center state
 * @param {boolean} isIntroComplete - Whether the intro is complete
 * @param {function} setIsIntroComplete - Function to set the intro complete state
 * @param {number} count - The total number of petals
 * @returns {React.ReactNode} The rendered component
 */
const Petal = ({
    index,
    width,
    height,
    isIntroCrossedCenter,
    setIsIntroCrossedCenter,
    isIntroComplete,
    setIsIntroComplete,
    count,
    ...props
}) => {
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

Petal.propTypes = {
    index: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isIntroCrossedCenter: PropTypes.bool.isRequired,
    setIsIntroCrossedCenter: PropTypes.func.isRequired,
    isIntroComplete: PropTypes.bool.isRequired,
    setIsIntroComplete: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
};

/**
 * The main component for the cherry blossoms intro petals
 *
 * @param {THREE.BufferGeometry} geometry - The geometry of the petals
 * @param {THREE.MeshStandardMaterial} material - The material of the petals
 * @param {function} setIsIntroCrossedCenter - Function to set the intro crossed center state
 * @param {boolean} isIntroCrossedCenter - Whether the intro has crossed the center
 * @param {function} setIsIntroComplete - Function to set the intro complete state
 * @param {boolean} isIntroComplete - Whether the intro is complete
 * @param {number} count - The total number of petals
 * @returns {React.ReactNode} The rendered component
 */
const IntroPetals = ({
    geometry,
    material,
    setIsIntroCrossedCenter,
    isIntroCrossedCenter,
    setIsIntroComplete,
    isIntroComplete,
    count = 126,
}) => {
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
};

IntroPetals.propTypes = {
    geometry: PropTypes.object.isRequired, //* THREE.BufferGeometry
    material: PropTypes.object.isRequired, //* THREE.MeshStandardMaterial
    setIsIntroCrossedCenter: PropTypes.func.isRequired,
    isIntroCrossedCenter: PropTypes.bool.isRequired,
    setIsIntroComplete: PropTypes.func.isRequired,
    isIntroComplete: PropTypes.bool.isRequired,
    count: PropTypes.number,
};

IntroPetals.defaultProps = {
    count: 126,
};

export default IntroPetals;
