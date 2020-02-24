<template>
  <div class="Drawer-menu">
    <div
      class="Drawer-menu-wrapper"
      @click="setDrawerComponent('appDrawerConverter')"
      :class="{ 'is-active': currentDrawer === 'appDrawerConverter' }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          converter
        </div>
      </div>
    </div>
    <div
      class="Drawer-menu-wrapper"
      @click="setDrawerComponent('appDrawerSettings')"
      :class="{ 'is-active': currentDrawer === 'appDrawerSettings' }"
    >
      <div class="Drawer-menu-button">
        <i class="el-icon-s-tools"></i>
      </div>
    </div>
    <div
      class="Drawer-menu-wrapper"
      @click="setDrawerComponent('appDrawerAbout')"
      :class="{ 'is-active': currentDrawer === 'appDrawerAbout' }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          <i class="el-icon-info"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer-menu',

  computed: {
    currentDrawer() {
      return this.$store.getters.currentDrawer
    }
  },

  methods: {
    setDrawerComponent(component) {
      const payload = {
        key: 'currentDrawer',
        val: component
      }
      this.$store.dispatch('setViewState', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.Drawer-menu {
  background-color: $colorNavy;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 36px;
}

.Drawer-menu-wrapper {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  position: relative;
  transition: $transitionDefault;
  height: 100%;
  &:hover {
    background-color: $colorLightNavy;
  }
  &::after {
    background-color: $colorRed;
    content: '';
    margin: 0 auto;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    transition: $transitionSnappy;
    width: 0;
    height: 2px;
  }
  &.is-active::after {
    width: 33%;
  }
}

.Drawer-menu-button {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 45px;
  height: 100%;
  &.is-active {
    border-bottom: 4px solid $colorRed;
  }
}

.Drawer-menu-button i {
  font-size: 24px;
}

</style>
