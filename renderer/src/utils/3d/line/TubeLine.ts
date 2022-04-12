/**
 * Created by yane on 5/12/17.
 */

import {
  Material,
  //   Mesh,
  //   MeshBasicMaterial,
  //   SphereGeometry,
  //   TubeGeometry,
  Vector3,
} from 'three'
import BaseView3D from '../primitive/BaseView3D'
// import { LerpUtil } from '../utils/LerpUtil'

export class TubeLine extends BaseView3D {
  //   private line: Mesh
  //   private lerpUtil: LerpUtil
  //   private goalPoints: Vector3[] = []
  //   private currentPoints: Vector3[] = []
  //   private rate: number = 0
  //   private radius: number = 0.15
  //   private radiusSegment: number = 3

  constructor(__points: Vector3[], __material: Material = null) {
    super()

    //     this.line = new Mesh()
    //     this.setPositions(__points)
    //     this.setMaterial(__material == null ? new MeshBasicMaterial() : __material)
    //     this.add(this.line)
    //     this.updateLine()
  }

  //   public setPositions(__points: Vector3[]): void {
  //     this.goalPoints = []
  //     for (var i = 0; i < __points.length; i++) {
  //       this.goalPoints.push(__points[i].clone())
  //     }
  //     this.lerpUtil = new LerpUtil(this.goalPoints)
  //     this.updateLine()
  //   }

  //   private updateLine(): void {
  //     this.currentPoints = this.lerpUtil.lerpAllTo(this.rate)

  //     var mergedGeometry: Geometry = new Geometry()

  //     for (var i = 0; i < this.currentPoints.length - 1; i++) {
  //       var lineMesh: Mesh = new Mesh(
  //         new TubeGeometry(
  //           new CatmullRomCurve3([
  //             this.currentPoints[i],
  //             this.currentPoints[i + 1],
  //           ]),
  //           2,
  //           this.radius,
  //           this.radiusSegment
  //         ),
  //         this.line.material
  //       )
  //       lineMesh.updateMatrix()
  //       mergedGeometry.merge(<Geometry>lineMesh.geometry, lineMesh.matrix)

  //       // var jointMesh: Mesh = new Mesh(
  //       //     new SphereGeometry(this.radius * 2, 8, 8),
  //       //     this.line.material
  //       // );
  //       // jointMesh.position.copy(this.currentPoints[i + 1]);
  //       // jointMesh.updateMatrix();
  //       // mergedGeometry.merge(<Geometry>jointMesh.geometry, jointMesh.matrix);
  //     }

  //     this.line.geometry = mergedGeometry

  //     // var goalcolor = new Color(0xCD6C63);
  //     // for (var i = 0; i < this.line.geometry.faces.length; i++) {
  //     //     var color: Color = new Color;
  //     //     color.setRGB(
  //     //         (1- i / this.line.geometry.faces.length ) + ( i / this.line.geometry.faces.length) * goalcolor.r,
  //     //         (1- i / this.line.geometry.faces.length ) + ( i / this.line.geometry.faces.length) * goalcolor.g,
  //     //         (1- i / this.line.geometry.faces.length ) + ( i / this.line.geometry.faces.length) * goalcolor.b
  //     //     );
  //     //     this.line.geometry.faces[i].vertexColors[0] = color;
  //     //     this.line.geometry.faces[i].vertexColors[1] = color;
  //     //     this.line.geometry.faces[i].vertexColors[2] = color;
  //     // }
  //   }

  //   public setMaterial(__material: Material): void {
  //     this.line.material = __material
  //     this.line.material.transparent = true
  //     this.line.material.needsUpdate = true
  //     this.line.material.side = DoubleSide
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
  //       .to({ rate: 1 }, this.duration, createjs.Ease.linear)
  //   }

  //   public hide(): void {
  //     this.cancelTween()
  //     this._tw = createjs.Tween.get(this, { onChange: () => this.updateLine() })
  //       .to({ rate: 0 }, this.duration, createjs.Ease.cubicOut)
  //       .call(() => super.hide())
  //   }
}
