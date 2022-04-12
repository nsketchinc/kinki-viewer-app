import { Vector2 } from 'three'

export const getDomSize = (dom: HTMLDivElement) => {
  return { width: dom.clientWidth, height: dom.clientHeight }
}

export const getDomResolution = (dom: HTMLDivElement) => {
  const pixelRatio = Math.min(2, window.devicePixelRatio)
  const width = dom.clientWidth * pixelRatio
  const height = dom.clientHeight * pixelRatio

  return new Vector2(width, height)
}
