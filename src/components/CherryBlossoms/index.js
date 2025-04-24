'use client';

import React, { memo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

// import IntroPetals from './IntroPetals';
import FlyingPetals from './FlyingPetals';
// import FallingPetals from './FallingPetals';

export default memo(function CherryBlossomsContainer({
    isIntroCrossedCenter,
    setIsIntroCrossedCenter,
}) {
    const [isIntroComplete, setIsIntroComplete] = useState(true);

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
            dpr={[1, 2]}
        >
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Preload all />

            {/* {!isIntroComplete && (
                <IntroPetals
                    isIntroCrossedCenter={isIntroCrossedCenter}
                    setIsIntroCrossedCenter={setIsIntroCrossedCenter}
                    isIntroComplete={isIntroComplete}
                    setIsIntroComplete={setIsIntroComplete}
                />
            )} */}

            {isIntroComplete && <FlyingPetals />}
        </Canvas>
    );
});
