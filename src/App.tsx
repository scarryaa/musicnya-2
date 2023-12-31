import { useNavigate } from '@solidjs/router'
import { Component, createEffect } from 'solid-js'
import { ContextMenu as NewContextMenu } from './components/NewContextMenu/ContextMenu'
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
import { mkManager } from './api/MkManager'
import { mkApiManager } from './api/MkApiManager'

const App: Component = () => {
  const navigate = useNavigate()

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
    await initDB()
    await discordService.init()

    Utils.setDarkMode(localStorageService.get('darkMode') === 'true')
    Utils.disableContextMenu()

    const musicKitInst = await mkManager.initializeMusicKit()
    mkManager.initializeApis()
    mkApiManager.initializeApis(musicKitInst)
    const authorized = await mkManager.authorize()
    mkManager.setUpEvents()
    setStore('isAuthorized', !!authorized)

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
        <div class="app-container" right-drawer={store.app.rightSidebar.isExpanded}>
          <Topbar />
          <LeftSidebar />
          <RightSidebar />
          <Main />
          <Footer />
          <NewContextMenu />
          <Modal />
        </div>
      )}
    </>
  )
}

export default App
