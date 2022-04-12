import styled from "@emotion/styled"
import {animated, useSpring} from "react-spring";
import {easeQuadIn} from "d3-ease";
import React, {useEffect, useRef, useState} from "react";
import useStore, {ModeEnums} from "@/store";

const IframePlayer: React.FC = () => {

  const { iframeUrl, mode } = useStore()
  const [keyForRefresh, setKeyForRefresh] = useState(0);
  const [currentOpacity, setCurrentOpacity] = useState(0)

  const refMode = useRef(mode)
  useEffect(() => {
    refMode.current = mode
    onChangeScene()
  }, [mode])

  const refUrl = useRef(iframeUrl)
  useEffect(() => {
    refUrl.current = iframeUrl
    onChangeScene()
  }, [iframeUrl])

  const onChangeScene = () => {
    if (refMode.current == ModeEnums.IFRAME_SCENE && currentOpacity != 1.0) {
      console.log('url', refUrl.current)
      setKeyForRefresh(keyForRefresh+1)
      show()
    }
    else {
      if (currentOpacity != 0.0) hide()
    }
  }

  function show() {
    const opacity = 1.0
    setStyles({opacity: opacity})
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
    }
  }))

  return (
    <Wrapper style={{ ...styles}}>
      <iframe
        key={keyForRefresh}
        src={refUrl.current}
        sandbox="allow-scripts allow-top-navigation allow-same-origin"
      />
    </Wrapper>
  );
}

export default IframePlayer


const Wrapper = styled(animated.div)`
  
  z-index: 100;
  
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  iframe {
    width: 100%;
    height: 100%;
    background: black;
  }
`
