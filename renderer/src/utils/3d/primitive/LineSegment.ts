import TWEEN, { Tween } from '@tweenjs/tween.js'
import {
  BufferGeometry,
  Color,
  Line,
  LineBasicMaterial,
  Material,
  Mesh,
  Vector3,
} from 'three'
import { Line2, LineGeometry, LineMaterial } from 'three-stdlib'

interface LineStyle {
  opacity: number
  width: number
}

export default class LineSegment extends Mesh {
  line_: Line
  verticies: any
  points_: Vector3[]
  line2geo: LineGeometry
  line2: Line2
  line2Verts: any

  _tw: Tween<LineStyle>
  style: LineStyle

  constructor(_pos1: Vector3, _pos2: Vector3, _color: Color) {
    super()

    this.style = { opacity: 1.0, width: 0.3 }
    //material
    const line_mat = new LineBasicMaterial({
      color: _color,
      linewidth: this.style.width,
    })

    //points
    this.points_ = []
    this.points_.push(_pos1)
    this.points_.push(_pos2)

    //create line
    const line_geo = new BufferGeometry().setFromPoints(this.points_)
    this.line_ = new Line(line_geo, line_mat)
    this.verticies = this.line_.geometry.attributes.position.array

    this.line2geo = new LineGeometry()
    this.line2geo.setPositions([
      this.points_[0].x,
      this.points_[0].y,
      this.points_[0].z,
      this.points_[1].x,
      this.points_[1].y,
      this.points_[1].z,
    ])

    const linemat = new LineMaterial({
      color: 0xfffff,
      linewidth: 5,
      vertexColors: true,
      alphaTest: 0.5,
    })
    this.line2 = new Line2(this.line2geo, linemat)
    this.line2.computeLineDistances()
    // this.line2.geometry.setFromPoints(linegeo)
    this.line2Verts = this.line2.geometry.attributes.position
      .array as Array<number>
  }

  setPosition(
    _x1: number,
    _y1: number,
    _z1: number,
    _x2: number,
    _y2: number,
    _z2: number
  ) {
    this.verticies[0] = _x1
    this.verticies[1] = _y1
    this.verticies[2] = _z1
    this.verticies[3] = _x2
    this.verticies[4] = _y2
    this.verticies[5] = _z2

    this.line2Verts[0] = _x1
    this.line2Verts[1] = _y1
    this.line2Verts[2] = _z1
    this.line2Verts[3] = _x2
    this.line2Verts[4] = _y2
    this.line2Verts[5] = _z2

    this.line_.geometry.attributes.position.needsUpdate = true
    this.line2.geometry.attributes.position.needsUpdate = true

    // this.line2geo.setPositions(this.verticies)
  }

  setPositionWithVec3(pos1: Vector3, pos2: Vector3) {
    this.setPosition(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z)
  }

  getLine() {
    return this.line_
  }
  getFatLine() {
    return this.line2
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
    if (this._tw) this._tw.stop()

    this._tw = new TWEEN.Tween(this.style)
      .to(target, 2000)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate(() => this.updateStyle())
      .start()
  }

  updateStyle() {
    const material = this.line_.material
    if (material instanceof Material) {
      material.opacity = this.style.opacity
    }
  }
}
