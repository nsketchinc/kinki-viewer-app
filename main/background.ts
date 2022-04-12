import { app, BrowserWindow, dialog, ipcMain, protocol } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import createWindow from './create-window'
import { fileHandler, UpsertKeyValue } from './utils'
import path from "path";
const isProd: boolean = process.env.NODE_ENV === 'production'
let window: BrowserWindow





if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const x = 1920
  const y = 0
  // const width = 1920
  const width = 1920 * 2
  // const height = 540
  const height = 1080

  const mainWindow = createWindow('main', {
    width: width,
    height: height,
    frame: false,
    transparent: true,
  })

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { requestHeaders } = details
      UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*'])
      callback({ requestHeaders })
    }
  )

  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      const { responseHeaders } = details
      if (details.responseHeaders['Access-Control-Allow-Origin']) {
        details.responseHeaders['Access-Control-Allow-Origin'] = ['*']
        details.responseHeaders['Access-Control-Allow-Headers'] = ['*']
      } else if (details.responseHeaders['access-control-allow-origin']) {
        details.responseHeaders['access-control-allow-origin'] = ['*']
        details.responseHeaders['access-control-allow-headers'] = ['*']
      }
      if (details.responseHeaders['X-Frame-Options']) {
        delete details.responseHeaders['X-Frame-Options']
      } else if (details.responseHeaders['x-frame-options']) {
        delete details.responseHeaders['x-frame-options']
      }
      callback({
        cancel: false,
        responseHeaders,
      })
    }
  )
   protocol.registerFileProtocol('mine', fileHandler)


  if (isProd) {
    await mainWindow.loadURL('app://./index.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
  }
    // mainWindow.webContents.openDevTools()

    // SET HERE FOR PRODUCTION -> SHOWS TO EXTENDED DISPLAY ALWWAYS
    mainWindow.setBounds({ x: x, y: y, width: width, height: height })
})()

const desktop_path = app.getPath('desktop')
console.log(desktop_path)

const store = new Store({
  name: 'messages',
  // cwd: path.resolve(process.cwd() + '/../kinki-data'),
  cwd: desktop_path
})


// ===============================================
// json
// -----------------------------------------------

// jsonにノードデータを追加
ipcMain.handle('save-json', (event, arg) => {
  console.log(arg)
  // jsonにセット
  store.set('node', arg)

  return true
})

// 現在のjsonを取得
ipcMain.handle('get-json', (event, arg) => {
  const nodes = (store.get('node') as any) || []
  return nodes
})

// ===============================================
// electron
// -----------------------------------------------

ipcMain.handle(
  'open-dialog',
  async (_e: Electron.IpcMainInvokeEvent, _arg: any) => {
    return new Promise((resolve, reject) => {
      dialog
        .showOpenDialog(window, {
          title: 'Select file',
          properties: ['openFile'],
        })
        .then(({ filePaths: paths }) => {
          if (paths) {
            resolve(paths[0])
          } else {
            reject()
          }
        })
        .catch((error) => {
          reject(error.message)
        })
    })
  }
)

app.on('window-all-closed', () => {
  app.quit()
})
