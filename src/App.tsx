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
import { localStorageService } from './services/localStorageService'
import * as config from '../config.json'
import { MiniPlayer } from './components/MiniPlayer/MiniPlayer'
import { discordService } from './services/discordService'
import '@fontsource/inter'
import { mkManager } from './api/mkManager'

const App: Component = () => {
  const navigate = useNavigate()
  initDB()
  discordService.init()

  async function fetchData() {
    const fetchPromises = []
    if (store.library.albums.length === 0) {
      fetchPromises.push(store.library.refreshAlbums())
    }
    if (store.library.playlists.length === 0) {
      fetchPromises.push(store.library.refreshPlaylists())
    }
    if (store.library.artists.length === 0) {
      fetchPromises.push(store.library.refreshArtists())
    }

    if (fetchPromises.length > 0) {
      await Promise.all(fetchPromises)
    }
  }

  createEffect(async () => {
    Utils.setDarkMode(localStorageService.get('darkMode') === 'true')
    Utils.disableContextMenu()

    await mkManager.initializeMusicKit()
    await mkManager.authorize()
    navigate(Utils.parseSelectedDefaultPage(store.app.general.defaultPage))

    await fetchData()
  })

  createEffect(() => {
    if (store.isAuthorized && config.MusicKit.musicUserToken) {
      setStore('app', 'navigate', () => navigate)
    }
  }, [store.isAuthorized])

  return (
    <>
      {store.app.miniPlayer.open && <MiniPlayer />}
      {!store.app.miniPlayer.open && (
        <div class="appContainer" right-drawer={store.app.rightSidebar.isExpanded}>
          <Topbar />
          <LeftSidebar />
          <RightSidebar />
          <Main />
          <Footer />
          <ContextMenu />
          <Modal />
        </div>
      )}
    </>
  )
}

export default App
