import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Effects() {
    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0.3}
                luminanceSmoothing={0.9}
                intensity={0.5}
            />
        </EffectComposer>
    );
}
