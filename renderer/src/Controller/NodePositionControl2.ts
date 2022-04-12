import {Vector2, Vector3} from "three";
import {MathUtils} from "@/utils/math";
import {NodeData} from "@/Model/NodeDataModel";
import ForceGraph from "@/utils/ForceGraph";

export default class NodePositionControl {

  BASE_RADIUS: number
  positions: Vector3[] = []

  fc: ForceGraph

  nodeDatas: NodeData[]

  constructor(nodeDatas: NodeData[]) {

    this.BASE_RADIUS = 3.0

    this.nodeDatas = nodeDatas

    if (nodeDatas.length == 0) return;


    this.positions.push(new Vector3())

    // @ts-ignore
    this.fc = new ForceGraph(nodeDatas[0], 6 * Math.PI, 5)
  }

  setPos() {
    this.setFirstPos(this.nodeDatas[0].children, 0, new Vector3())
  }

  setFirstPos(nodeDatas: NodeData[], __layer: number, __position: Vector3) {

    for (let i = 0; i < nodeDatas.length; i++) {

      const data = this.fc.getChildrenOfRoot(i)
      const pos = this.fc.transform(data.x, data.y)
      const target = new Vector3(pos.x, 0.4, pos.y)

      this.positions.push(target)

      this.setAllNodePos(nodeDatas[i].children, data.children)
    }

  }

  setAllNodePos(baseNodeDatas: NodeData[], force_data: any) {

    const childrenNum = baseNodeDatas.length

    for (let i = 0; i < baseNodeDatas.length; i++) {

      const data = force_data[i]
      const pos = this.fc.transform(data.x, data.y)
      const target = new Vector3(pos.x, 0.4, pos.y)
      this.positions.push(target)

      this.setAllNodePos(baseNodeDatas[i].children, data.children)

    }
  }

}
