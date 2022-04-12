import {
  Color,
  LineCurve3,
  Mesh,
  MeshNormalMaterial,
  TubeBufferGeometry,
  TubeGeometry,
  Vector3,
} from 'three'

export default class FatTube extends Mesh {
  lineMat: MeshNormalMaterial

  points: Vector3[]
  P: Vector3
  normal: Vector3

  curve: LineCurve3
  tube: TubeBufferGeometry
  tubeMesh: Mesh
  segments: number
  radius: number
  radialSegments: number

  pArray: Array<number>
  nArray: Array<number>
  frames: {
    tangents: Vector3[]
    normals: Vector3[]
    binormals: Vector3[]
  }

  constructor(color: Color, from: Vector3, to: Vector3) {
    super()

    this.lineMat = new MeshNormalMaterial()

    // for curve
    this.segments = 100
    this.radius = 0.01
    this.radialSegments = 10

    this.curve = new LineCurve3(from, to)
    this.tube = new TubeBufferGeometry(
      this.curve,
      this.segments,
      this.radius,
      this.radialSegments,
      true
    )

    this.P = new Vector3()
    this.normal = new Vector3()

    // use this for render
    this.tubeMesh = new Mesh(this.tube, this.lineMat)
  }

  update(
    _x1: number,
    _y1: number,
    _z1: number,
    _x2: number,
    _y2: number,
    _z2: number
  ) {
    this.curve.v1[0] = _x1
    this.curve.v1[1] = _y1
    this.curve.v1[2] = _z1

    this.curve.v2[0] = _x2
    this.curve.v2[1] = _y2
    this.curve.v2[2] = _z2

    this.frames = this.curve.computeFrenetFrames(this.segments, false)
    ;(this.tubeMesh.geometry as TubeGeometry).tangents = this.frames.tangents
    ;(this.tubeMesh.geometry as TubeGeometry).normals = this.frames.normals
    ;(this.tubeMesh.geometry as TubeGeometry).binormals = this.frames.binormals

    this.tubeMesh.geometry.attributes.position.needsUpdate = true
    this.tubeMesh.geometry.attributes.normal.needsUpdate = true

    this.pArray = this.tubeMesh.geometry.attributes.position
      .array as Array<number>
    this.nArray = this.tubeMesh.geometry.attributes.normal
      .array as Array<number>
    this.P = new Vector3()
    this.normal = new Vector3()
    for (let i = 0; i < this.segments; i++) {
      this.updateSegment(i)
    }
    this.updateSegment(this.segments)

    this.tubeMesh.geometry.attributes.position.needsUpdate = true
    this.tubeMesh.geometry.attributes.normal.needsUpdate = true
  }

  updateSegment(i: number) {
    this.P = this.curve.getPointAt(i / this.segments, this.P)
    const N = this.frames.normals[i]
    const B = this.frames.binormals[i]
    for (let j = 0; j <= this.radialSegments; j++) {
      let v = (j / this.radialSegments) * Math.PI * 2
      let sin = Math.sin(v)
      let cos = -Math.cos(v)
      this.normal.x = cos * N.x + sin * B.x
      this.normal.y = cos * N.y + sin * B.y
      this.normal.z = cos * N.z + sin * B.z
      this.normal.normalize()
      let index = (i * (this.radialSegments + 1) + j) * 3
      this.nArray[index] = this.normal.x
      this.nArray[index + 1] = this.normal.y
      this.nArray[index + 2] = this.normal.z
      this.pArray[index] = this.P.x + this.radius * this.normal.x
      this.pArray[index + 1] = this.P.y + this.radius * this.normal.y
      this.pArray[index + 2] = this.P.z + this.radius * this.normal.z
    }
  }
  getMesh() {
    return this.tubeMesh
  }
}
