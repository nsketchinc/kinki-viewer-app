import {Object3D, RawShaderMaterial, Vector3} from 'three'
import {Tween} from "@tweenjs/tween.js";
import {ShaderLine} from "@/components/WorldView/ShaderLine";
import {ShaderBoldLine} from "@/components/WorldView/ShaderBoldLine";
import NodeView from "@/components/WorldView/Node/NodeView";

export default class ConnectLineView extends Object3D {

  line: ShaderLine
  boldLine: ShaderBoldLine

  fromNode: NodeView;
  toNode: NodeView;

  from: number = 0
  to: number = 0

  _tw: Tween<Vector3>

  constructor(__from: number, __to: number, fromNode: NodeView, toNode: NodeView) {
    super()

    this.fromNode = fromNode
    this.toNode = toNode

    this.from = __from
    this.to = __to

    this.line = new ShaderLine()
    this.line.setPosition([this.fromNode.position, this.toNode.position])

    this.boldLine = new ShaderBoldLine()
    this.boldLine.setPosition([this.fromNode.position, this.toNode.position])

    this.add(this.line.getLine())
    this.add(this.boldLine.getLine())
  }

  show() {
    this.line?.show()
  }

  hide() {
    this.line?.hide()
    this.boldLine?.hide()
  }

  updatePos() {
    this.line?.setPosition([this.fromNode.position, this.toNode.position])
    this.boldLine?.setPosition([this.fromNode.position, this.toNode.position])
  }

  setBoldLineOpacity(val) {
    const material = this.boldLine.getLine().material
    if (material instanceof RawShaderMaterial)
      material.uniforms.opacity.value = val
  }

  action(__direction:number) {
    this.boldLine.move(__direction)
  }
}
