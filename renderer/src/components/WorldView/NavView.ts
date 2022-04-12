import TWEEN, { Tween } from '@tweenjs/tween.js'
import {
  BufferGeometry,
  Color,
  Matrix4,
  ShaderMaterial,
  TextureLoader,
  Vector3,
  AdditiveBlending,
  BufferAttribute,
  Points,
  RingGeometry,
  Mesh,
  DoubleSide
} from 'three'

import Base from "@/components/Common/instances"

const sphereVertexShaderSrc = `
attribute float size;
attribute vec3 customColor;
varying vec3 vColor;
uniform mat4 uTranslateMat;
uniform float uSize;

void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const sphereFragmentShaderSrc = `
uniform vec3 uColor;
uniform sampler2D uPointTex;
uniform float uOpacity;


varying vec3 vColor;
void main() {
    gl_FragColor = vec4(uColor * vColor, uOpacity);
    gl_FragColor = gl_FragColor * texture2D(uPointTex, gl_PointCoord);
}
`;

const circleVertexShaderSrc = `
uniform float uScale;
uniform vec3 uPosition;

mat4 translate(float x, float y, float z){
  return mat4(
      vec4(1.0, 0.0, 0.0, 0.0),
      vec4(0.0, 1.0, 0.0, 0.0),
      vec4(0.0, 0.0, 1.0, 0.0),
      vec4(x,   y,   z,   1.0)
  );
}

mat4 scale(float x, float y, float z){
  return mat4(
      vec4(x,   0.0, 0.0, 0.0),
      vec4(0.0, y,   0.0, 0.0),
      vec4(0.0, 0.0, z,   0.0),
      vec4(0.0, 0.0, 0.0, 1.0)
  );
}

void main() {
    vec4 scaledPosition = scale(uScale, uScale, uScale) * vec4(position, 1.0);
    vec4 translatedPosition = translate(uPosition.x, uPosition.y, uPosition.z) * scaledPosition;
    vec4 mvPosition = modelViewMatrix * translatedPosition;
    gl_Position = projectionMatrix * mvPosition;
}
`;

const circleFragmentShaderSrc = `
uniform float uOpacity;
uniform vec3 uColor;
void main() {
    gl_FragColor = vec4(uColor, uOpacity);
}
`;

export class NavSphere {
  mesh: Points
  material: ShaderMaterial
  geometry: BufferGeometry
  _tw: Tween<{ t: number}>
  _twParam: { t: number }
  _from: Vector3;
  _to: Vector3;

  constructor() {
    const positions = new Float32Array(3)
    const colors = new Float32Array(3)
    const vertex = new Vector3(0, 0.3, 0)
    const color = new Color(0xffffff)
    vertex.toArray(positions, 0)
    color.toArray(colors, 0)

    this.geometry = new BufferGeometry();
    this.geometry.setAttribute('position', new BufferAttribute(positions, 3));
    this.geometry.setAttribute('customColor', new BufferAttribute(colors, 3));

    this.material = new ShaderMaterial({
        uniforms: {
            uColor: { value: new Color(0xffffff)},
            uPointTex: { value: new TextureLoader().load('img/textures/particles.png')},
            uTranslateMat: { value: new Matrix4().makeTranslation(0, 0, 0)},
            uOpacity: { value: 0.0 },
            uSize: { value: 0.2 }
        },
        vertexShader: sphereVertexShaderSrc,
        fragmentShader: sphereFragmentShaderSrc,
        depthTest: false,
        depthWrite: false,
        transparent: true, 
        side: DoubleSide
    });

    this.mesh = new Points(this.geometry, this.material)
    this.mesh.frustumCulled = false
    Base.getScene().add(this.mesh)
    this._twParam= { t: 0.0 }
  }

  _startTween(duration: number) {
    if (this._tw) this._tw.stop()
    this._tw = new TWEEN.Tween(this._twParam)
      .to({t : 1.0}, duration)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate(() => this._update())
      .onStart(() => {
        this._twParam.t = 0.0
      })
      .onComplete(() => {
        this._twParam.t = 0.0
      })
      .start()
  }

  _update() {
    const t = this._twParam.t
    this._updatePosition(t)
    this._updateSize(t)
    this._updateOpacity(t)
  }

  _updatePosition(t: number) {
    const x = this._from.x + (this._to.x - this._from.x) * t;
    const y = this._from.y + (this._to.y - this._from.y) * t;
    const z = this._from.z + (this._to.z - this._from.z) * t;
    const positionAttib = this.geometry.attributes.position.array as number[];
    positionAttib[0] = x;
    positionAttib[1] = y;
    positionAttib[2] = z;
    this.geometry.attributes.position.needsUpdate = true
  }

  _updateSize(t: number) {
    const uniforms = this.material.uniforms
    uniforms['uSize'].value = t * 0.3
  }

  _updateOpacity(t: number) {
    const pt = t < 0.9 ? t : 9 * (1.0 - t)
    const uniforms = this.material.uniforms
    uniforms['uOpacity'].value = pt
  }


  // ---------- API -------------------------------------------
  // ----------------------------------------------------------
  startAnimation(from: Vector3, to: Vector3, duration: number) {
    this._from = from
    this._to = to
    this._startTween(duration)
  }
}

class NavCircleOnArrival {
  geometry: RingGeometry
  material: ShaderMaterial
  mesh: Mesh
  _tw: Tween<{ t: number}>
  _twParam: { t: number }
  _maxScale: number;
  
  constructor(scale: number, thickness: number) {
    this.geometry = new RingGeometry(1.0 - thickness, 1.0, 60)
    this.geometry.rotateX(Math.PI * 0.5)
    this._maxScale = scale;

    this.material = new ShaderMaterial({
      uniforms: {
          uColor: { value: new Color(0xffffff)},
          uOpacity: { value: 0.0 },
          uScale: { value: 0.0 },
          uPosition: { value: new Vector3(0, 0.2, 0)}
      },
      vertexShader: circleVertexShaderSrc,
      fragmentShader: circleFragmentShaderSrc,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: DoubleSide
    })

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.frustumCulled = false
    Base.getScene().add(this.mesh)
    this._twParam= { t: 0.0 }
  }


  _startTween(duration: number, delay: number) {
    if (this._tw) this._tw.stop()
    this._tw = new TWEEN.Tween(this._twParam)
      .to({t : 1.0}, duration)
      .easing(TWEEN.Easing.Quintic.Out)
      .delay(delay)
      .onUpdate(() => this._update())
      .onStart(() => {
        this._twParam.t = 0.0
      })
      .onComplete(() => {
        this._twParam.t = 0.0
      })
      .start()
  }


  _update() {
    const t = this._twParam.t
    this._updateScale(t)
    this._updateOpacity(t)
  }

  _updateScale(t: number) {
    const uniforms = this.material.uniforms
    uniforms['uScale'].value = t * this._maxScale
  }

  _updateOpacity(t: number) {
    const pt = t < 0.9 ? t : 9 * (1.0 - t)
    const uniforms = this.material.uniforms
    uniforms['uOpacity'].value = pt
  }


  // ---------- API -------------------------------------------
  // ----------------------------------------------------------
  startAnimation(pos: Vector3, duration: number, delay: number) {
    const uniforms = this.material.uniforms
    uniforms['uPosition'].value = new Vector3(pos.x, pos.y - 0.3, pos.z)
    this._startTween(duration, delay)
  }
}


export class NavView {
  sphere: NavSphere
  circleOnArrival1: NavCircleOnArrival
  circleOnArrival2: NavCircleOnArrival

  constructor() {
    this.sphere = new NavSphere()
    this.circleOnArrival1= new NavCircleOnArrival(0.7, 0.05)
    this.circleOnArrival2= new NavCircleOnArrival(0.65, 0.02)
  }

  move(from: Vector3, to: Vector3, duration: number) {
    this.sphere.startAnimation(from, to, duration)
    const arrivalTime = duration * 0.5;
    this.circleOnArrival1.startAnimation(to, 1200, arrivalTime)
    this.circleOnArrival2.startAnimation(to, 1200, arrivalTime + 120)
  }
}
