import { VideoPlayer } from '@/components/Player/Video'
import SoundManager from '@/Controller/SoundManager'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const IframePlayer = dynamic(() => import('@/components/Player/Iframe'), {
  ssr: false,
})

const Page = () => {
  useEffect(() => init(), [])
  const init = () => {
    SoundManager.setBGM('./sounds/Kindai_M01.wav')
    SoundManager.playBGM()
  }

  return (
    <>
      <VideoPlayer />
      <IframePlayer />
    </>
  )
}

export default Page
