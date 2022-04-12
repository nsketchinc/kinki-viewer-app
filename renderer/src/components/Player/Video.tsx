import styled from "@emotion/styled"
import {animated, useSpring} from "react-spring";
import {easeQuadIn} from "d3-ease";
import React, {useEffect, useRef, useState} from "react";
import useStore, {ModeEnums} from "@/store";

export const VideoPlayer: React.FC = () => {

  const {videoUrl, mode} = useStore()
  const refMode = useRef(mode)
  useEffect(() => {
    refMode.current = mode
    onChangeScene()
  }, [mode])


  const [currentOpacity, setCurrentOpacity] = useState(0)

  const videoEl = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    return () => {
      setStyles({
        opacity: 0,
      })
    }
  }, [])


  const onChangeScene = () => {
    if (refMode.current == ModeEnums.VIDEO_SCENE && currentOpacity != 1.0) {
      show()
    } else {
      if (currentOpacity != 0.0) hide()
    }
  }

  function show() {
    const opacity = 1.0
    setStyles({opacity: opacity})
    videoEl.current?.load()
    videoEl.current?.play()

    setCurrentOpacity(opacity)
  }

  function hide() {
    const opacity = 0.0
    setStyles({opacity: opacity})

    setCurrentOpacity(opacity)
  }

  const [styles, setStyles] = useSpring(() => ({
    opacity: 0,
    config: {
      duration: 800,
      easing: easeQuadIn
    }, onRest: {
      opacity: (e) => {
        if (e.value < 0.5) {
          useStore.setState({mode: ModeEnums.NODE_SCENE})
          videoEl.current.pause()
        }
      },
    },
  }))

  const checkProgress = (e) => {
    if (e.target.currentTime > e.target.duration - 3) {
      hide()
    }
  }

  return (
    <Wrapper style={{...styles}}>
      <video autoPlay={false} ref={videoEl}
             onEnded={(e)=>{
               console.log("onEnd",e)
             }}
             onTimeUpdate={(e)=>{
               checkProgress(e)
             }}
      >
        <source src={"mine://" + videoUrl}/>
      </video>
    </Wrapper>
  );
}


const Wrapper = styled(animated.div)`

  z-index: 100;

  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  pointer-events: none;

  video: {
    width: 100%;
    min-height: 100px;
    height: auto;
  }
`
