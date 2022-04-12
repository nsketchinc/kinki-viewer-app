import {Vector2, Vector3} from "three";
import {MathUtils} from "@/utils/math";
import CameraManager from "@/components/Camera/CameraManager";
import {NodeData} from "@/Model/NodeDataModel";

export default class NodePositionControl {

  BASE_RADIUS: number
  positions: Vector3[] = []

  constructor(nodeDatas: NodeData[]) {

    this.BASE_RADIUS = 3.0

    if (nodeDatas.length == 0) return;

    this.positions.push(new Vector3())

    this.setFirstPos(nodeDatas[0].children, 0, new Vector3())
    // @ts-ignore
    // this.fc = new ForceGraph(nodeDatas[0], 2 * Math.PI, 5)
  }

  setFirstPos(nodeDatas: NodeData[], __layer: number, __position: Vector3) {

    // layer1では、円を分割して並べる

    for (let i = 0; i < nodeDatas.length; i++) {
      const angle = Math.PI * 2 * i / nodeDatas.length
      let x = this.BASE_RADIUS * Math.cos(angle)
      let y = this.BASE_RADIUS * Math.sin(angle)

      x += MathUtils.randFloat(-0.5, 0.5)
      y += MathUtils.randFloat(-0.5, 0.5)
      const target = new Vector3(x, 0.4, y);
      console.log("++++", nodeDatas[i].title)
      this.positions.push(target)

      this.setAllNodePos(nodeDatas[i].children, __layer + 1, target)
    }


  }

  setAllNodePos(baseNodeDatas: NodeData[], __layer: number, __position: Vector3) {

    const childrenNum = baseNodeDatas.length

    if (childrenNum == 1) {
      const parentPos = __position.clone()
      parentPos.multiplyScalar((__layer + 1) / __layer)
      console.log("++++", baseNodeDatas[0].title)
      const target = new Vector3(parentPos.x, parentPos.y, parentPos.z)
      this.positions.push(target)
      this.setAllNodePos(baseNodeDatas[0].children, __layer + 1, target)
      return
    }

    // layer1では、円を分割して並べる
    for (let i = 0; i < baseNodeDatas.length; i++) {

      let parentPos = __position.clone()
      const parentPos2 = new Vector2(parentPos.x, parentPos.z)

      let nextPos = __position.clone()
      nextPos.multiplyScalar(((__layer + 1) / __layer) * 1.0)
      const nextPos2 = new Vector2(nextPos.x, nextPos.z)

      const max_angle = MathUtils.mapLinear(childrenNum, 1, 6, MathUtils.degToRad(15), MathUtils.degToRad(60))
      const start = -max_angle / 2
      let rotateAngle = start + (max_angle * i / (childrenNum - 1))

      nextPos2.rotateAround(parentPos2, rotateAngle)

      const target = new Vector3(nextPos2.x, parentPos.y, nextPos2.y,)
      this.positions.push(target)
      console.log("++++", baseNodeDatas[i].title)
      this.setAllNodePos(baseNodeDatas[i].children, __layer + 1, target)

    }
  }

}
