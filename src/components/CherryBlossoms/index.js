'use client';

import { Suspense, useRef, useState, useEffect } from 'react';

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';

export default function CherryBlossoms() {
    const { scene } = useGLTF('/cherry_blossoms.glb');
    const blossomsRef = useRef();
    const [opacity, setOpacity] = useState(0);
    const { viewport } = useThree(); // Get screen size for scaling movement

    useEffect(() => {
        let frameId;
        let progress = 0;

        const fadeIn = () => {
            progress += 0.02; // Adjust for speed of fade-in
            setOpacity(Math.min(progress, 0.85));
            if (progress < 0.85) {
                frameId = requestAnimationFrame(fadeIn);
            }
        };

        fadeIn();

        return () => cancelAnimationFrame(frameId);
    }, []);

    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(1, 0.3, 0.3),
                transparent: true,
                opacity: opacity,
            });
        }
    });

    useFrame(({ pointer }) => {
        if (blossomsRef.current) {
            const targetRotationY = pointer.x * 0.5; // Stronger horizontal rotation
            const targetRotationX = pointer.y * 0.2; // Subtle vertical rotation

            // Smooth interpolation for natural rotation
            blossomsRef.current.rotation.y +=
                (targetRotationY - blossomsRef.current.rotation.y) * 0.05;
            blossomsRef.current.rotation.x +=
                (targetRotationX - blossomsRef.current.rotation.x) * 0.05;
        }
    });

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <primitive
                ref={blossomsRef}
                object={scene}
                scale={0.1}
                position={[4, 0, 0]}
            />
        </Suspense>
    );
}

useGLTF.preload('/cherry_blossoms.glb');
