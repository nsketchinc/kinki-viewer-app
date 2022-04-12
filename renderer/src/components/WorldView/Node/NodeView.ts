import {Object3D} from 'three'
import {NodeData} from "@/Model/NodeDataModel";
import CameraManager from "@/components/Camera/CameraManager";

export default class NodeView extends Object3D {
  nodetype: string

  constructor(data: NodeData) {
    super()
    this.nodetype = data.type
  }

  show() {
  }

  showEffect() {
  }

  hide() {
  }

  update(){
    const target = this.position.clone().add(CameraManager.camera.position.clone()).sub(CameraManager.getLookAt())
    // const target= CameraManager.camera.position
    this.lookAt(target)
  }
}
