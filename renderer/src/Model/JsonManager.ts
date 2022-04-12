import { ipcRenderer } from 'electron'

export const getJson = () => {
  return ipcRenderer.invoke('get-json')
}

export const saveJson = (nodes: {}) => {
  console.log('save to json')

  ipcRenderer
    .invoke('save-json', nodes)
    .then((val) => {
      console.log('save to json succeeded')
    })
    .catch((err) => console.log('[SaveJsonError]', err))
}

