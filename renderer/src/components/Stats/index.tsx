import React, { useEffect } from 'react'
import Stats from 'stats.js'
import useStore from '@/store'

class StatsClass {
  stats: Stats

  constructor() {}

  init() {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }
}

export const StatsView: React.FC = () => {
  const { setStats } = useStore()

  useEffect(() => init(), [])

  const init = () => {
    const __stats = new StatsClass()
    __stats.init()

    setStats(__stats.stats)

  }

  return null
}
