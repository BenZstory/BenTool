import { BrowserWindow } from 'electron'
import { url } from 'inspector'

const path = require('path')

export const WindowEnum = {
  MAIN_WINDOW: 'MAIN_WINDOW',
  MINI_WINDOW: 'MINI_WINDOW',
  TRAY_WINDOW: 'TRAY_WINDOW',
}

const windowConfigList = {}
windowConfigList[WindowEnum.MAIN_WINDOW] = {
  options() {
    return {
      backgroundColor: '#2F384B',
      fullscreenable: false,
      frame: false,
      icon: path.join(__static, 'icon.png'),
      resizable: false,
      useContentSize: true,
      width: 500,
      height: 378,
      webPreferences: {
        backgroundThrottling: false,
        nodeIntegration: true
      }
    }
  },
  url : process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
}

windowConfigList[WindowEnum.MINI_WINDOW] = {
  options() {
    return {
      height: 64,
      width: 64,
      show: process.platform === 'linux',
      frame: false,
      fullscreenable: false,
      skipTaskbar: true,
      resizable: false,
      transparent: process.platform !== 'linux',
      icon: `${__static}/icon.png`,
      webPreferences: {
        backgroundThrottling: false,
        nodeIntegration: true,
        nodeIntegrationInWorker: true
      }
    }
  }
}

class WindowManager {
  constructor () {
    this.windowMap = new Map()
    this.windowIdMap = new Map()
  }

  create(name) {
    const windowConfig = windowConfigList[name]
    if (windowConfig === undefined) {
      return null
    }

    const window = new BrowserWindow(windowConfig.options())

    this.windowMap.set(name, window)
    this.windowIdMap.set(window.id, name)
    return window
  }

  get(name) {
    if (this.windowMap.has(name)) {
      return this.windowMap.get(name)
    } else {
      const window = this.create(name)
      return window
    }
  }

  has(name) {
    return this.windowMap.has(name)
  }

  delete(name) {
    const window = this.windowMap.get(name)
    if (window) {
      this.windowMap.delete(name)
      this.windowIdMap.delete(window.id)
    }
  }

  deleteById() {
    const name = this.windowIdMap.get(id)
    if (name) {
      this.windowMap.delete(name)
      this.windowIdMap.delete(id)
    }
  }

  getAvailableWindow () {
    const miniWindow = this.windowMap.get(WindowEnum.MINI_WINDOW)
    if (miniWindow && miniWindow.isVisible()) {
      return miniWindow
    } else {
      const mainWindow = this.windowMap.get(WindowEnum.MAIN_WINDOW)
      if (mainWindow) {
        return mainWindow
      } else {
        return this.create(WindowEnum.MAIN_WINDOW)
      }
    }
  }
}

// const windowManager = new WindowManager()
export const windowManager = new WindowManager()








