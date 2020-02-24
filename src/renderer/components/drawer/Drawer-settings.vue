<template>
  <div class="Container">
    <p class="Drawer-heading">Main Settings</p>
    <el-row class="Setting-wrapper">
      <el-col :span="20" class="Setting-title"><p class="Setting-title">Always On Top</p></el-col>
      <el-col :span="4" style="text-align: right;">
        <div class="Checkbox" @click="selectAlwaysOnTop"
          :class="alwaysOnTop ? 'is-active' : 'is-inactive'"
        ></div>
      </el-col>
    </el-row>

    <el-row class="Setting-wrapper" v-if="os === 'win32'">
      <el-col :span="20" class="Setting-title"><p class="Setting-title">Minimize to Tray</p></el-col>
      <el-col :span="4" style="text-align: right;">
        <div class="Checkbox" @click="selectMinToTray"
          :class="minToTray ? 'is-active' : 'is-inactive'"
        ></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Drawer-settings',

  data () {
    return {
      shortcut: this.$store.getters.pathConvertShortcut
    }
  },

  computed: {
    alwaysOnTop() {
      return this.$store.getters.alwaysOnTop
    },

    minToTray() {
      return this.$store.getters.minToTray
    },

    os() {
      return this.$store.getters.os
    }
  },

  methods: {
    selectAlwaysOnTop() {
      const payload = {
        key: 'alwaysOnTop',
        val: !this.alwaysOnTop
      }
      ipcRenderer.send('toggle-alwaysOnTop', !this.alwaysOnTop)
      this.$store.dispatch('setSetting', payload)
      this.$store.dispatch('setViewState', payload)
    },

    selectMinToTray() {
      const payload = {
        key: 'minToTray',
        val: !this.minToTray
      }
      ipcRenderer.send('toggle-minToTray', !this.minToTray)
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
