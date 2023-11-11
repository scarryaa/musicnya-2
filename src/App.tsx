import { createSignal, type Component } from 'solid-js'
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar'
import { WindowButtons } from './components/WindowButtons/WindowButtons'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'
import { RightSidebar } from './components/RightSidebar/RightSidebar'
import { Topbar } from './components/Topbar/Topbar'
import * as config from '../config.json'

const App: Component = () => {
  const [leftSidebarWidth, setLeftSidebarWidth] = createSignal(100)
  const [rightSidebarExpanded, setRightSidebarExpanded] = createSignal(false)

  MusicKit.configure({
    developerToken: config.MusicKit.token,
    app: {
      name: 'Music',
      build: '1.0.0'
    },
    sourceType: 24
  }).then(music => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    music.authorize().then(() => {
      console.log('Authorized')
    })

    config.MusicKit.musicUserToken = music.musicUserToken
  })

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
