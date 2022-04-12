import '@/styles/global.css'
import '@/styles/index.css'
import '@/styles/reset.css'
import {ThemeProvider} from '@emotion/react'
import dynamic from 'next/dynamic'
import {useEffect, useRef} from 'react'
import Header from 'renderer/src/layout/HtmlHeader'
import useStore from '@/store'
import {main} from 'renderer/src/styles/theme'
import {Canvas} from "@react-three/fiber";
import {sRGBEncoding} from "three";

const Main = dynamic(() => import('@/components/'), {ssr: false})
const TweenManager = dynamic(() => import('renderer/src/layout/TweenManager'), {ssr: false,})

function App({Component, pageProps = {title: 'index'}}) {

  const ref = useRef(null)

  useEffect(() => {
    useStore.setState({dom: ref})
  }, [])

  return (
    <ThemeProvider theme={main}>
      <Header title={pageProps.title}/>
      <TweenManager/>
      <div
        ref={ref}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <Component {...pageProps} />
      </div>

      <Canvas
        mode='concurrent'
        gl={{antialias: true, alpha: true, outputEncoding: sRGBEncoding}}
        onCreated={
          (state) => {
            state.events.connect(ref.current)
          }
        }
      >
        {/*<StatsView />*/}
        <Main/>
      </Canvas>
    </ThemeProvider>
  )
}

export default App
