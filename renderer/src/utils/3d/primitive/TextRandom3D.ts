import {main} from '@/styles/theme'
import {Color, Vector3} from 'three'
import {Text} from 'troika-three-text'
import BaseView3D from './BaseView3D'
import TWEEN from "@tweenjs/tween.js";


export default class TextRandom3D extends BaseView3D {
  position: Vector3
  target: Vector3

  __string: Text
  isLoaded: boolean

  _fakeTxt: string = "ABCDEFGHIJKLMNOPQR+TUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@%&$#_?!/-";
  _fakeTxt2: string = "+.-**■□_-_.■.+-■"
  // _fakeTxt2: string = "■□■□■□■□■□■□■□■□"
  _fakeNum: number = 73;
  _fakeNum2: number = 16;

  _completeTxt: string;

  _textNum: number;
  _visibleNum:number;

  _rightTxt: string; //１文字づつ表示するString変数

  _timer: number;
  _fastTimer: number;
  _addTimer: number;

  _duration:number;

  constructor(
    _pos: Vector3,
    text: string,
    fontSize: number = 0.075,
    color: Color = new Color(0xffffff),
    duration: number = 500
  ) {
    super()

    this.__string = new Text()
    this.__string.text = text
    this.__string.fontSize = fontSize
    this.__string.font = main.fonts.path_jp
    this.__string.anchorX = 'center'
    this.__string.anchorY = 'bottom'
    this.__string.color = color

    this._completeTxt = text
    this.position = _pos
    this.setText(text)

    this._duration = duration;

    this.__string.sync(() => {
      this.__string.position.set(this.position.x, this.position.y + 0.05, 0)
    })
  }

  setPosition(_x: number, _y: number, _z: number) {
    this.__string.position.set(_x, _y + 0.15, 0)
  }

  setRotation(_x: number, _y: number, _z: number) {
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

    window.clearInterval(this._addTimer)
    this._addTimer = window.setTimeout(()=>{this.showEffect()}, 800)

  }

  showEffect(){

    this._textNum = 0;
    this._visibleNum = 0;
    this._rightTxt = "";
    this.setText("");

    this._fastTimer = window.setInterval(() => {
      this.rollWord()
    }, 10)


    window.clearInterval(this._addTimer)
    this._addTimer = window.setTimeout(()=>{this.startAdd()},200)
  }

  startAdd(){
    this._timer = window.setInterval(() => {
      this.endTimer()
    }, this._duration / this._completeTxt.length)
  }

  private rollWord(): void {

    this.setText(this._rightTxt);

    //ランダムに文字を表示させる文字数
    const randomTextNum: number = Math.min(3 , this._completeTxt.length - this._rightTxt.length);
    for (let i: number = 0; i < randomTextNum; i++) {
      const randNum: number = Math.floor(Math.random() * this._fakeNum2);
      this.setText(this.__string.text + this._fakeTxt2.charAt(randNum))
    }
  }


  private endTimer(): void {
    if (this._textNum != this._completeTxt.length - 1) {
      this._rightTxt += this._completeTxt.charAt(this._textNum);
      this._textNum += 1;

    } else { //タイマーとダンラムを終了
      this.setText(this._completeTxt)
      window.clearInterval(this._addTimer)
      window.clearInterval(this._timer)
      window.clearInterval(this._fastTimer)
    }
  }

}
