import {useFrame, useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import Controller from "@/Controller/Controller";
import {useKey} from "react-use";
import Base from "@/components/Common/instances";
import {PerspectiveCamera} from "three";
import CameraManager from "@/components/Camera/CameraManager";
import useStore, {ModeEnums} from "@/store";

const MainScene = () => {
  const {gl, scene, camera} = useThree()
  const controllerRef = useRef<Controller>(null)


  const {mode} = useStore()
  const refMode = useRef(mode)
  useEffect(() => {
    refMode.current = mode
    if (refMode.current == ModeEnums.NODE_SCENE) {
      new Audio("/sounds/LineStart.wav").play()
      controllerRef.current?.moveToNext()
    }
  }, [mode])

  useEffect(() => init(), [])
  useFrame(() => update(), 1)

  useKey('ArrowUp', () => {

    if (refMode.current != ModeEnums.NODE_SCENE) {
      useStore.setState({mode: ModeEnums.NODE_SCENE})
    } else {
      controllerRef.current?.moveToNext()
    }
  })

  const init = () => {
    Base.setScene(scene)
    Base.setCamera(camera as PerspectiveCamera)
    Base.setRenderer(gl)

    CameraManager.setCamera(Base.getCamera())

    controllerRef.current = new Controller()
  }

  const update = () => {
    controllerRef.current?.update()
  }

  return <></>
}

export default MainScene
