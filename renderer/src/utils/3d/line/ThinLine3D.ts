/**
 * Created by yane on 5/12/17.
 */

import {
  //   Color,
  //   Geometry,
  //   Line,
  LineDashedMaterial,
  //   LinePieces,
  //   NormalBlending,
  Vector3,
} from 'three'
import BaseView3D from '../primitive/BaseView3D'

export class ThinLine3D extends BaseView3D {
  //   private line: Line
  //   private geometry: Geometry
  //   private material: LineDashedMaterial
  //   public start: Vector3
  //   public end: Vector3

  constructor(
    __start: Vector3,
    __end: Vector3,
    __material: LineDashedMaterial = null
  ) {
    super()

    //     this.start = __start
    //     this.end = __end

    //     this.geometry = new Geometry()
    //     this.geometry.vertices.push(this.start)
    //     this.geometry.vertices.push(this.end)
    //     this.geometry.computeLineDistances()

    //     if (__material == null) {
    //       this.material = new LineDashedMaterial({
    //         blending: NormalBlending,
    //         transparent: true,
    //         color: 0xffffff,
    //         linewidth: 1,
    //         dashSize: 0.005,
    //         gapSize: 0.01,
    //         depthTest: false,
    //       })
    //     } else {
    //       this.material = __material
    //     }
    //     this.material.transparent = true
    //     // this.setOpacity(0);

    //     this.line = new Line(this.geometry, this.material)
    //     this.add(this.line)
  }

  //   public setGapParam(__dashSize: number, __gapSize: number): void {
  //     this.material.dashSize = __dashSize
  //     this.material.gapSize = __gapSize
  //     this.geometry.computeLineDistances()
  //   }

  //   public setStartPosition(__start: THREE.Vector3): void {
  //     this.start.set(__start.x, __start.y, __start.z)
  //     this.updateLine()
  //   }

  //   public setEndPosition(__end: THREE.Vector3): void {
  //     this.end.set(__end.x, __end.y, __end.z)
  //     this.updateLine()
  //   }

  //   public setMaterial(__material: THREE.LineDashedMaterial): void {
  //     this.material.needsUpdate = true
  //     this.material = __material
  //   }

  //   public setColor(__color: Color): void {
  //     this.material.color = __color
  //   }

  //   public setOpacity(__opacity: number): void {
  //     this.cancelTween()
  //     this.material.opacity = __opacity
  //     this.material.transparent = true
  //   }

  //   public setWidth(__width: number): void {
  //     this.material.linewidth = __width
  //   }

  //   private updateLine(): void {
  //     this.geometry.verticesNeedUpdate = true
  //     this.geometry.computeLineDistances()
  //     this.geometry.lineDistancesNeedUpdate = true
  //     this.material.needsUpdate = true
  //     // this.geometry.update
  //     console.log('update', this.end)
  //   }

  //   public update(): void {
  //     this.updateLine()
  //   }

  //   protected cancelTween(): void {
  //     super.cancelTween()
  //     createjs.Tween.removeTweens(this.material)
  //   }

  //   public show(): void {
  //     super.show()

  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this.material, {
  //       onChange: () => this.updateLine(),
  //     })
  //       .wait(this.delay)
  //       .to({ opacity: 1 }, this.duration, createjs.Ease.sineOut)
  //   }

  //   public hide(): void {
  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this.material, {
  //       onChange: () => this.updateLine(),
  //     })
  //       .to({ opacity: 0 }, this.duration, createjs.Ease.sineOut)
  //       .call(() => super.hide())
  //   }

  //   public fadeOut(__time: number = 800, __delay: number = 0): void {
  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this.material, {
  //       onChange: () => this.updateLine(),
  //     })
  //       .wait(__delay)
  //       .to({ opacity: 0 }, __time, createjs.Ease.sineOut)
  //       .call(() => super.remove())
  //   }

  //   public fadeIn(__time: number = 800, __delay: number = 0): void {
  //     super.show()
  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this.material, {
  //       onChange: () => this.updateLine(),
  //     })
  //       .wait(__delay)
  //       .to({ opacity: 1 }, __time, createjs.Ease.sineOut)
  //   }
}
