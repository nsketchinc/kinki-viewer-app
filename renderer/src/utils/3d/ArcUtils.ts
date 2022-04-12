/**
 * Created by yane on 5/16/17.
 */

import { Vector2 } from 'three'

export class ArcUtils {
  constructor() {}

  public static getVertices(
    __angle: number,
    __radius: number = 1,
    __interval: number = 0.1
  ): Vector2[] {
    return ArcUtils.getVerticesRange(0, __angle, __radius, __interval)
  }

  public static getVerticesRange(
    __beginAngle: number,
    __endAngle: number,
    __radius: number = 1,
    __interval: number = 0.1
  ): Vector2[] {
    const vertices: Vector2[] = []
    for (let i = __beginAngle; i <= __endAngle; i = i + __interval) {
      vertices.push(ArcUtils.getVertix(i, __radius))
    }

    return vertices
  }

  public static getVertix(__angle: number, __radius): Vector2 {
    const vertex: Vector2 = new Vector2()
    vertex.x = Math.cos(__angle) * __radius
    vertex.y = Math.sin(__angle) * __radius
    return vertex
  }
}
