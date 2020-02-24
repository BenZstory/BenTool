import { clipboard } from 'electron'
import { windowManager, WindowEnum } from './windowManager'
import bus from './../utils/eventBus'
import { pathConverter } from './../../renderer/utils/PathConverter'

export default {
  listen() {
    ipcMain.on('toggle-alwaysOnTop', (event, arg) => {
      windowManager.get(WindowEnum.MAIN_WINDOW).setAlwaysOnTop(arg)
      windowManager.get(WindowEnum.MINI_WINDOW).setAlwaysOnTop(arg)
    })

    ipcMain.on('toggle-minToTray', (event, arg) => {
      if (arg) {
        createTray()
      } else {
        tray.destroy()
      }
    })

    ipcMain.on('window-close', (event, arg) => {
      windowManager.get(WindowEnum.MAIN_WINDOW).close()
    })

    ipcMain.on('window-minimize', (event, arg) => {
      if (arg) {
        windowManager.get(WindowEnum.MAIN_WINDOW).hide()
      } else {
        windowManager.get(WindowEnum.MAIN_WINDOW).minimize()
      }
    })

    ipcMain.on('update-converter-shortcut', (event, arg) => {
      pathConverter.updateShortcut(arg)
    })

    ipcMain.on('update-WinPrefix', (event, arg) => {
      pathConverter.updateWinPrefix(arg)
    })

    ipcMain.on('update-UnixPrefix', (event, arg) => {
      pathConverter.updateUnixPrefix(arg)
    })
  }
}














