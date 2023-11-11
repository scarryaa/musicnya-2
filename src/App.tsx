import { createSignal, type Component } from 'solid-js'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'
import { RightSidebar } from './components/RightSidebar/RightSidebar'
import { Topbar } from './components/Topbar/Topbar'
import { store } from './stores/store'

const App: Component = () => {
  const [rightSidebarExpanded, setRightSidebarExpanded] = createSignal(false)

  return (
    <div class="appContainer" right-drawer={rightSidebarExpanded()}>
      <Topbar />
      <LeftSidebar />
      <RightSidebar />
      <Main />
      <Footer />
    </div>
  )
}

export default App
