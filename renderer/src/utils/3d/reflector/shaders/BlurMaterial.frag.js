import blendOverlay from './modules/blending/overlay.glsl.js';
import dither from './modules/dither/dither.glsl.js';

export default /* glsl */`
precision highp float;

uniform sampler2D tMap;
uniform sampler2D tReflect;
uniform vec3 uColor;

uniform bool u_horizontal;
uniform int u_sampleStep;

in vec2 vUv;
in vec4 vCoord;

out vec4 FragColor;

const float[5] weights = float[](0.2270270, 0.1945945, 0.1216216, 0.0540540, 0.0162162);

ivec2 clampCoord(ivec2 coord, ivec2 size) {
  return max(min(coord, size - 1), 0);
}

${blendOverlay}
${dither}

void main() {

    vec4 base = texture(tMap, vUv);
    vec4 blend = textureProj(tReflect, vCoord);

    ivec2 coord = ivec2(gl_FragCoord.xy);
    ivec2 size = textureSize(tMap, 0);

    vec3 sum = weights[0] * texelFetch(tMap, coord, 0).rgb;

    for (int i = 1; i < 5; i++) {
      ivec2 offset = (u_horizontal ? ivec2(i, 0) : ivec2(0, i)) * u_sampleStep;
      sum += weights[i] * texelFetch(tMap, clampCoord(coord + offset, size), 0).rgb;
      sum += weights[i] * texelFetch(tMap, clampCoord(coord - offset, size), 0).rgb;
    }

    FragColor = vec4(sum, 1.0);

    #ifdef DITHERING
        FragColor.rgb = dither(FragColor.rgb);
    #endif
}
`;
