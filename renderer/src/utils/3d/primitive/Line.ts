import {
  Line,
  Mesh,
  LineBasicMaterial,
  BufferGeometry,
  Vector3,
  Color, Material,
} from 'three'
import TWEEN, {Tween} from "@tweenjs/tween.js";
import {MathUtils} from "@/utils/math";

interface LineStyle {
  opacity: number
  width: number
}

export default class LineBase extends Mesh {

  line_: Line
  vertics_: any

  _tw: Tween<LineStyle>
  style: LineStyle

  constructor(points: Vector3[], _color: Color) {
    super()

    this.style = { opacity: 1.0, width: 0.3}
    //material
    const line_mat = new LineBasicMaterial({
      color: _color,
      linewidth: this.style.width
    })

    //create line
    const line_geo = new BufferGeometry().setFromPoints(points)
    this.line_ = new Line(line_geo, line_mat)
    this.vertics_ = this.line_.geometry.attributes.position.array

  }

  setPosition(
    _x1: number,
    _y1: number,
    _z1: number,
    _x2: number,
    _y2: number,
    _z2: number
  ) {
    const length = this.vertics_.length / 3
    for (let i=0; i<length; i++) {
      this.vertics_[i * 3 + 0] = MathUtils.lerp(_x1, _x2, i / length)
      this.vertics_[i * 3 + 1] = MathUtils.lerp(_y1, _y2, i / length)
      this.vertics_[i * 3 + 2] = MathUtils.lerp(_z1, _z2, i / length)
      this.line_.geometry.attributes.position.needsUpdate = true
    }
  }

  setPositionWithVec3(pos1: Vector3, pos2: Vector3) {
    this.setPosition(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z)
  }

  getLine() {
    return this.line_
  }

  update() {}

  show() {
    const target = { ...this.style, opacity: 1.0 }
    this.startTween(target)
  }
  hide() {
    const target = { ...this.style, opacity: 0.0 }
    this.startTween(target)
  }

  startTween(target: LineStyle) {
    if (this._tw)
      this._tw.stop()

    this._tw = new TWEEN.Tween(this.style)
      .to(target, 2000)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate(() => this.updateStyle() )
      .start()
  }

  updateStyle() {
      const material = this.line_.material
      if (material instanceof Material) {
        material.opacity = this.style.opacity
      }
  }
}
