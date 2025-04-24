import { useMemo } from 'react';
import * as THREE from 'three';

export default function usePetalMaterial(petalMaterial) {
    return useMemo(() => {
        const material = petalMaterial.clone();

        material.color = new THREE.Color(1, 0.3, 0.3);
        material.transparent = true;
        material.depthWrite = false;

        material.onBeforeCompile = (shader) => {
            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>',
                `
                #include <common>
                attribute float aOpacity; // Add aOpacity attribute
                varying float vOpacity; // Pass aOpacity to fragment shader
                `
            );
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                vOpacity = aOpacity; // Assign aOpacity to vOpacity
                `
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <common>',
                `
                #include <common>
                varying float vOpacity; // Receive opacity value from vertex shader
                `
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `
                gl_FragColor.a *= vOpacity; // Multiply alpha by opacity
                #include <dithering_fragment>
                `
            );
        };

        return material;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
