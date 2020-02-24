<template>
  <div class="Container">
    <p class="Drawer-heading">Converter Settings</p>

    <el-row class="Setting-wrapper">
      <el-col :span="12" class="Setting-title"><p >Windows 路径前缀</p></el-col>
      <el-col :span="12">
        <el-input 
        :autofocus="true" 
        v-model="winPrefix" 
        placeholder="win">
        </el-input>
      </el-col>
    </el-row>

    <el-row class="Setting-wrapper">
      <el-col :span="12" class="Setting-title"><p >Unix 路径前缀</p></el-col>
      <el-col :span="12">
        <el-input 
        v-model="unixPrefix" 
        placeholder="unix">
        </el-input>
      </el-col>
    </el-row>

    <el-row class="Setting-wrapper">
      <el-col :span="12" class="Setting-title"><p >Global Shortcut</p></el-col>
      <el-col :span="12">
        <el-input 
        @keydown.native.prevent="keyDetect($event)" 
        @blur="applySettings"
        :autofocus="true" 
        v-model="shortcut" 
        placeholder="请输入快捷键">
        </el-input>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { parseKey } from './../../utils/KeyParser'

export default {
  name: 'Drawer-converter',

  data () {
    return {
      shortcut: this.$store.getters.pathConvertShortcut
    }
  },

  computed: {
    winPrefix: {
      get() {
        return this.$store.getters.pathConvertWinPrefix
      },
      set (value) {
        ipcRenderer.send('update-WinPrefix', value)
        console.log("BENZZZZZ send win prefix " + value)
        const payload = {
          key: 'pathConvertWinPrefix',
          val: value
        }
        this.$store.dispatch('setSetting', payload)
        this.$store.dispatch('setViewState', payload)
      }
    },

    unixPrefix: {
      get() {
        return this.$store.getters.pathConvertUnixPrefix
      },
      set (value) {
        ipcRenderer.send('update-UnixPrefix', value)
        const payload = {
          key: 'pathConvertUnixPrefix',
          val: value
        }
        this.$store.dispatch('setSetting', payload)
        this.$store.dispatch('setViewState', payload)
      }
    },

    os() {
      return this.$store.getters.os
    }
  },

  methods: {
    keyDetect(event) {
      this.shortcut = parseKey(event).join('+')
    },

    applySettings() {
      ipcRenderer.send('update-converter-shortcut', this.shortcut)
      const payload = {
        key: 'pathConvertShortcut',
        val: this.shortcut
      }
      this.$store.dispatch('setSetting', payload)
      this.$store.dispatch('setViewState', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.Checkbox {
  background-color: $colorNavy;
  border: 2px solid $colorBlueGrey;
  border-radius: 100%;
  display: inline-block;
  transition: $transitionDefault;
  width: 16px;
  height: 16px;
  &:hover {
    border-color: $colorRed;
  }
  &.is-active {
    background-color: $colorRed;
    border-color: $colorNavy;
    &:hover {
      background-color: $colorNavy;
      border-color: $colorRed;
    }
  }
}

.Setting-wrapper {
  background-color: $colorNavy;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  padding: 12px;
}

.Setting-title {
  color: $colorBlueGrey;
  font-size: 14px;
  letter-spacing: 0.05em;
}
</style>
