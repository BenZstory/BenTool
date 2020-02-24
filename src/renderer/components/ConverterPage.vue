<template>
  <div id="converterPage-wrapper">
    <app-titlebar />
    
    <transition
      name="slide-left"
      mode="out-in"
    >
      <app-drawer v-if="drawerOpen" />
    </transition>
    <!-- <router-view></router-view> -->
    <app-Clipboard />
  </div>
</template>

<script>
  import appDrawer from '@/components/drawer/Drawer'
  import appTitlebar from '@/components/Titlebar'
  import appClipboard from '@/components/Clipboard'

  export default {
    name: 'converter-page',

    components: {
      appDrawer,
      appTitlebar,
      appClipboard
    },

    computed: {
      // store getters
      drawerOpen() {
        return this.$store.getters.drawerOpen
      },

      alwaysOnTop() {
        return this.$store.getters.alwaysOnTop
      },

      os() {
        return this.$store.getters.os
      }
    }
  }
</script>

<style lang="scss">
#converterPage-wrapper {
  animation: fade-in 0.5s ease forwards;
  position: relative;
  overflow: hidden;
  height: 100vh;
}
</style>