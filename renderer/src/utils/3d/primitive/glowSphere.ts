import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Color,
  Mesh,
  ShaderMaterial,
  NoBlending,
  AdditiveBlending
} from 'three';

const glowShader = {
  uniforms: {
    coefficient: { value: 0.01 },
    color: { value: new Color('white') },
    power: { value: 1.5 },
    opacity: {value: 0.6 },
    scale: { value: 0.8 }
  },

  fragmentShader: `

        uniform vec3 color;
        uniform float coefficient;
        uniform float power;
        uniform float opacity; 
       
        varying vec3 vVertexNormal;
        varying vec3 vVertexWorldPosition;


        void main() {

                vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
                vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
                viewCameraToVertex = normalize(viewCameraToVertex);

                float intensity	= pow(
                    coefficient + dot(vVertexNormal, viewCameraToVertex),
                    power
                );
                
                intensity = intensity * opacity;

                gl_FragColor = vec4(color, intensity);

        }

    `,

  vertexShader: `
    
        uniform float scale;

        varying vec3 vVertexWorldPosition;
        varying vec3 vVertexNormal;

        void main() {

                vVertexNormal	= normalize(normalMatrix * normal);
                
                vec3 scaledPos = position * vec3(scale);
                vVertexWorldPosition = (modelMatrix * vec4(scaledPos, 1.0)).xyz;

                gl_Position	= projectionMatrix * modelViewMatrix * vec4(scaledPos, 1.0);

        }

    `
}


export const glowMaterial = new ShaderMaterial({

  ...glowShader,
  transparent: true,
  // blending: AdditiveBlending,

})


export function createGlowMesh(geometry: BufferGeometry, size: number = 0.005, color: Color) {

  const geo = geometry.clone();
  // Resize vertex positions according to normals
  const position = new Float32Array(geometry.attributes.position.count * 3);

  for (let idx = 0, len = position.length; idx < len; idx++) {

    const normal = geometry.attributes.normal.array[idx];
    const curPos = geometry.attributes.position.array[idx];
    position[idx] = curPos + normal * size;

  }

  geo.setAttribute('position', new BufferAttribute(position, 3));


  const mat = glowMaterial.clone()
  mat.uniforms.color.value = color
  mat.side = BackSide;


  return new Mesh(geo, mat);

}
