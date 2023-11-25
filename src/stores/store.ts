import { createStore } from 'solid-js/store'
import { playlistService } from '../services/playlistService'
import { albumService } from '../services/albumService'
import { artistService } from '../services/artistService'
import { localStorageService } from '../services/localStorageService'
import { ContextMenuType } from '../types/types'
import { tauriService } from '../services/tauriService'

export const [store, setStore] = createStore({
  app: {
    title: 'musicnya 2',
    version: '1.0.0',
    platform: 'unknown',
    miniPlayer: {
      panelOpen: false,
      activePanel: '' as 'queue' | 'lyrics' | '',
      open: false
    },
    connectivity: {
      discord: {
        enabled: localStorageService.get('discordEnabled') === 'true' || false,
        activity: {
          details: '',
          state: '',
          largeImageKey: '',
          largeImageText: '',
          instance: false,
          startTimestamp: 0,
          endTimestamp: 0
        }
      }
    },
    navigate: (path: string) => Navigator,
    isMaximized: false,
    isDarkMode: localStorageService.get('darkMode') === 'true' || false,
    isMiniMode: localStorageService.get('miniMode') === 'true' || false,
    leftSidebarWidth: Number.parseInt(localStorageService.get('leftSidebarWidth')) || 100,
    rightSidebar: {
      isExpanded: localStorageService.get('rightSidebarExpanded') === 'true' || false,
      width: localStorageService.get('rightSidebarExpanded') === 'true' ? 250 : 40,
      activePanel: ''
    },
    wroteToDb: false,
    modal: {
      open: false,
      type: '',
      id: ''
    },
    general: {
      defaultPage: localStorageService.get('defaultPage') || 'home',
      tooltipDelay: Number.parseInt(localStorageService.get('tooltipDelay')) ?? 500,
      searchPageOnFocus: localStorageService.get('searchPageOnFocus') === 'false' || true
    },
    media: {
      hideEditorialNotes:
        localStorageService.get('hideEditorialNotes') === 'true' || false,
      expandEditorialNotes:
        localStorageService.get('expandEditorialNotes') === 'true' || false,
      hideLinkTiles: localStorageService.get('hideLinkTiles') === 'true' || false,
      disableAnimatedArtwork:
        localStorageService.get('disableAnimatedArtwork') === 'true' || false
    },
    queue: {
      autoplay: localStorageService.get('autoplay') === 'true' || false,
      items: [],
      index: 0,
      shuffle: false,
      repeat: false,
      nextUpIndex: 0,
      remainingStartIndex: 1
    },
    contextMenu: {
      x: -10000,
      y: -10000,
      items: [],
      open: false,
      id: '',
      catalogId: '',
      type: '' as ContextMenuType,
      subType: '',
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
  countryCode: localStorageService.get('countryCode') || 'us',
  progress: 0,
  duration: 0,
  currentTime: 0,
  seekTime: 0,
  volume: Number.parseInt(localStorageService.get('volume')) || 20,
  isPlaying: false,
  isPaused: false,
  isStopped: true,
  isSeeking: false,
  isAuthorized: false,
  shuffleMode: localStorageService.get('shuffleMode') === 'true' || false,
  repeatMode:
    localStorageService.get('repeatMode') || ('none' as MusicKit.PlayerRepeatMode),

  library: {
    loading: false,
    loadingOperations: 0,
    albums: JSON.parse(localStorageService.get('library'))?.albums || [],
    playlists: JSON.parse(localStorageService.get('library'))?.playlists || [],
    artists: JSON.parse(localStorageService.get('library'))?.artists || [],
    songs: JSON.parse(localStorageService.get('library'))?.songs || [],
    reset() {
      setStore('library', 'albums', [])
      setStore('library', 'playlists', [])
      setStore('library', 'artists', [])
      setStore('library', 'songs', [])
    },
    incrementLoadingOperations() {
      setStore('library', 'loadingOperations', store.library.loadingOperations + 1)
      setStore('library', 'loading', true)
    },
    decrementLoadingOperations() {
      setStore('library', 'loadingOperations', store.library.loadingOperations - 1)
      if (store.library.loadingOperations === 0) {
        setStore('library', 'loading', false)
      }
    },
    async refreshSongs() {
      setStore('library', 'songs', [])
      await store.library.refreshSongs()
    },
    async refreshAlbums() {
      try {
        setStore('library', 'albums', [])
        store.library.incrementLoadingOperations()

        const albumsData = await albumService.fetchAllLibraryAlbums(0)
        console.log(albumsData)
        setStore('library', 'albums', albumsData)
        localStorage.setItem(
          'library',
          JSON.stringify({ ...store.library, albums: albumsData })
        )
      } catch (error) {
        console.error('Error in refreshAlbums:', error)
      } finally {
        store.library.decrementLoadingOperations()
      }
    },
    async refreshPlaylists() {
      try {
        setStore('library', 'playlists', [])
        store.library.incrementLoadingOperations()

        const playlistsData = await playlistService.fetchAndProcessPlaylists(0)
        setStore('library', 'playlists', playlistsData)
        localStorage.setItem(
          'library',
          JSON.stringify({ ...store.library, playlists: playlistsData })
        )
        console.log(playlistsData)
      } catch (error) {
        console.error('Error in refreshPlaylists:', error)
      } finally {
        store.library.decrementLoadingOperations()
      }
    },
    async refreshArtists() {
      try {
        setStore('library', 'artists', [])
        store.library.incrementLoadingOperations()

        const artistsData = await artistService.fetchAllLibraryArtists(0)
        setStore('library', 'artists', artistsData)
        console.log(artistsData)
        localStorage.setItem(
          'library',
          JSON.stringify({ ...store.library, artists: artistsData })
        )
      } catch (error) {
        console.error('Error in refreshArtists:', error)
      } finally {
        store.library.decrementLoadingOperations()
      }
    }
  },
  currentTrack: {
    id: '',
    title: '',
    artist: '',
    album: '',
    artwork: '',
    type: '',
    parentType: '',
    parentID: '',
    inLibrary: false,
    loved: false,
    disliked: false,
    lyrics: {
      lyricsArray: [],
      writtenByArray: [],
      begin: ''
    },
    primaryColor: '',
    duration: 0,
    currentTime: 0
  }
})

async function initializeStore() {
  const platformInfo = await tauriService.getPlatformInfo()
  setStore('app', 'platform', platformInfo)
}

initializeStore()
