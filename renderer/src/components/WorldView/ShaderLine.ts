import { MathUtils } from '@/utils/math'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  Line,
  ShaderMaterial,
  Vector3,
} from 'three'

const lineShader = {
  uniforms: {
    time: { value: 0.0 },

    start: { value: 0.0 },
    goal: { value: 1.0 },
    opacity: { value: 1.0 },

    dashOffset: { value: 0.0 },
    dashSize: { value: 0.2 },
    gapSize: { value: 0.1 },
    dashTranslate: { value: 0.0 },

    uColor: { value: new Vector3(1.0, 1.0, 1.0) },
  },

  vertexShader: `

              attribute vec4 vertexColor;

              attribute float vertexRelDistance;
              
              varying float vRelDistance;

              void main() {

                        vRelDistance = vertexRelDistance;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

              }
        `,

  fragmentShader: `
  
                uniform float time;

                uniform float start;
                uniform float goal;
                uniform float opacity;
                
                uniform float dashOffset;
                uniform float dashSize;
                uniform float gapSize;
                uniform float dashTranslate;

                uniform vec3 uColor;

                varying float vRelDistance;

                void main() {
                
                        vec3 fColor = uColor * vec3(vRelDistance);

                        // if (vRelDistance < dashOffset) discard;
                        // if (mod(vRelDistance - dashOffset, dashSize + gapSize) > dashSize) discard;
                        
                        float a = mod(3.14 * vRelDistance + time, 3.14 * 2.0);
                        float v = (sin(a) + 1.0) / 2.0;
                        
                        float dist = vRelDistance + 0.1;
                        float b= 1.0 - abs(dist * 2.0 - 1.0);
                        float base = b; 
                        
                        float vOpacity = base * opacity;
                        
                        gl_FragColor = vec4(fColor, vOpacity);

                }
        `,
}

// arc material
const arcMaterial = new ShaderMaterial({
  ...lineShader,
  blending: AdditiveBlending,
  transparent: true,
  depthWrite: false,
})

export class ShaderLine {
  geometry: BufferGeometry
  material: ShaderMaterial
  line: Line

  segments: number
  _tw: Tween<any>

  currentStyle: { opacity: number }
  maxOpacity: number

  constructor() {
    this.segments = 100
    this.maxOpacity = 1.0

    this.material = arcMaterial.clone()
    this.currentStyle = { opacity: 1.0 }

    const points = new Float32Array(this.segments * 3)
    const vertexDistanceArray = new Float32BufferAttribute(this.segments, 1)

    for (let i = 0; i < this.segments; i++) {
      points[i * 3] = 0.0
      points[i * 3 + 1] = 0.0
      points[i * 3 + 2] = 0.0

      vertexDistanceArray.setX(i, i / (this.segments - 1))
    }

    // create geometry
    this.geometry = new BufferGeometry()
    this.geometry.setAttribute('position', new BufferAttribute(points, 3))
    this.geometry.setAttribute('vertexRelDistance', vertexDistanceArray)

    this.line = new Line(this.geometry, this.material)
  }

  setPosition(vertex: Vector3[]) {

    const positions = this.geometry.attributes.position.array as number[]

    const posA = vertex[0]
    const posB = vertex[1]

    for (let i = 0; i < this.segments; i++) {
      // set positions
      positions[i * 3] = MathUtils.lerp(posA.x, posB.x, i / (this.segments - 1))
      positions[i * 3 + 1] = MathUtils.lerp(
        posA.y,
        posB.y,
        i / (this.segments - 1)
      )
      positions[i * 3 + 2] = MathUtils.lerp(
        posA.z,
        posB.z,
        i / (this.segments - 1)
      )
    }

    this.geometry.attributes.position.needsUpdate = true
  }

  getLine() {
    return this.line
  }

  update() {
    this.material.uniforms.time.value += 0.001
  }

  show() {
    const target = { opacity: this.maxOpacity }
    this.startTween(target)
  }
  hide() {
    const target = { opacity: 0.0 }
    this.startTween(target)
  }

  startTween(target: any) {
    if (this._tw) this._tw.stop()

    this._tw = new TWEEN.Tween(this.currentStyle)
      .to(target, 2000)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate(() => {
        this.material.uniforms.opacity.value = this.currentStyle.opacity
      })
      .start()
  }
}
