import { createSignal, type Component, createEffect } from 'solid-js'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'
import { RightSidebar } from './components/RightSidebar/RightSidebar'
import { Topbar } from './components/Topbar/Topbar'
import { store } from './stores/store'
import { useLocation, useNavigate } from '@solidjs/router'
import { mkController } from './api/mkController'

const App: Component = () => {
  const location = useLocation()
  const navigate = useNavigate()

  createEffect(async () => {
    if (location.pathname === '/') {
      await mkController.authorize().then(() => {
        navigate('/home')
      })
    }
  })

  return (
    <div class="appContainer" right-drawer={store.app.rightSidebar.isExpanded}>
      <Topbar />
      <LeftSidebar />
      <RightSidebar />
      <Main />
      <Footer />
    </div>
  )
}

export default App
