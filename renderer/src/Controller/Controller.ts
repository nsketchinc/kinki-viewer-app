import * as THREE from 'three'
import NodeDataModel, {NodeData, NodeType} from "@/Model/NodeDataModel";
import {getJson} from "@/Model/JsonManager";
import {Post} from "@/utils/3d/postprocessing/post";
import CameraManager from '@/components/Camera/CameraManager';
import {DotView} from "@/components/WorldView/DotView";
import Base from '../components/Common/instances';
import {Floor} from "@/components/WorldView/Floor/Floor";
import NodeView from "@/components/WorldView/Node/NodeView";
import ConnectLineView from "@/components/WorldView/Node/ConnectLineView";
import CategoryNodeView from "@/components/WorldView/Node/CategoryNodeView";
import Variables from "@/components/Common/variables";
import {getRandomColor} from "@/styles/theme";
import PlayerNodeView from "@/components/WorldView/Node/PlayerNodeView";
import {Color, Vector2} from 'three';
import useStore, {ModeEnums} from '@/store';
import { NavView } from '@/components/WorldView/NavView';
import {Tween24} from "tween24";
import {MathUtils} from "@/utils/math";

export default class Controller {

  post: Post
  nodeViews: NodeView[] = []
  lines: ConnectLineView[] = []
  nav: NavView

  nodeModel: NodeDataModel
  autoPlay:boolean = true

  interval:number
  delayInterval:number

  cameraTween:Tween24

  constructor() {

    this.loadData()
    .then(() => {
      this.initView()
      if(this.autoPlay) this.moveToNext()
    }).catch(()=>{
      this.nodeModel = new NodeDataModel()
      this.initView()
      if(this.autoPlay) this.moveToNext()
    })
  }

  loadData() {
    return new Promise<boolean>(async (res, rej) => {
      getJson()
      .then(async (json) => {
        console.log(json)
        this.nodeModel = new NodeDataModel(json)
        res(true)
      })
    })
  }

  initView() {

    //renderer
    Base.getRenderer().autoClear = false
    Base.getRenderer().setClearColor(0xf0f0f0)
    // scene
    Base.getScene().background = new THREE.Color(0x000000); // black

    // 3D objects
    this.makeNodeView(this.nodeModel.nodeDatasTree)
    this.makeConnection(0, this.nodeModel.nodeDatasTree)
    this.makeNavView()

    const dot = new DotView()

    const floor = new Floor('./img/textures/polished_concrete_basecolor4.jpg')
    Base.getScene().add(floor)

    this.post = new Post(Base.getRenderer(), Base.getScene(), Base.getCamera())
  }


  makeNodeView(__nodeDatas: NodeData[]) {

    for (const nodeData of __nodeDatas) {
      let nodeView
      if (nodeData.type == NodeType.Category) {
        nodeView = new CategoryNodeView(nodeData, Variables.BASE_NODE_SIZE, new Color().setHex(nodeData.color))
      } else {
        nodeView = new PlayerNodeView(nodeData, new Color().setHex(nodeData.color))
      }
      nodeView.position.set(nodeData.position.x, nodeData.position.y, nodeData.position.z)
      this.nodeViews.push(nodeView)
      Base.getScene().add(nodeView)
      this.makeNodeView(nodeData.children)
    }
  }

  makeConnection(__from: number, __nodeDatas: NodeData[]) {
    for (const nodeData of __nodeDatas) {
      const line = new ConnectLineView(__from, nodeData.index, this.nodeViews[__from], this.nodeViews[nodeData.index])
      this.lines.push(line)
      Base.getScene().add(line)
      this.makeConnection(nodeData.index, nodeData.children)
    }
  }

  makeNavView() {
    this.nav = new NavView()
  }

  update() {
    for (const nodeView of this.nodeViews) {
      nodeView.update()
    }
    CameraManager.update()
    Base.getRenderer().clear()
    this.post?.render()
    Base.getRenderer().clearDepth()
  }

  moveToNext() {

    if(!this.nodeModel)
      return

    if(this.cameraTween)
      this.cameraTween.stop()

    window.clearTimeout(this.delayInterval)
    window.clearTimeout(this.interval)

    let autoPlayDelay = 800;

    const currentIndex = this.nodeModel.currentIndex
    const nextIndex = this.nodeModel.goNextIndex()

    // 上りならゆっくり
    if(this.nodeModel.direction > 0){
      autoPlayDelay = 3000
    }

    const currentNodeView = this.nodeViews[nextIndex]
    currentNodeView.showEffect()

    // 線の描画
    for (const line of this.lines) {
      if ((line.to == currentIndex && line.from == nextIndex)) {
        line.action(1)
      } else if (line.from == currentIndex && line.to == nextIndex) {
        line.action(-1)
      }
    }

    // カメラ移動
    const targetPos: Vector2 = CameraManager.getRotation()
    const randomness = 0.3

    const layer = this.nodeModel.getCurrentLayer()
    let distance = (2 - Math.min(2, layer)) * 3 + Math.random() * 1.2 + 1.5;
    if(this.nodeModel.direction>0 && layer < 2){
      distance -= 1
    }

    targetPos.setX(Math.PI / 2 + Math.random() * randomness - randomness / 2.0)
    targetPos.setY(Math.random() * 0.4 + 0.4)

    CameraManager.moveTo(
      targetPos,
      currentNodeView.position,
      distance,
      2000)


    console.log("this-------- " ,this.nodeModel.currentIndex, this.nodeModel.nodeDatasTree.length)
    const currentData = this.nodeModel.getCurrentData()
    if (currentData.type == NodeType.Video) { // show video

      this.cameraTween = Tween24.serial(
        Tween24.wait(2.6),
        Tween24.func(()=>{
          CameraManager.moveTo(
            targetPos,
            currentNodeView.position,
            distance - 0.5,
            1300)
        }),
        Tween24.wait(1.5),
        Tween24.func(()=>{
          useStore.setState({videoUrl: currentData.path})
          useStore.setState({mode: ModeEnums.VIDEO_SCENE})
        })
      )
      this.cameraTween.play()


    } else if (currentData.type == NodeType.Website) { // show video
      autoPlayDelay = currentData.duration * 1000

      this.cameraTween = Tween24.serial(
        Tween24.wait(2.6),
        Tween24.func(()=>{

          CameraManager.moveTo(
            targetPos,
            currentNodeView.position,
            distance,
            1300)

        }),
        Tween24.wait(1.5),
        Tween24.func(()=>{
          useStore.setState({iframeUrl: currentData.path})
          useStore.setState({mode: ModeEnums.IFRAME_SCENE})
        })
      )
      this.cameraTween.play()

      if(this.autoPlay){
        window.clearTimeout(this.interval)
        this.interval = window.setTimeout(()=>{this.moveToNext()},autoPlayDelay)
      }

    } else {

      // ナビゲーション
      this.nav.move(this.nodeViews[currentIndex].position, this.nodeViews[nextIndex].position, 1500)

      useStore.setState({mode: ModeEnums.NODE_SCENE})
      if(this.autoPlay){
        window.clearTimeout(this.interval)
        this.interval = window.setTimeout(()=>{this.moveToNext()},autoPlayDelay)
      }
    }


  }
}
