import {MathUtils} from "@/utils/math"
import {Color} from "three"

export const main = {
  fonts: {
    mainSize: '15px',
    bigSize: '20px',
    smallSize: '12px',
    path_jp: './fonts/NotoSansJP-Medium.otf',
    path_en: './fonts/Avenier Next006.ttf'
  },
  colors: {
    main: '#4d8383',
    white: '#FFFFFF',
    light: '#f2f2f2',
    gray: '#707070',
    dark: '#6f6f6f',
    black: '#383838',
    red: '#ec6762',
    green: '#6fd791',
    blue: '#668ce7',
    orange: '#f1af57',
    yellow: '#f9de65',
    water: '#fdde44',
    perple: '#a160d2',
  },
}

export const getRandomColor: () => Color = () => {

  const index = MathUtils.randInt(6, Object.keys(main.colors).length)

  let answer = ""

  Object.keys(main.colors).map((key, i) => {
    const color = main.colors[key]

    if (i == index) {
      answer = color
    }

  })

  return new Color( answer )

}
