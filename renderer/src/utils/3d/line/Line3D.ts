/**
 * Created by yane on 5/11/17 by Yuki Anezaki.
 */

import {
  //   BufferAttribute,
  //   BufferGeometry,
  //   Color,
  //   DoubleSide,
  //   LineBasicMaterial,
  //   Mesh,
  //   NormalBlending,
  //   Uint16BufferAttribute,
  Vector3,
} from 'three'
import BaseView3D from '../primitive/BaseView3D'

export class Line3D extends BaseView3D {
  //   private geometry: BufferGeometry
  //   public material: LineBasicMaterial
  //   private mesh: Mesh

  //   public begin: Vector3
  //   public end: Vector3

  //   private direction: Vector3
  //   private positions: Float32Array
  //   private cross: Vector3

  //   private _opacity: number = 0
  //   private _bold: number = 0

  //   private _color: Color = new Color()

  //   private _rate: number = 0

  constructor(__start: Vector3, __end: Vector3, __bold: number) {
    super()

    //     this.delay = 1000
    //     this.duration = 800
    //     this._bold = __bold
    //     this.begin = __start
    //     this.end = __end
    //     this.direction = this.end.clone().sub(this.begin)
    //     this.cross = this.getCrossVec().multiplyScalar(__bold / 2)

    //     this.positions = new Float32Array(4 * 3)
    //     for (let i = 0; i < 12; i++) {
    //       this.positions[i] = 0
    //     }

    //     this.geometry = new BufferGeometry()
    //     this.geometry.addAttribute(
    //       'position',
    //       new BufferAttribute(this.positions, 3)
    //     )

    //     let indices: number[] = []
    //     indices.push(2)
    //     indices.push(0)
    //     indices.push(1)
    //     indices.push(1)
    //     indices.push(3)
    //     indices.push(2)

    //     this.material = new LineBasicMaterial({
    //       blending: NormalBlending,
    //       color: 0xffffff,
    //     })

    //     this.material.side = DoubleSide
    //     this.opacity = 1

    //     this.geometry.setIndex(new Uint16BufferAttribute(indices, 1))

    //     this.mesh = new Mesh(this.geometry, this.material)
    //     this.add(this.mesh)

    //     this.updateLine()

    //     // DatGuiUtils.instance().setVector3D(this.position, "all", "#gui");
    //     // DatGuiUtils.instance().setVector3D(this.rotation, "rotation", "#gui");
    //     // DatGuiUtils.instance().setVector3D(this.begin, "begin", "#gui", () => this.updateLine(),8);
    //     // DatGuiUtils.instance().setVector3D(this.end, "end", "#gui", () => this.updateLine(),4);
    //     // DatGuiUtils.instance().getGui("#gui").add(this, "bold", 0, 1);
    //     // DatGuiUtils.instance().getGui("#gui").add(this, "opacity", 0, 1);
    //     // DatGuiUtils.instance().getGui("#gui").add(this, "rate", 0, 1);
  }

  //   public init(): void {
  //     super.init()
  //     this.rate = 0
  //   }

  //   public get opacity(): number {
  //     return this._opacity
  //   }

  //   public set opacity(value: number) {
  //     this._opacity = value
  //     this.material.opacity = value
  //     this.material.transparent = true
  //   }

  //   get bold(): number {
  //     return this._bold
  //   }

  //   set bold(value: number) {
  //     this._bold = value
  //     this.updateLine()
  //   }

  //   private updateLine(): void {
  //     const attribute: any = this.geometry.getAttribute('position')

  //     this.direction = this.end.clone().sub(this.begin)
  //     this.cross = this.getCrossVec().multiplyScalar(this.bold / 2)

  //     this.positions[0] = this.begin.x + this.cross.x //x1
  //     this.positions[1] = this.begin.y + this.cross.y //y1
  //     this.positions[2] = this.begin.z + this.cross.z //z1
  //     this.positions[3] = this.begin.x - this.cross.x //x2
  //     this.positions[4] = this.begin.y - this.cross.y //y2
  //     this.positions[5] = this.begin.z - this.cross.z
  //     this.positions[6] =
  //       this.begin.x + this.direction.x * this._rate + this.cross.x //x1
  //     this.positions[7] =
  //       this.begin.y + this.direction.y * this._rate + this.cross.y //y1
  //     this.positions[8] =
  //       this.begin.z + this.direction.z * this._rate + this.cross.z //z1
  //     this.positions[9] =
  //       this.begin.x + this.direction.x * this._rate - this.cross.x //x2
  //     this.positions[10] =
  //       this.begin.y + this.direction.y * this._rate - this.cross.y //y2
  //     this.positions[11] =
  //       this.begin.z + this.direction.z * this._rate - this.cross.z

  //     attribute.needsUpdate = true
  //     this.material.needsUpdate = true
  //   }

  //   protected cancelTween(): void {
  //     super.cancelTween()
  //     createjs.Tween.removeTweens(this.material)
  //   }

  //   public show(): void {
  //     super.show()
  //     this.rate = 0
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

  //   private getCrossVec(): Vector3 {
  //     let cross: Vector3 = this.begin
  //       .clone()
  //       .sub(this.end)
  //       .cross(new Vector3(0, 1, 0))
  //     cross.normalize()
  //     return cross
  //   }

  //   public update(): void {
  //     this.updateLine()
  //     console.log('update line', this.begin, this.end)
  //   }

  //   get rate(): number {
  //     return this._rate
  //   }

  //   set rate(value: number) {
  //     this._rate = value
  //     this.updateLine()
  //   }

  //   get color(): Color {
  //     return this._color
  //   }

  //   set color(value: Color) {
  //     this._color = value
  //     this.material.color = this._color
  //     this.updateLine()
  //   }
}
