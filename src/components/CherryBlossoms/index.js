'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Configuration constants
const CONFIG = {
    INTRO: {
        PETAL_COUNT: 150,
        DURATION: 2750,
        START_X: -1,
        START_Y: 15,
        CONTROL_X: 10,
        CONTROL_Y: -8,
        END_X: 25,
        END_Y: -15,
        Z_POSITION: 4.5,
        ROTATION: -0.35,
        ROTATION_SPEED: 0.01,
    },
    MAIN: {
        PETAL_COUNT: 30,
        SCALE: [0.1, 0.1, 0.1],
        MATERIAL: {
            COLOR: new THREE.Color(1, 0.3, 0.3),
            OPACITY: 0.8,
        },
        VELOCITY: {
            X: {
                MIN: -0.007,
                MAX: 0.007,
            },
            Y: {
                MIN: -0.008,
                MAX: -0.005,
            },
            Z: 0,
        },
        ROTATION: {
            SPEED: 0.003,
            VARIANCE: 0.8,
        },
        COLLISION: {
            SPHERE_RADIUS: 0.2,
            SLIDE_FACTOR: 0.01,
            MIN_VELOCITY_Y: -0.015,
            DAMPENING: 0.7,
            CHECK_RADIUS: 2,
        },
        FADE: {
            TOP_Y: -2,
            BOTTOM_Y: -6,
            VARIANCE: 2,
        },
        BOUNDS: {
            TOP: 15,
            BOTTOM: -10,
            SPAWN_Y_MIN: 9,
            SPAWN_Y_MAX: 13,
        },
    },
    CAMERA: {
        POSITION: [0, 0, 10],
        FOV: 75,
    },
    LIGHTING: {
        AMBIENT: { INTENSITY: 0.8 },
        DIRECTIONAL: { POSITION: [2, 2, 2], INTENSITY: 1 },
    },
};

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
    const startTime = useRef(performance.now());

    useFrame(() => {
        const elapsed =
            (performance.now() - startTime.current) / CONFIG.INTRO.DURATION;

        // Curved path: Quadratic Bezier-like curve from top-left to middle, then right
        const startX = -canvasWidth;
        const startY = CONFIG.INTRO.START_Y;
        const controlX = CONFIG.INTRO.CONTROL_X;
        const controlY = CONFIG.INTRO.CONTROL_Y;
        const endX = canvasWidth + CONFIG.INTRO.END_X;
        const endY = CONFIG.INTRO.END_Y;

        // Quadratic Bezier curve formula
        const t = Math.min(elapsed, 1);
        const u = 1 - t;

        group.current.rotation.set(0, 0, CONFIG.INTRO.ROTATION);

        group.current.position.x =
            u * u * startX + 2 * u * t * controlX + t * t * endX;

        group.current.position.y =
            u * u * startY + 2 * u * t * controlY + t * t * endY;

        group.current.position.z = CONFIG.INTRO.Z_POSITION;

        // Delete if off screen
        if (group.current.position.x > canvasWidth + 20) {
            allIntroPetals.length = 0;
            setIsIntroFinished(true);
        }
    });

    return <group ref={group}>{children}</group>;
};

const IntroPetal = ({ canvasWidth, index, allIntroPetals }) => {
    const mesh = useRef();
    const isInitialized = useRef(false);
    const initialPosition = useRef(
        new THREE.Vector3(
            (Math.random() - 0.5) * canvasWidth,
            Math.random() * 6 + -3,
            0
        )
    );

    useEffect(() => {
        if (mesh.current) {
            mesh.current.position.copy(initialPosition.current);
            mesh.current.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Apply Material Properties
            mesh.current.traverse((child) => {
                if (child.isMesh) {
                    child.material.color = CONFIG.MAIN.MATERIAL.COLOR;
                    child.material.transparent = true;
                    child.material.opacity = CONFIG.MAIN.MATERIAL.OPACITY;
                }
            });

            allIntroPetals[index] = mesh.current;
            isInitialized.current = true;
        }
    }, []); // eslint-disable-line

    useFrame(() => {
        if (!isInitialized.current) return;

        mesh.current.rotation.x += CONFIG.INTRO.ROTATION_SPEED * Math.random();
        mesh.current.rotation.y += CONFIG.INTRO.ROTATION_SPEED * Math.random();
    });

    return (
        <mesh ref={mesh} scale={CONFIG.MAIN.SCALE}>
            <PetalModel />
        </mesh>
    );
};

const Petal = ({ canvasWidth, index, allPetals }) => {
    const mesh = useRef();
    const isInitialized = useRef(false);
    const initialPosition = useRef(
        new THREE.Vector3(
            (Math.random() - 0.5) * canvasWidth,
            Math.random() *
                (CONFIG.MAIN.BOUNDS.SPAWN_Y_MAX -
                    CONFIG.MAIN.BOUNDS.SPAWN_Y_MIN) +
                CONFIG.MAIN.BOUNDS.SPAWN_Y_MIN,
            0
        )
    );

    useEffect(() => {
        if (mesh.current) {
            mesh.current.position.copy(initialPosition.current);

            mesh.current.userData = {
                velocity: new THREE.Vector3(
                    THREE.MathUtils.lerp(
                        CONFIG.MAIN.VELOCITY.X.MIN,
                        CONFIG.MAIN.VELOCITY.X.MAX,
                        Math.random()
                    ),
                    THREE.MathUtils.lerp(
                        CONFIG.MAIN.VELOCITY.Y.MIN,
                        CONFIG.MAIN.VELOCITY.Y.MAX,
                        Math.random()
                    ),
                    CONFIG.MAIN.VELOCITY.Z
                ),
                boundingSphere: new THREE.Sphere(
                    mesh.current.position,
                    CONFIG.MAIN.COLLISION.SPHERE_RADIUS
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
                    child.material.color = CONFIG.MAIN.MATERIAL.COLOR;
                    child.material.transparent = true;
                    child.material.opacity = CONFIG.MAIN.MATERIAL.OPACITY;
                }
            });

            allPetals[index] = mesh.current;
            isInitialized.current = true;
        }
    }, []); // eslint-disable-line

    useFrame(() => {
        if (!isInitialized.current) return;

        if (mesh.current?.userData?.velocity) {
            const { position, userData } = mesh.current;

            // Update position and rotation
            position.add(userData.velocity);
            mesh.current.rotation.x +=
                CONFIG.MAIN.ROTATION.SPEED *
                (1 + Math.random() * CONFIG.MAIN.ROTATION.VARIANCE);
            mesh.current.rotation.y +=
                CONFIG.MAIN.ROTATION.SPEED *
                (1 + Math.random() * CONFIG.MAIN.ROTATION.VARIANCE);

            // Update bounding sphere
            userData.boundingSphere.center.copy(position);

            // Optimized collision detection
            const checkRadius = CONFIG.MAIN.COLLISION.CHECK_RADIUS;
            allPetals.forEach((otherPetal, i) => {
                if (i !== index && otherPetal) {
                    const distance = position.distanceTo(otherPetal.position);
                    if (distance > checkRadius) return; // Skip distant petals

                    const otherSphere = otherPetal.userData.boundingSphere;
                    const minDistance =
                        userData.boundingSphere.radius + otherSphere.radius;

                    if (distance < minDistance) {
                        const collisionDir = position
                            .clone()
                            .sub(otherPetal.position)
                            .normalize();
                        const slideFactor =
                            collisionDir.x > 0
                                ? CONFIG.MAIN.COLLISION.SLIDE_FACTOR
                                : -CONFIG.MAIN.COLLISION.SLIDE_FACTOR;

                        userData.velocity.x += slideFactor;
                        userData.velocity.y = Math.min(
                            userData.velocity.y,
                            CONFIG.MAIN.COLLISION.MIN_VELOCITY_Y
                        );

                        otherPetal.userData.velocity.x -= slideFactor;
                        otherPetal.userData.velocity.y = Math.min(
                            otherPetal.userData.velocity.y,
                            CONFIG.MAIN.COLLISION.MIN_VELOCITY_Y
                        );

                        userData.velocity.multiplyScalar(
                            CONFIG.MAIN.COLLISION.DAMPENING
                        );
                        otherPetal.userData.velocity.multiplyScalar(
                            CONFIG.MAIN.COLLISION.DAMPENING
                        );
                    }
                }
            });

            let opacity = CONFIG.MAIN.MATERIAL.OPACITY;
            const { TOP_Y, BOTTOM_Y } = CONFIG.MAIN.FADE;

            // Calculate fade based on distance from bottom
            if (position.y <= TOP_Y) {
                // Start fading when reaching TOP_Y
                const distanceFromBottom = position.y - BOTTOM_Y;
                const fadeRange = TOP_Y - BOTTOM_Y;
                const fadeProgress = Math.max(
                    0,
                    1 - distanceFromBottom / fadeRange
                );

                // Use a smoother easing function for the fade
                opacity = THREE.MathUtils.clamp(
                    CONFIG.MAIN.MATERIAL.OPACITY *
                        (1 - Math.pow(fadeProgress, 1.5)),
                    0,
                    CONFIG.MAIN.MATERIAL.OPACITY
                );
            }

            // Ensure complete fade at bottom
            if (position.y <= BOTTOM_Y) {
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
                position.y < CONFIG.MAIN.BOUNDS.BOTTOM ||
                position.y > CONFIG.MAIN.BOUNDS.TOP ||
                position.x < -canvasWidth / 2 ||
                position.x > canvasWidth / 2
            ) {
                position.set(
                    (Math.random() - 0.5) * canvasWidth,
                    Math.random() *
                        (CONFIG.MAIN.BOUNDS.SPAWN_Y_MAX -
                            CONFIG.MAIN.BOUNDS.SPAWN_Y_MIN) +
                        CONFIG.MAIN.BOUNDS.SPAWN_Y_MIN,
                    0
                );
            }
        } else {
            console.warn(`Petal ${index} has incomplete data`);
        }
    });

    return (
        <mesh ref={mesh} scale={CONFIG.MAIN.SCALE}>
            <PetalModel />
        </mesh>
    );
};

const CherryBlossoms = () => {
    const allIntroPetals = useRef([]);
    const allPetals = useRef([]);
    const canvasRef = useRef();
    const [canvasWidth, setCanvasWidth] = useState(20);
    const [isIntroFinished, setIsIntroFinished] = useState(false);
    const [showMainPetals, setShowMainPetals] = useState(false);

    useEffect(() => {
        allIntroPetals.current = Array(CONFIG.INTRO.PETAL_COUNT).fill(null);
        allPetals.current = Array(CONFIG.MAIN.PETAL_COUNT).fill(null);
    }, []);

    useEffect(() => {
        if (isIntroFinished) {
            // Add a small delay before showing main petals to ensure smooth transition
            const timer = setTimeout(() => {
                setShowMainPetals(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isIntroFinished]);

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
            camera={{
                position: CONFIG.CAMERA.POSITION,
                fov: CONFIG.CAMERA.FOV,
            }}
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

            {showMainPetals &&
                allPetals.current.map((_, i) => (
                    <Petal
                        key={i}
                        canvasWidth={canvasWidth}
                        index={i}
                        allPetals={allPetals.current}
                    />
                ))}

            <ambientLight intensity={CONFIG.LIGHTING.AMBIENT.INTENSITY} />
            <directionalLight
                position={CONFIG.LIGHTING.DIRECTIONAL.POSITION}
                intensity={CONFIG.LIGHTING.DIRECTIONAL.INTENSITY}
            />
        </Canvas>
    );
};

export default CherryBlossoms;
