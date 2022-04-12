import {Color, ShaderMaterial, Vector3} from 'three'
import NodeView from './NodeView'
import {SphereView} from "@/components/WorldView//SphereView";
import Variables from "@/components/Common/variables";
import TextRandom3D from "@/utils/3d/primitive/TextRandom3D";
import {NodeData} from "@/Model/NodeDataModel";

export default class CategoryNodeView extends NodeView {

  text: TextRandom3D
  sphere: SphereView

  constructor(data: NodeData, size: number, color: Color) {
    super(data)

    this.text = new TextRandom3D(
      new Vector3(0, 0.35, 0),
      data.title,
      Variables.TITLE_FONT_SIZE,
      new Color(0xffffff),
      300
    )
    this.add(this.text.getText())

    this.sphere = new SphereView()
    this.sphere.initGeometry(size, color)
    this.add(this.sphere)

  }

  show() {
    super.show()
    this.sphere.show()
  }

  override showEffect() {
    this.text.show()
  }

  hide() {
    super.hide()
    this.sphere.hide()
    this.text.hide()
  }

  // TODO GUIで変更してたので、あとでこれやりたい場合はどうするか書く
  setGlowParameter(name: string, val: number) {

    const material = this.sphere.glowSphere.material
    if (material instanceof ShaderMaterial) {
      if (name == 'coefficient') material.uniforms.coefficient.value = val
      else if (name == 'power') material.uniforms.power.value = val
      if (name == 'scale') material.uniforms.scale.value = val
      if (name == 'opacity') material.uniforms.opacity.value = val
    }

  }
}
