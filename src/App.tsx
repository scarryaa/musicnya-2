import { createSignal, type Component } from 'solid-js'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { WindowButtons } from './components/WindowButtons/WindowButtons'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'
import { RightSidebar } from './components/RightSidebar/RightSidebar'

const App: Component = () => {
  const [leftSidebarWidth, setLeftSidebarWidth] = createSignal(100)
  const [rightSidebarExpanded, setRightSidebarExpanded] = createSignal(false)

  return (
    <div class="appContainer" right-drawer={rightSidebarExpanded()}>
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
