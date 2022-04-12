import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'

class Instances {

  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer

  store: any

  setScene(ref: Scene) {
    this.scene = ref
  }
  getScene() {
    return this.scene
  }

  setCamera(ref: PerspectiveCamera) {
    this.camera = ref
  }
  getCamera() {
    return this.camera
  }

  setRenderer(ref: WebGLRenderer) {
    this.renderer = ref
  }
  getRenderer() {
    return this.renderer
  }

}

export default new Instances()
