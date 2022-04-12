import {
  BufferAttribute,
  BufferGeometry, Color,
  DynamicDrawUsage,
  Float32BufferAttribute,
  Line, LineBasicMaterial, Mesh, RawShaderMaterial,
  ShaderMaterial, Vector2,
  Vector3
} from 'three';
import {MathUtils} from "@/utils/math";
import {MeshLine} from "@/utils/3d/primitive/MeshLine";
import { MeshLineMaterial} from "@/utils/3d/primitive/MeshLineMaterial";
import TWEEN, {Tween} from "@tweenjs/tween.js";

export class ShaderBoldLine {

  geometry: BufferGeometry
  material: RawShaderMaterial

  line: MeshLine
  mesh: Mesh
  points: Vector3[]

  segments: number

  opacityTween: Tween<{ val: number}>
  timeTween: Tween<{ val: number}>

  currentOpacity: { val: number }
  currentTime: { val: number}

  constructor() {

    this.segments = 100

    this.currentOpacity = { val: 0.0}
    this.currentTime = { val: 0.0}

    this.line = new MeshLine()
    const mat = new MeshLineMaterial({})
    const material = mat.get().clone()
    material.uniforms.lineWidth.value =  0.02
    material.uniforms.opacity.value = 0.0
    material.uniforms.resolution.value = new Vector2(window.innerWidth, window.innerHeight)
    this.material = material
    this.mesh = new Mesh(this.line, material)

    this.points = [];
    for (let i = 0; i < 100; i++) {
      this.points.push(new Vector3(0, 0, 0));
    }
    this.line.setPoints(this.points);

    const positions = this.line.attributes.position.array

    const length = positions.length / 3
    const vertexDistanceArray = new Float32BufferAttribute(length, 1)

    for (let i = 0; i < length; i++) {

      vertexDistanceArray.setX(i, i / (length-1))
    }

    this.line.setAttribute('vertexRelDistance', vertexDistanceArray)

  }

  setPosition(vertex: Vector3[]) {

    // const positions = this.geometry.attributes.position.array

    const posA = vertex[0]
    const posB = vertex[1]

    for (let i = 0; i < this.segments; i++) {

      // set positions
      // positions[i * 3] = MathUtils.lerp(posA.x, posB.x, i / (this.segments-1))
      // positions[i * 3 + 1] = MathUtils.lerp(posA.y, posB.y, i / (this.segments-1))
      // positions[i * 3 + 2] = MathUtils.lerp(posA.z, posB.z, i / (this.segments-1))

      const x = MathUtils.lerp(posA.x, posB.x, i / (this.segments-1))
      const y = MathUtils.lerp(posA.y, posB.y, i / (this.segments-1))
      const z = MathUtils.lerp(posA.z, posB.z, i / (this.segments-1))

      this.points[i] = new Vector3(x, y, z)

    }

    this.line.setPoints(this.points)

    // this.geometry.attributes.position.needsUpdate = true
  }

  getLine() {
    // return this.line
    return this.mesh
  }

  update() {
    this.material.uniforms.time.value += 0.001
  }

  show() {
    if (this.opacityTween) this.opacityTween.stop()

    this.opacityTween = new TWEEN.Tween(this.currentOpacity)
      .to({val: 1.0}, 500)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate(() => {
        this.material.uniforms.opacity.value = this.currentOpacity.val
      })
      .start()
  }
  hide() {
    if (this.opacityTween) this.opacityTween.stop()

    this.opacityTween = new TWEEN.Tween(this.currentOpacity)
      .to({val: 0.0}, 500)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate((v) => {
        this.material.uniforms.opacity.value = this.currentOpacity.val
      })
      .start()
  }

  move(__direction:number = 1) {
    if (this.timeTween) this.timeTween.stop()

    this.show()

    this.currentTime.val = __direction > 0 ? 0 : 1
    const v = __direction > 0 ? 1.0 : 0.0
    this.timeTween = new TWEEN.Tween(this.currentTime)
      .to({ val: v}, 2000)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate(() => {
        this.material.uniforms.time.value = this.currentTime.val
      })
      .onComplete(() => {
        this.hide()
      })
      .start()
  }
}
