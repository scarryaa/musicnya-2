import { createSignal, type Component } from 'solid-js'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { Titlebar } from './components/Titlebar/Titlebar'
import { Footer } from './components/Footer/Footer'

const App: Component = () => {
  const [sidebarWidth, setSidebarWidth] = createSignal(100)

  return (
    <>
      <Titlebar />
      <LeftSidebar onWidthChange={width => setSidebarWidth(width)} showSidebar={true} />
      <Footer />
    </>
  )
}

export default App
