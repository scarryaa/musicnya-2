import { createStore } from 'solid-js/store'
import { TauriService } from '../api/tauri'
import { playlistService } from '../services/playlistService'
import { albumService } from '../services/albumService'
import { artistService } from '../services/artistService'
import { songService } from '../services/songService'

export const [store, setStore] = createStore({
  app: {
    title: 'musicnya 2',
    version: '1.0.0',
    platform: 'unknown',
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
    wroteToDb: false,
    modal: {
      open: false,
      type: '',
      id: ''
    },
    general: {
      defaultPage: localStorage.getItem('defaultPage') || 'home',
      tooltipDelay: Number.parseInt(localStorage.getItem('tooltipDelay')) ?? 500,
      searchPageOnFocus: localStorage.getItem('searchPageOnFocus') === 'false' || true
    },
    media: {
      hideEditorialNotes: localStorage.getItem('hideEditorialNotes') === 'true' || false,
      expandEditorialNotes:
        localStorage.getItem('expandEditorialNotes') === 'true' || false,
      hideLinkTiles: localStorage.getItem('hideLinkTiles') === 'true' || false,
      disableAnimatedArtwork:
        localStorage.getItem('disableAnimatedArtwork') === 'true' || false
    },
    queue: {
      autoplay: localStorage.getItem('autoplay') === 'true' || false,
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
  library: {
    loading: true,
    albums: JSON.parse(localStorage.getItem('library'))?.albums || [],
    playlists: JSON.parse(localStorage.getItem('library'))?.playlists || [],
    artists: JSON.parse(localStorage.getItem('library'))?.artists || [],
    songs: JSON.parse(localStorage.getItem('library'))?.songs || [],
    async refreshSongs() {
      setStore('library', 'songs', [])
      await store.library.fetchLibrarySongs(0)
    },
    async refreshAlbums() {
      setStore('library', 'albums', [])
      await store.library.fetchLibraryAlbums(0)
    },
    async refreshPlaylists() {
      setStore('library', 'playlists', [])
      await store.library.fetchLibraryPlaylists(0)
    },
    async refreshArtists() {
      setStore('library', 'artists', [])
      await store.library.fetchLibraryArtists(0)
    },
    async fetchLibrarySongs(offset: number) {
      try {
        await songService
          .fetchLibrarySongs({
            platform: 'web',
            limit: 100,
            offset: offset,
            extend: 'artistUrl',
            art: {
              f: 'url'
            },
            include: 'catalog,artists'
          })
          .then(
            res => {
              console.log(res.data)
              setStore('library', 'artists', res.data)
              localStorage.setItem(
                'library',
                JSON.stringify({
                  ...store.library,
                  artists: res.data
                })
              )

              if (res.next) {
                store.library.fetchLibraryArtists(store.library.artists.length)
              }
            },
            err => {
              console.error(err)
            }
          )
      } catch (error) {
        console.error('Error fetching artists:', error)
      }
    },
    async fetchLibraryArtists(offset: number) {
      try {
        await artistService
          .fetchLibraryArtists({
            platform: 'web',
            limit: 100,
            offset: offset,
            extend: 'artistUrl',
            art: {
              f: 'url'
            },
            include: 'catalog,artists'
          })
          .then(
            res => {
              console.log(res.data)
              setStore('library', 'artists', res.data)
              localStorage.setItem(
                'library',
                JSON.stringify({
                  ...store.library,
                  artists: res.data
                })
              )

              if (res.next) {
                store.library.fetchLibraryArtists(store.library.artists.length)
              }
            },
            err => {
              console.error(err)
            }
          )
      } catch (error) {
        console.error('Error fetching artists:', error)
      }
    },
    async fetchLibraryAlbums(offset: number) {
      try {
        await albumService
          .fetchLibraryAlbums({
            platform: 'web',
            limit: 100,
            offset: offset,
            extend: 'artistUrl',
            art: {
              f: 'url'
            },
            include: 'catalog,artists'
          })
          .then(
            res => {
              setStore('library', 'albums', res.data)
              localStorage.setItem(
                'library',
                JSON.stringify({
                  ...store.library,
                  albums: res.data
                })
              )

              if (res.next) {
                store.library.fetchLibraryAlbums(store.library.albums.length)
              }
            },
            err => {
              console.error(err)
            }
          )
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    },
    async fetchLibraryPlaylists(offset: number) {
      try {
        await playlistService
          .fetchLibraryPlaylists({
            platform: 'web',
            limit: 100,
            offset: offset,
            extend: 'artistUrl',
            art: {
              f: 'url'
            },
            include: 'catalog,artists'
          })
          .then(
            res => {
              setStore('library', 'playlists', res.data)

              if (res.next) {
                store.library.fetchLibraryPlaylists(store.library.playlists.length)
              }
            },
            err => {
              console.error(err)
            }
          )
          .finally(async () => {
            // Fetch tracks for each playlist, 100 at a time
            const trackFetchPromises = store.library.playlists.map(playlist =>
              playlistService
                .fetchLibraryPlaylistTracks(playlist.id, {
                  platform: 'web',
                  limit: 100,
                  include: 'catalog,artists,[tracks]=artists',
                  offset: 0
                })
                .then(
                  res => {
                    if (res.next) {
                      // Fetch the rest of the tracks
                      const trackFetchPromises = []
                      for (let i = 100; i < res.meta.total; i += 100) {
                        trackFetchPromises.push(
                          playlistService.fetchLibraryPlaylistTracks(playlist.id, {
                            platform: 'web',
                            limit: 100,
                            include: 'catalog,artists,[tracks]=artists',
                            offset: i
                          })
                        )
                      }

                      return Promise.all(trackFetchPromises).then(responses => {
                        const tracks = responses.reduce((acc, response) => {
                          return [...acc, ...response.data]
                        }, res.data)
                        console.log(tracks)
                        return {
                          ...res,
                          data: tracks
                        }
                      })
                    }
                    return res
                  },
                  err => {
                    console.error(err)
                  }
                )
            )

            const trackResponses = await Promise.all(trackFetchPromises)

            // Map tracks to the corresponding playlists
            const updatedLibraryPlaylists = store.library.playlists.map(
              (playlist, index) => {
                const tracks = trackResponses[index].data
                return {
                  ...playlist,
                  relationships: {
                    ...playlist.relationships,
                    tracks: {
                      data: tracks
                    }
                  }
                }
              }
            )

            // Update the store
            setStore('library', 'playlists', updatedLibraryPlaylists)
            localStorage.setItem(
              'library',
              JSON.stringify({
                ...store.library,
                playlists: updatedLibraryPlaylists
              })
            )
          })
      } catch (error) {
        console.error('Error fetching playlists:', error)
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
    lyrics: {
      lyricsArray: [],
      writtenByArray: [],
      begin: ''
    },
    duration: 0,
    currentTime: 0
  }
})

async function initializeStore() {
  const platformInfo = await TauriService.getPlatformInfo()
  setStore('app', 'platform', platformInfo)
}

initializeStore()
