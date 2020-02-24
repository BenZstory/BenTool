<template>
  <nav class="Titlebar">
    <!-- menu -->
    <div
      class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--single"
      style="position: absolute;"
      @click="toggleDrawer"
    >
      <div
        class="Menu-wrapper"
        :class="drawerOpen ? 'is-collapsed' : ''"
      >
        <div class="Menu-line"></div>
        <div class="Menu-line"></div>
      </div>
    </div>

    <h1 class="Title">PathConverter</h1>

    <div
      class="Bar-Icon-Group"
      style="position: absolute; top: 0; right: 0; margin-right:12px"
    >
      <i class="el-icon-minus" @click="winMinimize"></i>
      <i class="el-icon-circle-plus-outline" @click="openMiniWindow"></i>
      <i class="el-icon-close" @click="winClose"></i>
    </div>
    
  </nav>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  computed: {
    drawerOpen() {
      return this.$store.getters.drawerOpen
    },

    minToTray() {
      return this.$store.getters.minToTray
    }
  },

  methods: {
    toggleDrawer() {
      this.$store.dispatch('toggleDrawer')
    },

    openMiniWindow() {
      console.log("open mini window")
    },

    winClose() {
      ipcRenderer.send('window-close')
    },

    winMinimize() {
      console.log("BENZZZZZZZ minimize")
      ipcRenderer.send('window-minimize', false) // this.minToTray
    }
  }
}
</script>

<style lang="scss" scoped>
.Icon--close,
.Icon--minimize {
  & line {
    stroke: $colorBlueGrey;
    transition: $transitionDefault;
  }
}

.Bar-Icon-Group {
  margin-top: 12px;
  -webkit-app-region: no-drag;
}

.Bar-Icon-Group i {
  // cursor: pointer;
  font-size: 120%;
  font-weight: bold;
  width: 20px; 
  height: 100%;
  margin-left: 3px;
  color : $colorBlueGrey;
  &:hover {
    color: $colorRed;
  }
}

.Menu-line {
  background-color: $colorBlueGrey;
  display: inline-block;
  transition: $transitionDefault;
  width: 20px;
  height: 2px;
  &:last-child {
    width: 10px;
  }
}

.Menu-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
  &.is-collapsed {
    & .Menu-line:first-child {
      transform: rotate(-45deg);
      width: 12px;
    }
    & .Menu-line:last-child {
      transform: rotate(45deg);
      width: 12px;
    }
  }
}

.Title {
  color: $colorGreen;
  font-size: 1rem;
  font-weight: 200;
  padding-top: 18px;
}

.Titlebar {
  letter-spacing: 0.05em;
  margin-bottom: 18px;
  position: relative;
  text-align: center;
  height: 50px;
  -webkit-app-region: drag;
}

.Icon-wrapper--titlebar {
  -webkit-app-region: no-drag;
  &:hover .Menu-line {
    background-color: $colorRed;
  }
  &:hover .Icon--close line,
  &:hover .Icon--minimize line {
    stroke: $colorRed;
  }
}
</style>
