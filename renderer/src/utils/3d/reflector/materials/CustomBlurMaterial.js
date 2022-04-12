import { GLSL3, NoBlending, RawShaderMaterial, Uniform, Vector2 } from 'three';

//import vertexShader from '../shaders/ReflectorBlurPass.vert.js';
//import fragmentShader from '../shaders/ReflectorBlurPass.frag.js';

import vertexShader from '../shaders/BlurMaterial.vert.js';
import fragmentShader from '../shaders/BlurMaterial.frag.js';

export class CustomBlurMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: new Uniform(null),
                u_horizontal: { value : true },
                u_sampleStep : { type: "i",  value : 1.0 }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthWrite: false,
            depthTest: false
        });
    }
}
