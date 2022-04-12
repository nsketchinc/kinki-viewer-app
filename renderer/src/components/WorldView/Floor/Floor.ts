import {ReflectorMaterial} from '@/utils/3d/reflector/materials/ReflectorMaterial'
import {Reflector} from '@/utils/3d/reflector/utils/world/Reflector'
import {makeNoise2D} from 'fast-simplex-noise'
import {Color, Group, Mesh, PlaneGeometry, RepeatWrapping, TextureLoader,} from 'three'
import DatGuiManager from "@/components/GUI/DatGuiManager";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export function map(
  current: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
): number {
  const mapped: number =
    ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  return clamp(mapped, out_min, out_max)
}

export class Floor extends Group {
  visible: boolean

  reflector: Reflector
  texturePath: string
  geometry: PlaneGeometry
  rate: number
  noise2D: (x: number, y: number) => number

  // gui params
  blurFactor: number

  mesh: Mesh

  Fwidth: number

  constructor(path: string) {
    super()
    // this.visible = false
    this.texturePath = path
    this.rate = 0
    this.noise2D = makeNoise2D(Date.now)
    this.blurFactor = 16.0

    this.rotateX(-Math.PI / 2)
    this.position.y = -0.1

    this.reflector = new Reflector({
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio,
      clipBias: 0,
      blurIterations: 16,
      // blurFactor: 1,
      reductionRate: 2,
    })

    this.geometry = new PlaneGeometry(50, 50, 20, 20)
    const loader = new TextureLoader()
    const map = loader.load(this.texturePath)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(16, 16)

    const material = new ReflectorMaterial({
      color: new Color(1, 1, 1),
      map: map,
      dithering: true,
    })

    material.uniforms.tReflect = this.reflector.renderTargetUniform
    material.uniforms.uMatrix = this.reflector.textureMatrixUniform

    this.mesh = new Mesh(this.geometry, material)
    // this.mesh.position.y = 0.4

    this.mesh.add(this.reflector)

    this.mesh.onBeforeRender = (renderer, scene, camera) => {
      this.visible = false
      this.reflector.update(renderer, scene, camera)
      this.visible = true
    }

    this.add(this.mesh)


    // const gui = DatGuiManager.gui.addFolder("blur")
    // gui.add(this.reflector, "blurIterations", 1, 30, 1);
    // gui.add(this.reflector, 'clipBias', 0.0, 0.5, 0.01)
    // gui.add({Fwidth: 0}, 'Fwidth', 0.0, 3000.0, 1)
    // .onChange((val) => {
    //   const uResolution = this.reflector.blurMaterial.uniforms.uResolution
    //   uResolution.value.set(val, uResolution.value.y)
    // })
    // gui.add({FHeight: 0}, 'FHeight', 0.0, 3000.0, 1)
    // .onChange((val) => {
    //   const uResolution = this.reflector.blurMaterial.uniforms.uResolution
    //   uResolution.value.set(uResolution.value.x, val)
    // })
    // gui.add({reductionRate: this.reflector.reductionRate}, 'reductionRate', 1, 30, 1)
    // .onChange((val) => {
    //   this.reflector.setReductionRate(val)
    // })
    //
    // gui.add({sampleStep: 1.0}, 'sampleStep', 1, 30, 1)
    // .onChange((val) => {
    //   this.reflector.setSampleStep(val)
    // })
    //
    // const floorGui = DatGuiManager.gui.addFolder("floorMesh")
    // floorGui.add(this.mesh.position, 'z', -0.5, 0.5, 0.01)

  }

}
