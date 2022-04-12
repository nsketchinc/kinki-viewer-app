/**
 * Created by yane
 */

export class SmoothNumber {
  public current: number = 0
  public target: number = 0

  public sensitivity: number = 0.03

  public update(): void {
    if (this.current != this.target) {
      this.current =
        this.current + (this.target - this.current) * this.sensitivity
    }
  }

  public setGoal(__value: number): void {
    this.target = __value
  }

  public reset(__value: number): void {
    this.current = this.target = __value
  }
}
