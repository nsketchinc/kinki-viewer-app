/**
 * Created by yane
 */

import { Material } from 'three'
import BaseView3D from './BaseView3D'

export default class Image3D extends BaseView3D {
  //   public imagePanel: Mesh
  //   public geometry: PlaneGeometry
  //   public material: MeshBasicMaterial

  //   private _opacity: number = 0.3
  //   public showOpacity: number = 1

  constructor(
    __path: string = '',
    __size: number = 10,
    __material: Material = null
  ) {
    super()

    //     this.geometry = new PlaneGeometry(__size, __size)

    //     if (__material == null) {
    //       this.material = new MeshBasicMaterial()
    //     } else {
    //       this.material = <MeshBasicMaterial>__material
    //     }
    //     const loader: TextureLoader = new TextureLoader()
    //     const texture: Texture = loader.load(__path)
    //     this.material.map = texture
    //     this.material.side = DoubleSide
    //     this.material.transparent = true
    //     this.material.depthTest = true
    //     this.material.depthWrite = true
    //     this.material.alphaTest = 0

    //     this.imagePanel = new Mesh(this.geometry, this.material)

    //     this.add(this.imagePanel)

    //     this.opacity = 0
  }

  //   public show() {
  //     if (this.visible && this.opacity == this.showOpacity) return

  //     super.show()

  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this)
  //       .wait(this.delay)
  //       .to({ opacity: this.showOpacity }, this.duration, createjs.Ease.sineOut)
  //   }

  //   public hide() {
  //     if (!this.visible) return

  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this)
  //       .to({ opacity: 0 }, this.duration, createjs.Ease.sineOut)
  //       .call(() => {
  //         super.hide()
  //       })
  //   }

  //   get opacity(): number {
  //     return this._opacity
  //   }

  //   set opacity(value: number) {
  //     this._opacity = value
  //     this.material.opacity = this._opacity
  //     this.material.needsUpdate = true
  //   }

  //   public setTexture(__path: string): void {
  //     let loader: TextureLoader = new TextureLoader()
  //     let texture: Texture = loader.load(__path)
  //     this.material.map = texture
  //   }
}
