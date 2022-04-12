// const shader = `
// precision highp float;
// uniform sampler2D inputTexture;
// uniform vec2 direction;
// in vec2 vUv;
// out vec4 color;
// void main() {
//   color = texture2D(inputTexture, vUv);
// }`;

const EdgeFadeShader = {
	uniforms: {
		'tDiffuse': { value: null },
		'resolution': { value: null },
		'pixelSize': { value: 1 },

	},

	vertexShader: /* glsl */`
		varying highp vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader: /* glsl */`
		uniform sampler2D tDiffuse;
		uniform float pixelSize;
		uniform vec2 resolution;
		varying highp vec2 vUv;
		void main(){
      vec2 st = vUv/resolution;
      vec4 color = texture2D(tDiffuse, vUv);
      vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
      float dist = distance(vUv, vec2(0.5)) * 2.0;
      float pct = (dist < 0.7) ? 1.0 : 1.0 - smoothstep(0.7, 1.0, dist);
      gl_FragColor = mix(black, color, pct);
		}`

};


export { EdgeFadeShader };
