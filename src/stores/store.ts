import { createStore } from 'solid-js/store'
import { platform } from '@tauri-apps/api/os'

export const [store, setStore] = createStore({
  app: {
    title: 'musicnya 2',
    version: '1.0.0',
    platform: await platform(),
    navigate: null,
    isMaximized: false,
    isDarkMode: localStorage.getItem('darkMode') === 'true' || false,
    isMiniMode: localStorage.getItem('miniMode') === 'true' || false,
    leftSidebarWidth: Number.parseInt(localStorage.getItem('leftSidebarWidth')) || 100,
    rightSidebar: {
      isExpanded: localStorage.getItem('rightSidebarExpanded') === 'true' || false,
      width: localStorage.getItem('rightSidebarExpanded') === 'true' ? 250 : 40,
      activePanel: ''
    },
    general: {
      defaultPage: localStorage.getItem('defaultPage') || 'home'
    },
    media: {
      hideEditorialNotes: localStorage.getItem('hideEditorialNotes') === 'true' || false,
      expandEditorialNotes:
        localStorage.getItem('expandEditorialNotes') === 'true' || false,
      hideLinkTiles: localStorage.getItem('hideLinkTiles') === 'true' || false,
      disableAnimatedArtwork:
        localStorage.getItem('disableAnimatedArtwork') === 'true' || false
    },
    contextMenu: {
      x: -10000,
      y: -10000,
      items: [],
      open: false,
      id: '',
      type: '',
      display: 'block'
    },
    subContextMenu: {
      x: -10000,
      y: -10000,
      items: [],
      open: false,
      id: '',
      type: '',
      display: 'block'
    }
  },
  countryCode: localStorage.getItem('countryCode') || 'us',
  progress: 0,
  duration: 0,
  currentTime: 0,
  seekTime: 0,
  volume: Number.parseInt(localStorage.getItem('volume')) || 20,
  isPlaying: false,
  isPaused: false,
  isStopped: true,
  isSeeking: false,
  isAuthorized: false,
  shuffleMode: localStorage.getItem('shuffleMode') === 'true' || false,
  repeatMode: localStorage.getItem('repeatMode') === 'true' || false,
  libraryPlaylists: [],
  currentTrack: {
    id: '',
    title: '',
    artist: '',
    album: '',
    artwork: '',
    type: '',
    parentType: '',
    parentID: ''
  }
})
