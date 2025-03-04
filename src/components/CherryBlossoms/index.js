'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Preload the petal model
useGLTF.preload('/petal.glb');

// Load the cherry blossom petal model
const PetalModel = () => {
    const { scene } = useGLTF('/petal.glb');
    return <primitive object={scene.clone()} />;
};

const IntroContainer = ({
    canvasWidth,
    allIntroPetals,
    setIsIntroFinished,
    children,
}) => {
    const group = useRef();

    const startTime = useRef(performance.now()); // Track start time for animation timing
    const duration = 2750; // 3 seconds for the curve (adjust for speed)

    useFrame(() => {
        const elapsed = (performance.now() - startTime.current) / duration;

        // Curved path: Quadratic Bezier-like curve from top-left to middle, then right
        const startX = -canvasWidth; // Starting X (left edge, adjusted by spread)
        const startY = 15; // Starting Y (top)
        const controlX = 10; // Control point X (middle of screen)
        const controlY = -8; // Control point Y (middle of screen)
        const endX = canvasWidth + 25; // Ending X (right edge) TODO: TRULY UNDERSTAND AND ADJUST THIS VALUE
        const endY = -15; // Ending Y (horizontal line at Y = 0)

        // Quadratic Bezier curve formula
        const t = Math.min(elapsed, 1); // Ensure t doesn’t exceed 1
        const u = 1 - t;

        group.current.rotation.set(0, 0, -0.35);

        group.current.position.x =
            u * u * startX + 2 * u * t * controlX + t * t * endX;

        group.current.position.y =
            u * u * startY + 2 * u * t * controlY + t * t * endY;

        group.current.position.z = 4.5; // Make petals more close

        // Delete if off screen
        if (
            group.current.position.x >
            canvasWidth + 20 // Right edge TODO: TRULY UNDERSTAND ADJUST THIS VALUE
        ) {
            //! TODO: FIND A BETTER WAY TO DO THIS
            allIntroPetals.length = 0;
            setIsIntroFinished(true);
        }
    });

    return <group ref={group}>{children}</group>;
};

const IntroPetal = ({ canvasWidth, index, allIntroPetals }) => {
    const mesh = useRef();

    const initialPosition = useRef(
        new THREE.Vector3(
            (Math.random() - 0.5) * canvasWidth, // Centered X Distribution
            Math.random() * 6 + -3, // Y between 6 (top) and -3 (bottom)
            0
        )
    );

    useEffect(() => {
        if (mesh.current) {
            // Set random initial position and rotation
            mesh.current.position.copy(initialPosition.current);
            mesh.current.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Apply Material Properties
            mesh.current.traverse((child) => {
                if (child.isMesh) {
                    child.material.color = new THREE.Color(1, 0.3, 0.3);
                    child.material.transparent = true;
                    child.material.opacity = 0.8;
                }
            });

            allIntroPetals[index] = mesh.current;
        }
    }, []); // eslint-disable-line

    useFrame(() => {
        mesh.current.rotation.x += 0.03 * Math.random();
        mesh.current.rotation.y += 0.03 * Math.random();
    });

    return (
        <mesh ref={mesh} scale={[0.1, 0.1, 0.1]}>
            <PetalModel />
        </mesh>
    );
};

const Petal = ({ canvasWidth, index, allPetals }) => {
    const mesh = useRef();
    const initialPosition = useRef(
        new THREE.Vector3(
            (Math.random() - 0.5) * canvasWidth, // Centered X distribution // TODO: TRULY UNDERSTAND THIS VALUES!
            Math.random() * -3 + 13, // TODO: TRULY UNDERSTAND THIS VALUES! (but they are adjusted for perfect spawn after the intro)
            0
        )
    );

    useEffect(() => {
        if (mesh.current) {
            mesh.current.position.copy(initialPosition.current);

            mesh.current.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    -Math.random() * 0.03 - 0.01,
                    0
                ),
                boundingSphere: new THREE.Sphere(
                    mesh.current.position,
                    0.2 // Collision detection Sphere
                ),
            };

            mesh.current.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Apply Material Properties
            mesh.current.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                    child.material.color = new THREE.Color(1, 0.3, 0.3);
                    child.material.transparent = true;
                    child.material.opacity = 0.8;
                }
            });

            allPetals[index] = mesh.current;
        }
    }, []); // eslint-disable-line

    useFrame(() => {
        if (mesh.current?.userData?.velocity) {
            const { position, userData } = mesh.current; //* Get data that was defined in useEffect

            // Update position and rotation
            position.add(userData.velocity);
            mesh.current.rotation.x += 0.01 * Math.random();
            mesh.current.rotation.y += 0.01 * Math.random();

            // Update bounding sphere
            userData.boundingSphere.center.copy(position);

            // Slide-based collision response
            allPetals.forEach((otherPetal, i) => {
                if (i !== index && otherPetal) {
                    const otherSphere = otherPetal.userData.boundingSphere;
                    const distance = position.distanceTo(otherPetal.position);
                    const minDistance =
                        userData.boundingSphere.radius + otherSphere.radius;

                    if (distance < minDistance) {
                        // Calculate direction of collision
                        const collisionDir = position
                            .clone()
                            .sub(otherPetal.position)
                            .normalize();

                        // Determine slide direction (left or right based on relative X position)
                        const slideFactor = collisionDir.x > 0 ? 0.03 : -0.03; // Slide right or left

                        // Adjust velocities for a sliding effect
                        userData.velocity.x += slideFactor; // Slide this petal
                        userData.velocity.y = Math.min(
                            userData.velocity.y,
                            -0.02
                        ); // Ensure downward motion

                        otherPetal.userData.velocity.x -= slideFactor; // Slide other petal oppositely
                        otherPetal.userData.velocity.y = Math.min(
                            otherPetal.userData.velocity.y,
                            -0.02
                        );

                        // Dampen velocities to avoid chaos
                        userData.velocity.multiplyScalar(0.5);
                        otherPetal.userData.velocity.multiplyScalar(0.5);
                    }
                }
            });

            let opacity = 0.8; // Default opacity
            const topY = -2; // Start decreasing opacity from this position
            const bottomY = -6; // Make sure that at this position the opacity is 0
            const fadeRange = topY - bottomY;

            if (position.y <= topY) {
                // Start fading immediately after reaching topY
                const progress = (topY - position.y) / fadeRange; // 0 at Y = 13, 1 at Y = -6
                opacity = THREE.MathUtils.clamp(
                    0.8 * (1 - Math.pow(progress, 0.5)),
                    0,
                    0.8
                ); // Slow fade using square root
            }

            if (position.y < bottomY) {
                opacity = 0;
            }

            mesh.current.traverse((child) => {
                if (child.isMesh) {
                    child.material.opacity = opacity;
                    child.material.needsUpdate = true;
                }
            });

            // Reset if off screen
            if (
                position.y < -10 || // Below bottom
                position.y > 15 || // Above top
                position.x < -canvasWidth / 2 || // Left edge
                position.x > canvasWidth / 2 // Right edge
            ) {
                position.set(
                    (Math.random() - 0.5) * canvasWidth,
                    Math.random() * -4 + 13, // TODO: TRULY UNDERSTAND THIS VALUES! (but right now they are adjusted for perfect spawn after the intro and first 25 petals)
                    0
                );
            }
        } else {
            console.warn(`Petal ${index} has incomplete data`);
        }
    });

    return (
        <mesh ref={mesh} scale={[0.1, 0.1, 0.1]}>
            <PetalModel />
        </mesh>
    );
};

const CherryBlossoms = () => {
    const allIntroPetals = useRef([]);
    const introPetalCount = 150;

    const allPetals = useRef([]);
    const petalCount = 30;

    const canvasRef = useRef();
    const [canvasWidth, setCanvasWidth] = useState(20);

    const [isIntroFinished, setIsIntroFinished] = useState(false);

    useEffect(() => {
        allIntroPetals.current = Array(introPetalCount).fill(null); // Simplified array
        allPetals.current = Array(petalCount).fill(null); // Simplified array
    }, [petalCount]);

    useEffect(() => {
        const updateWidth = () => {
            if (canvasRef.current) {
                const width = window.innerWidth / 50;
                setCanvasWidth(width);
            }
        };

        updateWidth();

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 10], fov: 75 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
            }}
            className="bg-background-light dark:bg-background-dark"
        >
            {!isIntroFinished && (
                <IntroContainer
                    canvasWidth={canvasWidth}
                    allIntroPetals={allIntroPetals.current}
                    setIsIntroFinished={setIsIntroFinished}
                >
                    {allIntroPetals.current.map((_, i) => (
                        <IntroPetal
                            key={i}
                            canvasWidth={canvasWidth}
                            index={i}
                            allIntroPetals={allIntroPetals.current}
                        />
                    ))}
                </IntroContainer>
            )}

            {isIntroFinished &&
                allPetals.current.map((_, i) => (
                    <Petal
                        key={i}
                        canvasWidth={canvasWidth}
                        index={i}
                        allPetals={allPetals.current}
                    />
                ))}

            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 2, 2]} intensity={1} />
        </Canvas>
    );
};

export default CherryBlossoms;
