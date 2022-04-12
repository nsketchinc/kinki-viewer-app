/**
 * Created by yane on 5/12/17.
 */

import {
  Material,
  //   Mesh,
  //   MeshBasicMaterial,
  //   TubeGeometry,
  Vector3,
} from 'three'
import BaseView3D from '../primitive/BaseView3D'

// import { LerpUtil } from '../utils/LerpUtil'

export class TubeCurveLine extends BaseView3D {
  //   private line: Mesh
  //   private lerpUtil: LerpUtil
  //   private goalPoints: Vector3[] = []
  //   private currentPoints: Vector3[] = []
  //   private rate: number = 0
  //   private radius: number = 0.2
  //   private radiusSegment: number = 8 // 2なら平らな線に、数値をあげればチューブに

  constructor(__points: Vector3[], __material: Material = null) {
    super()

    //     this.line = new Mesh()
    //     this.setPositions(__points)
    //     this.setMaterial(__material == null ? new MeshBasicMaterial() : __material)
    //     this.add(this.line)
    //     this.updateLine()
  }

  //   public setPositions(__points: Vector3[]): void {
  //     for (var i = 0; i < __points.length; i++) {
  //       this.goalPoints.push(__points[i].clone())
  //     }
  //     this.lerpUtil = new LerpUtil(this.goalPoints)
  //     this.updateLine()
  //   }

  //   public setMaterial(__material: Material): void {
  //     this.line.material = __material
  //     this.line.material.transparent = true
  //     this.line.material.needsUpdate = true
  //     this.line.material.vertexColors = VertexColors
  //   }

  //   public setColor(__color: Color): void {
  //     ;(<any>this.line.material).color = __color
  //   }

  //   public setOpacity(__opacity: number): void {
  //     this.line.material.opacity = __opacity
  //   }

  //   public setRadius(__radius: number): void {
  //     this.radius = __radius
  //     this.updateLine()
  //   }

  //   private updateLine(): void {
  //     this.currentPoints = this.lerpUtil.lerpAllTo(this.rate)
  //     var curve: CatmullRomCurve3 = new CatmullRomCurve3(this.currentPoints)

  //     this.line.geometry = new TubeGeometry(
  //       curve,
  //       this.currentPoints.length * 10,
  //       this.radius,
  //       this.radiusSegment
  //     )

  //     // for (var i = 0; i < this.line.geometry.faces.length; i++) {
  //     //     var color: Color = new Color;
  //     //     color.setRGB(
  //     //         i / this.line.geometry.faces.length * (<any>this.line.material).color.r,
  //     //         i / this.line.geometry.faces.length * (<any>this.line.material).color.g,
  //     //         i / this.line.geometry.faces.length * (<any>this.line.material).color.b
  //     //     );
  //     //     this.line.geometry.faces[i].vertexColors[0] = color;
  //     //     this.line.geometry.faces[i].vertexColors[1] = color;
  //     //     this.line.geometry.faces[i].vertexColors[2] = color;
  //     // }
  //   }

  //   public setRate(__rate: number): void {
  //     this.rate = __rate
  //     this.updateLine()
  //   }

  //   protected cancelTween(): void {
  //     super.cancelTween()
  //     createjs.Tween.removeTweens(this)
  //   }

  //   public show(): void {
  //     super.show()

  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this, { onChange: () => this.updateLine() })
  //       .wait(this.delay)
  //       .to({ rate: 1 }, this.duration, createjs.Ease.sineOut)
  //   }

  //   public hide(): void {
  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this, { onChange: () => this.updateLine() })
  //       .to({ rate: 0 }, this.duration, createjs.Ease.sineOut)
  //       .call(() => super.hide())
  //   }
}
