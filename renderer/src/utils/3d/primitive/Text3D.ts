import { main } from '@/styles/theme'
import { Color, Vector3 } from 'three'
import { Text } from 'troika-three-text'
import BaseView3D from './BaseView3D'
import TWEEN from "@tweenjs/tween.js";

interface TextStyle {
  opacity: number,
  fontSize: number
}

export default class Text3D extends BaseView3D {
  position: Vector3
  target: Vector3

  __string: Text
  isLoaded: boolean

  style: TextStyle
  defaultStyle: TextStyle

  constructor(
    _pos: Vector3,
    text: string,
    fontSize: number = 0.075,
    color: Color = new Color(0xffffff),
    nodeId: string
  ) {
    super()

    this.__string = new Text()
    this.__string.text = text
    this.__string.fontSize = 0.001
    this.__string.font = main.fonts.path_jp
    this.__string.anchorX = 'center'
    this.__string.anchorY = 'bottom'
    this.__string.color = color

    this.position = _pos

    this.style = { fontSize: fontSize, opacity: 0.0}
    this.defaultStyle = { fontSize: fontSize, opacity: 1.0}
    
    this.__string.sync(() => {
      this.__string.position.set(this.position.x, this.position.y + 0.05, 0)
      
      //this.__string.rotation.set(Math.PI/4,0,0);
    })
  }

  setPosition(_x: number, _y: number, _z: number) {
    this.__string.position.set(_x, _y + 0.15, 0)
  }

  setRotation(_x: number, _y: number, _z: number){
    this.__string.rotation.set(_x, _y, _z)
  }

  setText(text: string) {
    this.__string.text = text
  }

  getText() {
    return this.__string
  }
  getBoundingBox() {
    return this.__string.geometry.boundingBox
  }
  getTextWidth() {
    const boundingBox = this.__string.geometry.boundingBox
    const width = boundingBox.max.x - boundingBox.min.x
    // #TODO: width calculation not working. ( return infinity value )

    return 2.0
  }

  show() {
    const target = {fontSize: this.defaultStyle.fontSize, opacity: 1.0}
    this.startTween(target)
  }
  hide() {
    const target = { fontSize: 0.0, opacity: 0.0 }
    this.startTween(target)
  }

  startTween(target: TextStyle) {
    if (this._tw)
      this._tw.stop()
    this._tw = new TWEEN.Tween(this.style)
      .to(target, 2000)
      .easing(TWEEN.Easing.Quintic.Out)
      .onUpdate(() => this.updateStyle())
      .start()
  }

  updateStyle() {
    this.__string.fillOpacity = this.style.opacity
    this.__string.strokeOpacity = this.style.opacity
    this.__string.fontSize = this.style.fontSize
  }
}
