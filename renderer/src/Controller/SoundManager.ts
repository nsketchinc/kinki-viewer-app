class SoundManager {
  bgm: HTMLAudioElement
  se: HTMLAudioElement

  constructor() {}
  setBGM(src: string) {
    this.bgm = new Audio(src)
  }
  setSE(src: string) {
    this.se = new Audio(src)
  }
  getBGM() {
    return this.bgm
  }
  getSE() {
    return this.se
  }

  playBGM() {
    this.bgm.loop = true
    this.bgm.play()
  }
  playSE() {
    this.se.play()
  }

  pauseBGM() {
    this.bgm.pause()
  }
  pauseSE() {
    this.se.pause()
  }
}
export default new SoundManager()
