/**
 * Created by yane on 5/11/17 by Yuki Anezaki.
 */

import {
  LineDashedMaterial,
  //   LineSegments,
  //   NormalBlending,
  //   Uint16BufferAttribute,
  Vector3,
} from 'three'
import BaseView3D from '../primitive/BaseView3D'

export class Lines3D extends BaseView3D {
  //   private geometry: BufferGeometry
  //   private material: LineDashedMaterial
  //   private line: LineSegments

  //   private vertices: Vector3[] = []
  //   private indices: number[] = []
  //   private positions: Float32Array

  //   private _rate: number = 0

  //   private rates: number[] = []

  constructor(__vertices: Vector3[], __material: LineDashedMaterial = null) {
    super()

    //     this.vertices = __vertices
    //     this.positions = new Float32Array(this.vertices.length * 3)

    //     for (var i = 1; i < this.vertices.length; i++) {
    //       this.indices.push(i - 1)
    //       this.indices.push(i)
    //     }

    //     this.geometry = new BufferGeometry()
    //     this.geometry.addAttribute(
    //       'position',
    //       new BufferAttribute(this.positions, 3).setDynamic(true)
    //     )
    //     this.geometry.setIndex(new Uint16BufferAttribute(this.indices, 1))
    //     // this.geometry.compu

    //     this.setEachVertexRate()

    //     if (__material == null) {
    //       this.material = new LineDashedMaterial({
    //         blending: NormalBlending,
    //         transparent: true,
    //         color: 0xffffff,
    //         scale: 1,
    //         linewidth: 1,
    //         dashSize: 0.005,
    //         gapSize: 0.01,
    //       })
    //     } else {
    //       this.material = __material
    //     }
    //     this.material.transparent = true

    //     this.line = new LineSegments(this.geometry, this.material)
    //     this.add(this.line)

    //     this.rate = 0
  }

  //   private setEachVertexRate(): void {
  //     var totalLength: number = this.getTotalLength()
  //     var current: number = 0
  //     for (var i = 1; i < this.vertices.length; i++) {
  //       current += this.vertices[i - 1].distanceTo(this.vertices[i])
  //       this.rates.push(current / totalLength)
  //     }
  //   }

  //   private getTotalLength(): number {
  //     var totalLength: number = 0
  //     for (var i = 1; i < this.vertices.length; i++) {
  //       totalLength += this.vertices[i - 1].distanceTo(this.vertices[i])
  //     }
  //     return totalLength
  //   }

  //   public setGapParam(__dashSize: number, __gapSize: number): void {
  //     this.material.dashSize = __dashSize
  //     this.material.gapSize = __gapSize
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
  //     var drawRange: number = 0
  //     for (var i = 0; i < this.vertices.length; i++) {
  //       drawRange = i

  //       if (i > 0 && this.rates[i - 1] > this._rate) {
  //         var preRate: number = i > 1 ? this.rates[i - 2] : 0

  //         var lastRate: number =
  //           (this._rate - preRate) / (this.rates[i - 1] - preRate)
  //         var direction: Vector3 = this.vertices[i]
  //           .clone()
  //           .sub(this.vertices[i - 1])
  //         direction.multiplyScalar(lastRate)
  //         var target: Vector3 = this.vertices[i - 1].clone().add(direction)

  //         this.positions[i * 3] = target.x
  //         this.positions[i * 3 + 1] = target.y
  //         this.positions[i * 3 + 2] = target.z

  //         console.log(lastRate)

  //         break
  //       }
  //       this.positions[i * 3] = this.vertices[i].x
  //       this.positions[i * 3 + 1] = this.vertices[i].y
  //       this.positions[i * 3 + 2] = this.vertices[i].z
  //     }

  //     var geo: any = this.line.geometry
  //     geo.setDrawRange(0, drawRange * 2)
  //     var attribute: any = this.geometry.getAttribute('position')
  //     attribute.needsUpdate = true
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
  //       .to({ rate: 1 }, this.duration, createjs.Ease.sineOut)
  //   }

  //   public hide(): void {
  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this, { override: true })
  //       .to({ rate: 0 }, this.duration, createjs.Ease.sineOut)
  //       .call(() => super.hide())
  //   }

  //   public fadeOut(__time: number = 800, __delay: number = 0): void {
  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this.material, {
  //       onChange: () => this.updateLine(),
  //     })
  //       .wait(__delay)
  //       .to({ opacity: 0 }, __time, createjs.Ease.sineOut)
  //       .call(() => super.hide())
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

  //   get rate(): number {
  //     return this._rate
  //   }

  //   set rate(value: number) {
  //     this._rate = value
  //     this.updateLine()
  //   }
}
