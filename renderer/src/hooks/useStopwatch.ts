import { useEffect, useRef, useState } from 'react'

export default function useStopwatch(max = 10000, autostart = false) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(autostart)
  const intervalRef = useRef<any>()

  const updateTime = 1
  const updateInterval = 10
  const maxTime = max

  function pause() {
    if (intervalRef.current) {
      setIsRunning(false)
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }

  function _update() {
    setSeconds((prev: number) => prev + updateTime)
  }

  function start() {
    if (!intervalRef.current) {
      setIsRunning(true)
      intervalRef.current = setInterval(_update, updateInterval)
    }
  }

  function reset() {
    pause()
    setSeconds(0)
    if (autostart) start()
  }

  useEffect(() => {
    if (autostart) start()
    return pause
  }, [])

  useEffect(() => {
    if (seconds > maxTime) reset()
  }, [seconds])

  return {
    seconds: seconds,
    start: start,
    pause: pause,
    reset: reset,
    isRunning: isRunning,
  }
}
