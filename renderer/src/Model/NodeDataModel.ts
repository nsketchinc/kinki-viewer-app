import {Vector3} from "three";
import NodePositionControl from "@/Controller/NodePositionControl";
import {getRandomColor} from "@/styles/theme";

export const NodeType = {
  Undefined: 'Undefined',
  Category: 'Category',
  Website: 'Website',
  Video: 'Video',
} as const
export type NodeType = typeof NodeType[keyof typeof NodeType]

export class NodeData {
  index: number
  title: string
  type: NodeType
  visualizedBy: string
  path: string
  duration: number
  position: Vector3
  color: number
  children: NodeData[] = []
}


export default class NodeDataModel {

  nodeDatasTree: NodeData[] = []
  nodeDatasArray: NodeData[] = []

  currentIndex = 0;
  direction = 0

  constructor(jsondata?: NodeData[]) {

    if(jsondata){
      this.nodeDatasTree = this.parseJsonData(jsondata)

      if(this.nodeDatasArray.length == 0){
        const top = new NodeData()
        top.title = "We"
        top.index = 0;
        top.type = NodeType.Category
        this.nodeDatasTree.push(top)
        this.nodeDatasArray.push(top)
      }

    }else{
      const top = new NodeData()
      top.title = "We"
      top.index = 0;
      top.type = NodeType.Category
      this.nodeDatasTree.push(top)
      this.nodeDatasArray.push(top)
    }

    const positions = new NodePositionControl(this.nodeDatasTree).positions
    for (let i = 0; i < this.nodeDatasArray.length; i++) {
      this.nodeDatasArray[i].position = new Vector3(positions[i].x, positions[i].y, positions[i].z)
    }

  }




  private _index = 0

  private parseJsonData(jsondata: NodeData[],) {

    //TODO なにもないときはかりでなにかついか
    const nodeDatas = [];

    for (const d of jsondata) {
      let data = new NodeData()
      data.index = this._index
      this.nodeDatasArray.push(data)
      this._index += 1;
      data.title = d.title
      data.type = d.type
      data.visualizedBy = d.visualizedBy
      data.path = d.path
      data.duration = d.duration
      data.color = d.color ? d.color : getRandomColor().getHex()
      data.children = this.parseJsonData(d.children)
      nodeDatas.push(data)
      console.log("???", this._index, d.title)
    }

    return nodeDatas
  }

  private _prevIndex = 0

  getCurrentData():NodeData{
    if(this.currentIndex > this.nodeDatasArray.length-1){
      return this.nodeDatasArray[this.nodeDatasArray.length-1]
    }
    return  this.nodeDatasArray[this.currentIndex]
  }

  getCurrentLayer(nodeDatas?: NodeData[], __layer:number = 0):number{

    let nodetree = nodeDatas;
    if(!nodeDatas)
      nodetree = this.nodeDatasTree

    for (const nodeDate of nodetree) {
      if(nodeDate.index == this.currentIndex){
        return __layer
      }
      const layer = this.getCurrentLayer(nodeDate.children, __layer + 1)
      if(layer > 0){
        return layer
      }
    }
    return 0
  }

  goNextIndex():number {
    const currentNode = this.nodeDatasArray[this.currentIndex]

    //上り
    if (this.direction > 0) {
      // 端まで行ったらもどる
      if (currentNode.children.length == 0) {
        this.direction = -1;
        this.changeIndex(this.getParent(this.currentIndex))
        return this.currentIndex
      }
      // 子供がいればそちらに
      else {
        this.direction = 1;
        this.changeIndex(currentNode.children[0].index)
        return this.currentIndex
      }
    }

    // 下り
    else {
      // まだ行っていない子供がいれば
      const indexOfChildren = this.getIndexofChildren(this._prevIndex, currentNode.children)
      if (indexOfChildren + 1 < currentNode.children.length) {
        this.direction = 1;
        this.changeIndex(currentNode.children[indexOfChildren + 1].index)
        return this.currentIndex
      }
      // 中心にもどってくる
      else if (currentNode.index == 0) {
        this.direction = 1;
        this.changeIndex(1)
        return this.currentIndex
      }
      // 戻る
      else {
        this.direction = -1;
        this.changeIndex(this.getParent(this.currentIndex))
        return this.currentIndex
      }
    }
    return 0
  }

  private changeIndex(__nextIndex: number) {
    this._prevIndex = this.currentIndex
    this.currentIndex = __nextIndex
    if(this.currentIndex > this.nodeDatasArray.length - 1){
      this.currentIndex = this.nodeDatasArray.length - 1
    }
  }

  private getParent(__index: number): number {
    for (const nodeDate of this.nodeDatasArray) {
      for (const child of nodeDate.children) {
        if (child.index == __index)
          return nodeDate.index
      }
    }
    return 0
  }

  private getIndexofChildren(__index: number, __children: NodeData[]): number {
    for (let i = 0; i < __children.length; i++) {
      if (__children[i].index == __index) {
        return i;
      }
    }
    return 0
  }


}
