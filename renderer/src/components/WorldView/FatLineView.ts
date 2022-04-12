import { Color, Mesh, Vector3 } from 'three'
import { Line2, LineGeometry, LineMaterial } from 'three-stdlib'

export default class FatlineView extends Mesh {
  line2: Line2
  lineGeo: LineGeometry
  lineMat: LineMaterial

  points: Vector3[]

  constructor(color: Color, points: Vector3[]) {
    super()
    this.lineMat = new LineMaterial({
      color: 0xfffff,
      linewidth: 5,
      vertexColors: true,
      alphaTest: 0.5,
    })

    // points
    this.points = points

    this.lineGeo = new LineGeometry()
    this.lineGeo.setColors(color.toArray())

    this.line2 = new Line2(this.lineGeo, this.lineMat)
    // console.log(this.lineGeo)
    // this.line2.computeLineDistances()
  }

  update() {}

  show() {
    this.line2.visible = true
  }
  hide() {
    this.line2.visible = false
  }
  setPosition(fromPt: Vector3, toPt: Vector3) {
    this.line2.geometry.setFromPoints([fromPt, toPt])
    console.log(this.lineGeo)
    // this.line2.computeLineDistances()
  }
}
