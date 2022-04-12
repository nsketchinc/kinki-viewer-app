import TWEEN, {Tween} from '@tweenjs/tween.js'
import {
  BufferGeometry,
  Color,
  Material,
  Mesh,
  MeshMatcapMaterial,
  Object3D,
  ShaderMaterial,
  SphereBufferGeometry,
  SpotLight,
  TextureLoader,
} from 'three'
import {createGlowMesh} from "@/utils/3d/primitive/glowSphere";
import {MathUtils} from "@/utils/math";

interface SphereStyle {
  opacity: number
  scale: number
}

export class SphereView extends Object3D{
  sphereGeometry: BufferGeometry
  sphereMaterial: Material
  sphere: Mesh
  glowSphere: Mesh
  spotLight: SpotLight
  _tw: Tween<SphereStyle>
  style: SphereStyle
  defaultStyle: SphereStyle

  constructor() {
    super();
  }

  initGeometry( size: number, color: Color) {
    this.sphereGeometry = new SphereBufferGeometry(size)

    this.sphereMaterial = new MeshMatcapMaterial({
      matcap: new TextureLoader().load(
        '/img/textures/matcap-porcelain-white.jpeg'
      ),
      alphaTest: 0.5,
      color: color,
      // transparent: true,
    })

    this.sphere = new Mesh(this.sphereGeometry, this.sphereMaterial)
    this.spotLight = new SpotLight(new Color(0xFFF),0.5,0, MathUtils.degToRad( 90));
    this.glowSphere = createGlowMesh(this.sphereGeometry, size*0.7, color)

    this.style = { opacity: 0.0, scale: 0.0 }
    this.defaultStyle = { opacity: 1.0, scale: 1.0 }

    this.add(this.sphere)
    this.add(this.glowSphere)
    this.add(this.spotLight)

  }

  show() {
    const target = { scale: 1.0, opacity: 1.0 }
    this.startTween(target)
  }

  hide() {
    const target = { scale: 0.0, opacity: 0.0 }
    this.startTween(target)
  }

  private startTween(target: SphereStyle) {
    if (this._tw) this._tw.stop()

    this._tw = new TWEEN.Tween(this.style)
      .to(target, 2000)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate(() => this.updateStyle())
      .start()
  }

  private updateStyle() {
    this.sphere.scale.set(this.style.scale, this.style.scale, this.style.scale)

    const material = this.sphere.material
    if (material instanceof Material) material.opacity = this.style.opacity

    if (material instanceof ShaderMaterial) material.opacity = this.style.opacity
  }
}
