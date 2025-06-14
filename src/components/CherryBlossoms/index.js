'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import { Preload, useGLTF } from '@react-three/drei';
import usePetalMaterial from './usePetalMaterial';
import IntroPetals from './IntroPetals';
import FlyingPetals from './FlyingPetals';

useGLTF.preload('/static/petal.glb');

/**
 * The main component for the cherry blossoms container
 *
 * @param {boolean} isIntroCrossedCenter - Whether the intro has crossed the center
 * @param {function} setIsIntroCrossedCenter - Function to set the intro crossed center state
 * @param {number} flyingSpeed - The speed of the flying petals
 * @param {Object} gpu - The GPU object
 * @returns {React.ReactNode} The rendered component
 */
const CherryBlossomsContainer = ({
    isIntroCrossedCenter,
    setIsIntroCrossedCenter,
    flyingSpeed,
    gpu,
}) => {
    const { nodes } = useGLTF('/static/petal.glb');
    const material = usePetalMaterial(nodes.petal.material);

    const [isIntroComplete, setIsIntroComplete] = useState(false);

    return (
        <Canvas
            gl={{
                powerPreference: 'high-performance',
                failIfMajorPerformanceCaveat: true,
            }}
            camera={{ position: [0, 0, 10], fov: 75 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
            aria-hidden="true"
        >
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Preload all />

            {!isIntroComplete && (
                <IntroPetals
                    geometry={nodes.petal.geometry}
                    material={material}
                    isIntroCrossedCenter={isIntroCrossedCenter}
                    setIsIntroCrossedCenter={setIsIntroCrossedCenter}
                    isIntroComplete={isIntroComplete}
                    setIsIntroComplete={setIsIntroComplete}
                    count={gpu && gpu.isMobile ? 62 : 126}
                />
            )}

            {isIntroComplete && (
                <FlyingPetals
                    geometry={nodes.petal.geometry}
                    material={material}
                    speed={flyingSpeed}
                    count={gpu && gpu.isMobile ? 35 : 75}
                />
            )}
        </Canvas>
    );
};

CherryBlossomsContainer.propTypes = {
    isIntroCrossedCenter: PropTypes.bool.isRequired,
    setIsIntroCrossedCenter: PropTypes.func.isRequired,
    flyingSpeed: PropTypes.number.isRequired,
    gpu: PropTypes.object.isRequired,
};

export default CherryBlossomsContainer;
