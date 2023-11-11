import { createSignal, type Component } from 'solid-js'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'
import { RightSidebar } from './components/RightSidebar/RightSidebar'
import { Topbar } from './components/Topbar/Topbar'
import * as config from '../config.json'
import { setUpEvents } from './util/mkEvents'

const App: Component = () => {
  const [leftSidebarWidth, setLeftSidebarWidth] = createSignal(100)
  const [rightSidebarExpanded, setRightSidebarExpanded] = createSignal(false)

  return (
    <div class="appContainer" right-drawer={rightSidebarExpanded()}>
      <Topbar left={leftSidebarWidth} right={rightSidebarExpanded} />
      <LeftSidebar
        onWidthChange={width => setLeftSidebarWidth(width)}
        showSidebar={true}
      />
      <RightSidebar
        setExpanded={setRightSidebarExpanded}
        expanded={rightSidebarExpanded}
        onExpandedChange={expanded => setRightSidebarExpanded(expanded)}
      />
      <Main sidebarWidth={leftSidebarWidth} />
      <Footer />
    </div>
  )
}

export default App
