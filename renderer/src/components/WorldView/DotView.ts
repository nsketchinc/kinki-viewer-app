import TWEEN, { Tween } from '@tweenjs/tween.js'
import {
  BufferGeometry,
  Color,
  InstancedMesh,
  Matrix4,
  Mesh, MeshBasicMaterial,
  MeshMatcapMaterial,
  PointLight,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
  Vector3,
  AdditiveBlending,
  BufferAttribute,
  Points
} from 'three'
import {MathUtils} from "@/utils/math";
import {createGlowMesh, glowMaterial} from "@/utils/3d/primitive/glowSphere";
import Base from "@/components/Common/instances";

const vertexShaderSrc = `
attribute float size;
attribute vec3 customColor;
attribute float opacity;
varying vec3 vColor;
varying float vOpacity;

void main() {
    vColor = customColor;
    vOpacity = opacity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShaderSrc = `
uniform vec3 color;
uniform sampler2D uPointTex;

varying float vOpacity;
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(color * vColor, vOpacity);
    gl_FragColor = gl_FragColor * texture2D(uPointTex, gl_PointCoord);
}
`;


class InstancedDot {
  mesh: InstancedMesh
  instanceNum: number;

  constructor() {
    const geometry = new SphereGeometry(0.1, 60, 60, 60)
    const material = new MeshBasicMaterial()
    const num = 15
    this.instanceNum = num * num
    this.mesh = new InstancedMesh(geometry, material, num * num)
    for(let i = 0; i < num * num; ++i) {
      const col: Color = new Color(0xffffff)
      const mat = new Matrix4()
      mat.makeTranslation(MathUtils.randFloat(-20.0, 20.0), 1, MathUtils.randFloat(-20.0, 20.0))
      this.mesh.setMatrixAt(i, mat)
      this.mesh.setColorAt(i, col.setHex(0xffffff))
    }
    Base.getScene().add(this.mesh)
  }
};

class ParticleDot {
  _tw: Tween<{ t: number}>
  _twParam: { t: number }
  geometry: BufferGeometry;
  particleNum: number;
  size: number;

  random: number[]

  constructor() {
    this.particleNum = 30;

    this.size = 0.2;

    const positions = new Float32Array(this.particleNum * 3)
    const colors = new Float32Array(this.particleNum * 3)
    const sizes = new Float32Array(this.particleNum)
    const opacities = new Float32Array(this.particleNum)
    const vertex = new Vector3();
    const color = new Color(0xffffff);

    this.random = []

    for(let i = 0; i < this.particleNum; i++) {
      vertex.x = MathUtils.randFloat(-20.0, 20.0)
      // vertex.y = MathUtils.randFloat(0.1, 5.0)
      vertex.y = MathUtils.randFloat(1.0, 2.0)
      vertex.z = MathUtils.randFloat(-20.0, 20.0)
      vertex.toArray(positions, i * 3);
      color.setHSL(0.5 + 0.1 * ( i / this.particleNum), 0.1, 0.9);
      color.toArray(colors, i * 3)
      sizes[i] = MathUtils.randFloat(0.01, 0.2)
      opacities[i] = MathUtils.randFloat(0.01, 0.3)

      this.random.push(MathUtils.randFloat(0.0, 100.0))
    }


    this.geometry = new BufferGeometry();
    this.geometry.setAttribute('position', new BufferAttribute(positions, 3));
    this.geometry.setAttribute('customColor', new BufferAttribute(colors, 3));
    this.geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    this.geometry.setAttribute('opacity', new BufferAttribute(opacities, 1));

    const material = new ShaderMaterial({
        uniforms: {
            color: { value: new Color(0xffffff)},
            uPointTex: { value: new TextureLoader().load('img/textures/particles.png')}
        },
        vertexShader: vertexShaderSrc,
        fragmentShader: fragmentShaderSrc,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true
    });

    const points = new Points(this.geometry, material)
    Base.getScene().add(points)

    this._twParam= { t: 0.0 }

  }

  show() {
    this._startTween()
  }

  _startTween() {
    if (this._tw) this._tw.stop()
    this._tw = new TWEEN.Tween(this._twParam)
      .to({t : 1.0}, 3000)
      .onUpdate(() => this._updateAttib())
      .onComplete(() => this._twParam.t = 0.0)
      .start(0)
      .repeat(Infinity)
  }

  _updateAttib() {
    const t: number = Math.abs(this._twParam.t)
    this._animate_1(t)
  }

  _animate_1(t: number) {
    const opacity = this.geometry.attributes.opacity.array as number[]
    const size = this.geometry.attributes.size.array as number[]

    for(let i = 0; i < this.particleNum; i++) {
      let phase = i * (Math.PI * 2 / this.particleNum) + this.random[i]
      phase *= 0.4
      const value = 0.5 + Math.cos(t * Math.PI * 2 + phase) / 2.0
      opacity[i] = 0.5 * (value < 0.0 ? 0.0 : value)

      const s = 0.5 + Math.cos(t * Math.PI * 2 + phase)  / 2.0
      size[i] = 0.25 * (value < 0.0 ? 0.0 : s)
    }
    this.geometry.attributes.opacity.needsUpdate = true
  }

  _animate_2(t: number) {
    const opacity = this.geometry.attributes.opacity.array as number[]
    for(let i = 0; i < this.particleNum; i++) {
      opacity[i] = t
    }
    this.geometry.attributes.opacity.needsUpdate = true
  }
}

interface SphereStyle {
  opacity: number
  scale: number
}

export class DotView {
  constructor() {
    const dot = new ParticleDot();
    dot.show();
  }
}

class Dot{
  sphereGeometry: BufferGeometry
  material: MeshMatcapMaterial
  // sphereMaterial: ShaderMaterial
  sphere: Mesh

  spotLight: PointLight

  _tw: Tween<{ t: number}>

  _twParam: { t: number }
  defaultStyle: SphereStyle

  size: number

  constructor() {}

  initGeometry( geometry: BufferGeometry, size: number, color: Color) {
    this.size = size


    // this.material= new MeshMatcapMaterial({
    //   matcap: new TextureLoader().load(
    //     '/img/textures/matcap-porcelain-white.jpeg'
    //   ),
    //   alphaTest: 0.5,
    //   color: color,
    //   transparent: true,
    //   opacity: 0.5
    // })

    // this.sphereMaterial = new MeshBasicMaterial({
    //   color: color,
    //   transparent: true,
    //   opacity: 0.5
    // })

    // this.sphere = new Mesh(this.sphereGeometry, this.material)
    this.sphere = createGlowMesh(geometry, size, new Color(0xffffff))
    this._twParam= { t: 0.0 }
    this.defaultStyle = { opacity: 1.0, scale: 1.0 }
  }

  get() {
    return this.sphere
  }

  setPosition(x: number, y: number, z: number) {
    this.sphere.position.set(x, y, z)
  }
  setPositionWithVec3(pos: Vector3) {
    if (pos) {
      this.setPosition(pos.x, pos.y, pos.z)
    }
  }

  show() {
    this.startTween()
  }

  startTween() {

    if (this._tw) this._tw.stop()

    this._tw = new TWEEN.Tween(this._twParam)
    .to({t : 1.0}, 3000)
    // .delay(MathUtils.randInt(500, 5000))
    .onUpdate(() => this.updateStyle())
    .onComplete(() => this._twParam.t = 0.0)
    .start(MathUtils.randInt(0, 5000))
    .repeat(Infinity)

    // ループさせる | chain() 連結
    // this._tw.repeat(Infinity)

  }

  updateStyle() {

    const t = this._twParam.t

    // const a = Math.sin(t * Math.PI)
    const a = t * t

    const scale = a * this.size
    const opacity = 1.0 - a

    this.sphere.scale.set(scale, scale, scale)

    const material = this.sphere.material
    // if (material instanceof Material) material.opacity = opacity
    if (material instanceof ShaderMaterial) material.uniforms.opacity.value = opacity
  }
}
