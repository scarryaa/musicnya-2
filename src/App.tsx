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

  async function fetchData() {
    const fetchPromises = []
    setStore('library', 'loading', true)

    if (store.library.albums.length === 0) {
      fetchPromises.push(store.library.fetchLibraryAlbums(0))
    }
    if (store.library.playlists.length === 0) {
      fetchPromises.push(store.library.fetchLibraryPlaylists(0))
    }
    if (store.library.artists.length === 0) {
      fetchPromises.push(store.library.fetchLibraryArtists(0))
    }

    if (fetchPromises.length > 0) {
      await Promise.all(fetchPromises)
    }

    setStore('library', 'loading', false)
  }

  createEffect(async () => {
    Utils.setDarkMode(localStorage.getItem('darkMode') === 'true')
    Utils.disableContextMenu()

    await mkController.authorize()
    navigate(Utils.parseSelectedDefaultPage(store.app.general.defaultPage))

    setStore('library', 'loading', true)
    await fetchData()
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
