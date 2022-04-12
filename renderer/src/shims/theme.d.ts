import '@emotion/react'
import { main } from '../style/theme'

declare module '@emotion/react' {
  interface Theme {
    fonts: Fonts
    colors: Colors
  }
}

interface Fonts {
  mainSize: string
  bigSize: string
  smallSize: string
}

interface Colors {
  main: string
  white: string
  light: string
  gray: string
  dark: string
  black: string
}

type Theme = typeof main

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
