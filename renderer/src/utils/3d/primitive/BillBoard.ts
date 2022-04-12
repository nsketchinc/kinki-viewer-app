/**
 * Created by yane
 */

import { Object3D } from 'three'
import BaseView3D from './BaseView3D'
/**
 * Created by yane on 5/30/17.
 */

export class BillBoard extends BaseView3D {
  private updateAnimationId: number

  public target: Object3D = new Object3D()

  constructor() {
    super()
  }

  private loop(): void {
    this.quaternion.copy(this.target.quaternion)
    this.updateAnimationId = requestAnimationFrame(() => this.loop())
  }

  public show(): void {
    super.show()
    this.enalbeAutoUpdate()
  }

  public hide(): void {
    super.hide()
    this.disableAutoUpdate()
  }

  public stop(): void {
    this.disableAutoUpdate()
  }

  private enalbeAutoUpdate(): void {
    this.disableAutoUpdate()
    this.loop()
  }

  private disableAutoUpdate(): void {
    cancelAnimationFrame(this.updateAnimationId)
  }
}
