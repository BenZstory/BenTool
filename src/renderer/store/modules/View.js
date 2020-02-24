import { localStore } from './index'

const state = {
  currentDrawer: 'appDrawerConverter',
  drawerOpen: false,
  main: 0,
  alwaysOnTop: localStore.get('alwaysOnTop'),
  minToTray: localStore.get('minToTray'),
  clipboardOriginal : '',
  clipboardConverted: '',
  pathConvertShortcut : localStore.get('pathConvertShortcut'),
  pathConvertWinPrefix: localStore.get('pathConvertWinPrefix'),
  pathConvertUnixPrefix: localStore.get('pathConvertUnixPrefix'),
  os: process.platform
}

const getters = {
  currentDrawer() {
    return state.currentDrawer
  },

  drawerOpen() {
    return state.drawerOpen
  },

  alwaysOnTop() {
    return state.alwaysOnTop
  },

  minToTray() {
    return state.minToTray
  },

  clipboardOriginal() {
    return state.clipboardOriginal
  },

  clipboardConverted() {
    return state.clipboardOriginal
  },

  pathConvertShortcut() {
    return state.pathConvertShortcut
  },

  pathConvertWinPrefix() {
    return state.pathConvertWinPrefix
  },

  pathConvertUnixPrefix() {
    return state.pathConvertUnixPrefix
  },

  os() {
    return state.os
  }
}

const mutations = {
  SET_SETTING(state, payload) {
    localStore.set(payload.key, payload.val)
  },

  SET_VIEW_STATE(state, payload) {
    state[payload.key] = payload.val
  },

  TOGGLE_DRAWER(state) {
    state.drawerOpen = !state.drawerOpen
  }
}

const actions = {
  setSetting({ commit }, payload) {
    commit('SET_SETTING', payload)
  },

  setViewState({ commit }, payload) {
    commit('SET_VIEW_STATE', payload)
  },

  toggleDrawer({ commit }) {
    commit('TOGGLE_DRAWER')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
