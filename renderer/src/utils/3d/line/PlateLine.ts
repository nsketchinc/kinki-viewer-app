/**
 * Created by yane on 5/12/17.
 */

// import {
//   Color,
//   LineBasicMaterial,
//   Mesh,
//   NormalBlending,
//   PlaneGeometry,
// } from 'three'
import BaseView3D from '../primitive/BaseView3D'

export class PlateLine extends BaseView3D {
  //   private line: Mesh
  //   private geometry: PlaneGeometry
  //   public material: LineBasicMaterial

  //   private _rate: number = 0

  constructor(
    __width: number = 0.01,
    __length: number = 5,
    __color: number = 0xffffff
  ) {
    super()

    //     this.geometry = new PlaneGeometry(__width, __length)
    //     this.material = new LineBasicMaterial({
    //       blending: NormalBlending,
    //       color: __color,
    //     })

    //     this.material.transparent = true

    //     this.line = new Mesh(this.geometry, this.material)
    //     this.line.position.y = __length / 2
    //     this.add(this.line)
  }

  //   public init(): void {
  //     super.init()
  //     this.rate = 0
  //   }

  //   public setColor(__color: Color): void {
  //     this.material.color = __color
  //   }

  //   protected cancelTween(): void {
  //     super.cancelTween()
  //     createjs.Tween.removeTweens(this.material)
  //   }

  //   public show(): void {
  //     super.show()

  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this, { override: true })
  //       .wait(this.delay)
  //       .to({ rate: 1 }, this.duration, createjs.Ease.quintOut)
  //   }

  //   public hide(): void {
  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this, { override: true })
  //       .to({ rate: 0 }, this.duration, createjs.Ease.quintOut)
  //       .call(() => super.hide())
  //   }

  //   get rate(): number {
  //     return this._rate
  //   }

  //   set rate(value: number) {
  //     this._rate = value
  //     this.scale.y = this._rate
  //   }
}
