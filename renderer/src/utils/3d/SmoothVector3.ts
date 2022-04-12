/**
 * Created by yane
 */

import { Vector3 } from 'three'

export class SmoothVector3 {
  public prev: Vector3
  public current: Vector3
  public target: Vector3
  public move: Vector3

  public sensitivity: number = 0.35

  constructor() {
    this.prev = new Vector3()
    this.current = new Vector3()
    this.target = new Vector3()
    this.move = new Vector3()
  }

  public update(): void {
    this.prev.set(this.current.x, this.current.y, this.current.z)

    this.move.set(this.target.x, this.target.y, this.target.z)
    this.move.sub(this.current)
    this.move.multiplyScalar(this.sensitivity)
    this.current.addVectors(this.current, this.move)
  }

  public setGoal(__x: number, __y: number, __z: number): void {
    this.target.set(__x, __y, __z)
  }

  public reset(__x: number, __y: number, __z: number): void {
    this.prev.set(__x, __y, __z)
    this.current.set(__x, __y, __z)
    this.target.set(__x, __y, __z)
  }
}
