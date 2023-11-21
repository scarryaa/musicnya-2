import { useNavigate } from '@solidjs/router'
import { Component, createEffect, createSignal } from 'solid-js'
import { mkController } from './api/mkController'
import { ContextMenu } from './components/ContextMenu/ContextMenu'
import { Footer } from './components/Footer/Footer'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { Main } from './components/Main/Main'
import { RightSidebar } from './components/RightSidebar/RightSidebar'
import { Topbar } from './components/Topbar/Topbar'
import { setStore, store } from './stores/store'
import { Utils } from './util/util'
import { initDB } from './db/db'
import { Modal } from './components/Modals/Modal'
import { albumService } from './services/albumService'
import { playlistService } from './services/playlistService'
import '@fontsource/inter'

const App: Component = () => {
  const navigate = useNavigate()
  initDB()

  const fetchLibraryAlbums = async (offset: number) => {
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

            if (res.next) {
              fetchLibraryAlbums(store.library.albums.length)
            }
          },
          err => {
            console.error(err)
          }
        )
    } catch (error) {
      console.error('Error fetching albums:', error)
    }
  }

  const fetchLibraryPlaylists = async (offset: number) => {
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
              fetchLibraryPlaylists(store.library.playlists.length)
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
        })
    } catch (error) {
      console.error('Error fetching playlists:', error)
    }
  }

  createEffect(async () => {
    Utils.setDarkMode(localStorage.getItem('darkMode') === 'true')
    Utils.disableContextMenu()

    await mkController.authorize()
    navigate(Utils.parseSelectedDefaultPage(store.app.general.defaultPage))

    fetchLibraryPlaylists(0)
    fetchLibraryAlbums(0)
    setStore('app', 'navigate', () => navigate)
  })

  return (
    <div class="appContainer" right-drawer={store.app.rightSidebar.isExpanded}>
      <Topbar />
      <LeftSidebar />
      <RightSidebar />
      <Main />
      <Footer />
      <ContextMenu />
      <Modal />
    </div>
  )
}

export default App
