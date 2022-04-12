import create from 'zustand'

export class ModeEnums {
  public static NODE_SCENE = 0
  public static VIDEO_SCENE = 1
  public static IFRAME_SCENE = 2
}

interface StoreState {
  dom: any
  setDom: (any) => void
  stats: any
  setStats: (any) => void

  videoUrl: string
  setVideoUrl: (string) => void
  iframeUrl: string
  setIframeUrl: (string) => void

  mode: number
  setMode: (number) => void
}

const useStore = create<StoreState>((set) => ({
    dom: null,
    setDom: (ref) => set((state) => ({ dom: ref })),
    stats: null,
    setStats: (ref) => set((state) => ({ stats: ref })),

    videoUrl: null,
    setVideoUrl: (ref) => set(state => ({ videoUrl: ref})),
    iframeUrl: null,
    setIframeUrl: (ref) => set(state => ({ iframeUrl: ref})),

    mode: 0,
    setMode: (ref) => set(state => ({ mode: ref}))
}))

export default useStore
