import { useNavigate } from '@solidjs/router'
import { Component, createEffect } from 'solid-js'
import { mkController } from './api/mkController'
import { ContextMenu } from './components/ContextMenu/ContextMenu'
import { Footer } from './components/Footer/Footer'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { Main } from './components/Main/Main'
import { RightSidebar } from './components/RightSidebar/RightSidebar'
import { Topbar } from './components/Topbar/Topbar'
import { setStore, store } from './stores/store'
import { Utils } from './util/util'
import '@fontsource/inter'
import { initDB } from './db/db'
import { Modal } from './components/Modals/Modal'

const App: Component = () => {
  const navigate = useNavigate()
  initDB()

  const fetchLibraryAlbums = async () => {
    try {
      const albumsResponse = await mkController.getLibraryAlbums('0')
      const libraryAlbums = albumsResponse.data
      setStore('library', 'albums', libraryAlbums)
      console.log(libraryAlbums)
    } catch (error) {
      console.error('Error fetching albums:', error)
    }
  }

  const fetchPlaylistsAndTracks = async () => {
    try {
      const playlistsResponse = await mkController.getPlaylists()
      const libraryPlaylists = playlistsResponse.data.data

      // Fetch tracks for each playlist
      const trackFetchPromises = libraryPlaylists.map(playlist =>
        mkController.getTracksForPlaylist(playlist.id)
      )
      const trackResponses = await Promise.all(trackFetchPromises)

      // Map tracks to the corresponding playlists
      const updatedLibraryPlaylists = libraryPlaylists.map((playlist, index) => {
        const tracks = trackResponses[index].data.data
        return {
          ...playlist,
          relationships: {
            ...playlist.relationships,
            tracks: {
              data: tracks
            }
          }
        }
      })

      // Update the store
      setStore('library', 'playlists', updatedLibraryPlaylists)
    } catch (error) {
      console.error('Error fetching playlists:', error)
    }
  }

  createEffect(async () => {
    Utils.setDarkMode(localStorage.getItem('darkMode') === 'true')
    Utils.disableContextMenu()

    await mkController.authorize()
    navigate(Utils.parseSelectedDefaultPage(store.app.general.defaultPage))

    // Fetch playlists and their tracks in the background
    fetchPlaylistsAndTracks()
    fetchLibraryAlbums()
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
