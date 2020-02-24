<template>
  <div class="Drawer">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="currentDrawer" />
    </transition>
    <app-drawer-menu />
  </div>
</template>

<script>
import appDrawerMenu from '@/components/drawer/Drawer-menu'
import appDrawerSettings from '@/components/drawer/Drawer-settings'
import appDrawerAbout from '@/components/drawer/Drawer-about'
import appDrawerConverter from '@/components/drawer/Drawer-converter'

export default {
  name: 'Drawer',

  components: {
    appDrawerMenu,
    appDrawerSettings,
    appDrawerAbout,
    appDrawerConverter
  },

  computed: {
    currentDrawer() {
      return this.$store.getters.currentDrawer
    }
  }
}
</script>

<style lang="scss" scoped>
.Drawer {
  background-color: $colorLightNavy;
  position: relative;
  width: 100%;
  height: calc(100% - 68px);
  z-index: 1;
  -webkit-app-region: no-drag;
}
</style>
