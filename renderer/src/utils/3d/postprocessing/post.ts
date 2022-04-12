import { Camera } from '@react-three/fiber'
import {
  Scene,
  WebGLRenderer,
  Vector2
} from 'three'
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib'
import { EdgeFadeShader } from '../shaders/edgeFade'
import { BloomPass } from './bloomPass'


class Post {
  scene: Scene
  camera: Camera
  renderer: WebGLRenderer
  bloomPass: BloomPass

  composer: EffectComposer
  renderPass: RenderPass
  params: Object
  edgeFadePass: ShaderPass
  isEnableEffect: boolean

  constructor(renderer: WebGLRenderer, scene: Scene, camera: Camera, params?) {
    this.renderer = renderer
    this.scene = scene
    this.camera = camera
    this.isEnableEffect = true

    // create pass
    this.renderPass = new RenderPass(scene, camera)
    this.edgeFadePass = new ShaderPass(EdgeFadeShader)
    this.edgeFadePass.uniforms[ 'resolution' ].value = new Vector2( window.innerWidth, window.innerHeight );
    this.edgeFadePass.uniforms['pixelSize'].value = 3

    // add pass to composer
    this.composer = new EffectComposer(renderer)
    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.edgeFadePass)
  }

  enableEffect() {
    this.isEnableEffect = true
  }

  disableEffect() {
    this.isEnableEffect = false
  }

  setSize(w, h) {

    this.bloomPass.setSize(w, h)
  }

  render() {
    if (this.isEnableEffect) {
      this.composer.render()
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }
}

export { Post }
