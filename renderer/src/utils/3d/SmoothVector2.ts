/**
 * Created by yane
 */

import { Vector2 } from 'three'

export class SmoothVector2 {
  public prev: Vector2
  public current: Vector2
  public target: Vector2
  public move: Vector2

  public sensitivity: number = 0.1

  constructor() {
    this.prev = new Vector2(0, 0)
    this.current = new Vector2(0, 0)
    this.target = new Vector2(0, 0)
    this.move = new Vector2(0, 0)
  }

  public update(): void {
    this.prev.set(this.current.x, this.current.y)

    this.move.set(this.target.x, this.target.y)
    this.move.sub(this.current)
    this.move.multiplyScalar(this.sensitivity)
    this.current.addVectors(this.current, this.move)
  }

  public setGoal(__x: number, __y: number): void {
    this.target.set(__x, __y)
  }

  public reset(__x: number, __y: number): void {
    this.prev.set(__x, __y)
    this.current.set(__x, __y)
    this.target.set(__x, __y)
  }
}
