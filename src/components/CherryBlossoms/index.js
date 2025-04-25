'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, useGLTF } from '@react-three/drei';

import IntroPetals from './IntroPetals';
import FlyingPetals from './FlyingPetals';

import usePetalMaterial from './usePetalMaterial';

useGLTF.preload('/petal.glb');

export default function CherryBlossomsContainer({
    isIntroCrossedCenter,
    setIsIntroCrossedCenter,
    flyingSpeed,
}) {
    const { nodes } = useGLTF('/petal.glb');
    const material = usePetalMaterial(nodes.petal.material);

    const [isIntroComplete, setIsIntroComplete] = useState(false);

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

            {!isIntroComplete && (
                <IntroPetals
                    geometry={nodes.petal.geometry}
                    material={material}
                    isIntroCrossedCenter={isIntroCrossedCenter}
                    setIsIntroCrossedCenter={setIsIntroCrossedCenter}
                    isIntroComplete={isIntroComplete}
                    setIsIntroComplete={setIsIntroComplete}
                />
            )}

            {isIntroComplete && (
                <FlyingPetals
                    geometry={nodes.petal.geometry}
                    material={material}
                    speed={flyingSpeed}
                />
            )}
        </Canvas>
    );
}
