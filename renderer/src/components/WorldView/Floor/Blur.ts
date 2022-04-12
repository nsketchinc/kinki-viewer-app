import Base from '@/components/Common/instances'
import { CompositeMaterial } from '@/utils/3d/reflector/materials/CompositeMaterial'
import { FXAAMaterial } from '@/utils/3d/reflector/materials/FXAAMaterial'
import {
  BufferAttribute,
  BufferGeometry,
  Camera,
  Mesh,
  OrthographicCamera,
  PerspectiveCamera,
  RGBAFormat,
  Scene,
  Uniform,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three'

export class Blur {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera

  screenScene: Scene
  screenCamera: Camera
  screen: Mesh
  resolution: Uniform
  aspect: Uniform
  screenTriangle: BufferGeometry

  renderTargetA: WebGLRenderTarget
  renderTargetB: WebGLRenderTarget

  fxaaMaterial: FXAAMaterial
  compositeMaterial: CompositeMaterial

  // gui params
  constructor() {
    this.screenTriangle = this.generateFullscreenTriangle()
    this.resolution = new Uniform(new Vector2())
    this.aspect = new Uniform(1)

    this.initRenderer()
  }

  initRenderer() {
    // Fullscreen triangle
    this.screenScene = new Scene()
    this.screenCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const screenTriangle = this.generateFullscreenTriangle()
    this.screen = new Mesh(screenTriangle)
    this.screen.frustumCulled = false
    this.screenScene.add(this.screen)

    // Render targets
    this.renderTargetA = new WebGLRenderTarget(1, 1, {
      format: RGBAFormat,
      depthBuffer: false,
    })

    this.renderTargetB = this.renderTargetA.clone()
    this.renderTargetA.depthBuffer = true

    // FXAA material
    this.fxaaMaterial = new FXAAMaterial()
    this.fxaaMaterial.uniforms.uResolution = this.resolution

    // Composite material
    this.compositeMaterial = new CompositeMaterial()
  }

  generateFullscreenTriangle() {
    const geometry = new BufferGeometry()
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3])
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2])

    geometry.setAttribute('position', new BufferAttribute(vertices, 2))
    geometry.setAttribute('uv', new BufferAttribute(uvs, 2))

    return geometry
  }

  /**
   * Public methods
   */

  resize(width, height, dpr) {
    width = Math.round(width * dpr)
    height = Math.round(height * dpr)

    Base.getRenderer().setPixelRatio(dpr)
    Base.getRenderer().setSize(width, height)

    this.resolution.value.set(width, height)
    this.aspect.value = width / height

    this.renderTargetA.setSize(width, height)
    this.renderTargetB.setSize(width, height)

    Base.getCamera().aspect = width / height
    Base.getCamera().updateProjectionMatrix()
  }

}
