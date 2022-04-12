/**
 * Created by sekine
 */

import {
  ArcCurve,
  BufferGeometry,
  CircleGeometry,
  Color,
  Line,
  LineBasicMaterial,
  Material,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector3,
} from 'three'

import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import {Ease24, Tween24} from "tween24";

interface CupsuleStyle {
  opacity: number
  width: number
  scale: number
}

export default class Cupsule {

  width_: number
  height_: number

  r_: number
  pointL_: Vector3
  pointR_: Vector3

  stroke_: Line
  stroke2_: Line
  fillMesh_: Mesh
  fillMat: MeshBasicMaterial

  color: Color

  style: CupsuleStyle
  style2: CupsuleStyle
  defaultStyle: CupsuleStyle

  tween1:Tween24
  tweee2:Tween24


  constructor(
    _position: Vector3,
    _width: number,
    _height: number,
    _fillColor: Color
  ) {

    this.width_ = _width
    this.height_ = _height
    this.r_ = _height / 2

    this.color = _fillColor

    this.pointL_ = new Vector3(-this.width_ / 2, 0, 0)
    this.pointR_ = new Vector3(this.width_ / 2, 0, 0)

    this.style = {opacity: 1.0, width: 0.3, scale:1}
    this.style2 = {opacity: 1.0, width: 0.3, scale: 1}
    this.defaultStyle = {opacity: 0.0, width: 0.3, scale:1}

    this.stroke_ = this._initStroke()
    this.stroke2_ = this._initStroke()
    this._initGeo()
  }

  _initGeo() {

    this.fillMat = new MeshBasicMaterial({
      color: new Color(0xffffff),
      opacity: 0,
      transparent: true
    })

    const geoL = new CircleGeometry(this.height_, 50)
    const geoLT = geoL.translate(this.pointL_.x, 0, 0)

    const geoR = new CircleGeometry(this.height_, 50)
    const geoRT = geoR.translate(this.pointR_.x, 0, 0)

    const geoC = new PlaneGeometry(this.width_, this.height_ * 2)
    const geoCT = geoC.translate(0, 0, 0)

    const mergedFill_ = mergeBufferGeometries([geoLT, geoCT, geoRT])
    // this.mergedFill_ = geoLT

    this.fillMesh_ = new Mesh(mergedFill_, this.fillMat)
    this.fillMesh_.position.setZ(0.1)
  }

  _initStroke() {

    //Stroke
    const curveL = new ArcCurve(
      this.pointL_.x,
      this.pointL_.y,
      this.height_,
      -90 * (Math.PI / 180),
      90 * (Math.PI / 180),
      true
    )
    const pointsL = curveL.getPoints(50)
    const geometryL = new BufferGeometry().setFromPoints(pointsL)

    const curveR = new ArcCurve(
      this.pointR_.x,
      this.pointR_.y,
      this.height_,
      90 * (Math.PI / 180),
      -90 * (Math.PI / 180),
      true
    )
    const pointsR = curveR.getPoints(50)
    const geometryR = new BufferGeometry().setFromPoints(pointsR)

    const pointsB = []
    pointsB.push(new Vector3(this.pointL_.x, -this.height_, 0))
    pointsB.push(new Vector3(this.pointR_.x, -this.height_, 0))
    const line_geoB = new BufferGeometry().setFromPoints(pointsB)

    const pointsT = []
    pointsT.push(new Vector3(this.pointL_.x, this.height_, 0))
    pointsT.push(new Vector3(this.pointR_.x, this.height_, 0))
    const line_geoT = new BufferGeometry().setFromPoints(pointsT)

    const merged_ = mergeBufferGeometries([
      geometryL,
      line_geoT,
      geometryR,
      line_geoB,
    ])

    const line_mat = new LineBasicMaterial({
      color: new Color(0x445f6c),
      linewidth: this.style.width,
      opacity: this.style.opacity,
      transparent: true
    })

    return new Line(merged_, line_mat)

  }

  getMesh() {
    return this.fillMesh_
  }

  getStroke() {
    return this.stroke_
  }

  showEffect() {
    (this.stroke2_.material as LineBasicMaterial).opacity = 1
    const mat = this.stroke2_.material as LineBasicMaterial
    this.style2.opacity = 1;
    this.style2.scale = 1;

    if(this.tween1) this.tween1.stop()
    this.tween1 = Tween24.serial(
      Tween24.wait(0.8),
      Tween24.prop(this.fillMat, {opacity: 1}),
      Tween24.wait(0.01),
      Tween24.prop(this.fillMat, {opacity: 0}),
      Tween24.wait(0.01),
      Tween24.prop(this.fillMat, {opacity: 1}),
      Tween24.wait(0.01),
      Tween24.prop(this.fillMat, {opacity: 0}),
    )
    this.tween1.play()

    if(this.tweee2) this.tweee2.stop()
    this.tweee2 = Tween24.parallel(
      Tween24.tween(this.style2, 1, Ease24._5_QuintOut, {scale: 1.3}).delay(0.9),
      Tween24.tween(this.style2, 1, Ease24._1_SineOut, {opacity: 0}).delay(0.9)
    ).onUpdate(() => {
      const material = this.stroke2_.material
      if (material instanceof LineBasicMaterial) {
        material.opacity = this.style2.opacity
        material.linewidth = this.style2.width
      }
      this.stroke2_.scale.set(this.style2.scale,this.style2.scale,this.style2.scale)
    })
    this.tweee2.play()
  }


}
