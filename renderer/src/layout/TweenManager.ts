import TWEEN from '@tweenjs/tween.js'
import { useEffect } from 'react'

const TweenManager: React.FC = () => {
  // @ts-ignore
  useEffect(() => window.requestAnimationFrame(animate), [])

  function animate(time: number) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
  }

  return null
}

export default TweenManager
