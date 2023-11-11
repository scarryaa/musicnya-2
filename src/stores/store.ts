import { createStore } from 'solid-js/store'

export const [store, setStore] = createStore({
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
  currentTrack: {
    id: '',
    title: '',
    artist: '',
    album: '',
    artwork: ''
  }
})
