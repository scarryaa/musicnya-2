import { type Component, createEffect } from 'solid-js'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'
import { RightSidebar } from './components/RightSidebar/RightSidebar'
import { Topbar } from './components/Topbar/Topbar'
import { setStore, store } from './stores/store'
import { useLocation, useNavigate } from '@solidjs/router'
import { mkController } from './api/mkController'
import { Utils } from './util/util'
import '@fontsource/inter'
import { ContextMenu } from './components/ContextMenu/ContextMenu'

const App: Component = () => {
  const location = useLocation()
  const navigate = useNavigate()

  createEffect(async () => {
    setStore('app', 'navigate', () => navigate)

    Utils.setDarkMode(localStorage.getItem('darkMode') === 'true')
    Utils.disableContextMenu()
    await mkController.authorize().then(() => {
      console.log(Utils.parseSelectedDefaultPage(store.app.general.defaultPage))
      navigate(Utils.parseSelectedDefaultPage(store.app.general.defaultPage))
    })

    const playlists = await mkController.getPlaylists()
    setStore({
      libraryPlaylists: playlists.data.data.filter(
        playlist => playlist.attributes?.canEdit
      ),
      appleMusicPlaylists: playlists.data.data.filter(
        playlist => !playlist.attributes?.canEdit
      )
    })

    console.log(store.libraryPlaylists)
  })

  return (
    <div class="appContainer" right-drawer={store.app.rightSidebar.isExpanded}>
      <Topbar />
      <LeftSidebar />
      <RightSidebar />
      <Main />
      <Footer />
      <ContextMenu />
    </div>
  )
}

export default App
