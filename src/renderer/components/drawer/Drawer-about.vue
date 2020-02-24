<template>
  <div class="Container">
    <p class="Drawer-heading">About</p>
    <section>
      
      <h2> BenTool - PathConverter</h2>
      <p class="label">Version: {{ version }} <span
          class="link"
          @click="openUrl(releaseUrl)"
        >(release notes)</span></p>
      <p
        class="label link"
        @click="openUrl('https://github.com/BenZstory')"
      >License and Documentation</p>
    </section>
  </div>
</template>

<script>
import * as pckg from './../../../../package.json'
import { shell } from 'electron'

export default {
  name: 'DrawerAbout',
  data() {
    return {
      license: pckg.license,
      version: pckg.version
    }
  },
  computed: {
    releaseUrl() {
      return `not released yet`
      // return `https://github.com/Splode/pomotroid/releases/tag/v${this.version}`
    }
  },
  methods: {
    openUrl(url) {
      shell.openExternal(url)
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: $colorGreen;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin: 0.5em 0;
}

section {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 2em;
  height: 100%;
}

.label {
  font-size: 14px;
  letter-spacing: 0.05em;
  line-height: 2;
  & .link,
  &.link {
    cursor: pointer;
    transition: $transitionDefault;
    &:hover {
      color: $colorGreen;
    }
  }
}
</style>
