/**
 * Created by yane
 */

import { Object3D, Vector3 } from 'three'
import { Tween } from '@tweenjs/tween.js'

export default class BaseView3D extends Object3D {
  protected _delay: number = 0
  protected _duration: number = 800
  protected _tw: Tween<any>

  constructor() {
    super()
  }

  public init(): void {}

  public show(): void {
    this.visible = true
  }

  public hide(): void {
    this.visible = false
  }

  protected cancelTween(): void {
    if (this._tw) this._tw.stop()
  }

  get duration(): number {
    return this._duration
  }

  set duration(value: number) {
    this._duration = value
  }

  get delay(): number {
    return this._delay
  }

  set delay(value: number) {
    this._delay = value
  }
}
