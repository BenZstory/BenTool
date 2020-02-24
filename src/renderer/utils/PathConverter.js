import { globalShortcut, clipboard } from 'electron'
const child_process = require('child_process');
const PY_SCRIPT_PATH = 'C:\\Workspace\\projects\\BenTool\\py_scripts\\path_convert.py'

export class PathConverter {
  constructor() {
    if (!PathConverter.instance) {
      PathConverter.instance = this
    }
    return PathConverter.instance;
  }

  init(win, localStore) {
    this.win = win
    this.shortcut = localStore.get('pathConvertShortcut')
    this.enabled = localStore.get('pathConvertEnable')
    this.winPrefix = localStore.get('pathConvertWinPrefix')
    this.unixPrefix = localStore.get('pathConvertUnixPrefix')

    if (this.enabled) {
      this.enableConverter()
    }
  }

  enableConverter() {
    const ret = globalShortcut.register(this.shortcut, () => {
      const text = clipboard.readText()
      this.win.webContents.send('clipboardOriginal', text)

      const converted = this.convertWithPyScript(text)

      clipboard.writeText(converted)
      this.win.webContents.send('clipboardConverted', converted)
    })
    if (!ret) {
      console.log('globalShortcut registration failed!')
    }
  }

  convertWithPyScript(original) {
    var paramWinPrefix = this.winPrefix == '' ? 'none' : this.winPrefix
    var paramUnixPrefix = this.unixPrefix == '' ? 'none' : this.unixPrefix

    const exec_str = 'python ' + PY_SCRIPT_PATH + ' ' + original + ' ' + paramWinPrefix + ' ' + paramUnixPrefix
    var ret = child_process.execSync(exec_str)

    var textEncoding = require('text-encoding'); 
    var TextDecoder = textEncoding.TextDecoder;
    var string = new TextDecoder("utf-8").decode(ret).trim();
    return string
  }

  unregister() {
    globalShortcut.unregister(this.shortcut)
  }

  toggle() {
    this.enabled = !this.enabled
    this.localStore.set('pathConvertEnable', this.enabled)
    if (this.enabled) {
      this.enableConverter()
    } else {
      this.unregister()
    }
  }

  updateShortcut(newShortcut) {
    console.log("[PathConverter] updateShortcut to " + newShortcut)
    if (newShortcut === this.shortcut) {
      console.log('Updating shortcut to the same one, skip.')
    } else {
      this.unregister()
      this.shortcut = newShortcut
      this.enableConverter()
    }
  }

  updateWinPrefix(val) {
    this.winPrefix = val
  }

  updateUnixPrefix() {
    this.unixPrefix = val
  }
}

const pathConverter = new PathConverter()
export default pathConverter

