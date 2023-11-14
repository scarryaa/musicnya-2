import { createEffect, createSignal } from 'solid-js'
import styles from './rightSidebar.module.scss'
import { faBars, faCog, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { WindowButtons } from '../WindowButtons/WindowButtons'
import { RightSidebarButton } from './RightSidebarButton'
import { setStore, store } from '../../stores/store'
import { A } from '@solidjs/router'
import { Overlay } from './RightSidebarOverlay'

export const RightSidebar = () => {
  const [screenWidth, setScreenWidth] = createSignal(window.innerWidth)

  createEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      if (screenWidth() < 680) {
        setStore('app', 'rightSidebar', {
          isExpanded: false,
          width: store.app.rightSidebar ? store.app.rightSidebar.width : 40
        })
      } else {
        setStore('app', 'rightSidebar', {
          isExpanded: store.app.rightSidebar.width > 40,
          width: store.app.rightSidebar.width
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  })

  const handleLyricsClick = () => {
    if (screenWidth() >= 680) {
      const expanded = store.app.rightSidebar.isExpanded
      const activePanel = store.app.rightSidebar.activePanel

      if (expanded && activePanel === 'lyrics') {
        setStore('app', 'rightSidebar', {
          isExpanded: false,
          width: 40,
          activePanel: ''
        })
      } else {
        setStore('app', 'rightSidebar', {
          isExpanded: true,
          width: 250,
          activePanel: 'lyrics'
        })
      }
    } else {
      if (store.app.rightSidebar.activePanel === 'lyrics') {
        setStore('app', 'rightSidebar', {
          isExpanded: false,
          width: 40,
          activePanel: ''
        })
      } else {
        setStore('app', 'rightSidebar', {
          isExpanded: false,
          width: 250,
          activePanel: 'lyrics'
        })
      }
    }
  }

  const handleQueueClick = () => {
    if (screenWidth() >= 680) {
      const expanded = store.app.rightSidebar.isExpanded
      const activePanel = store.app.rightSidebar.activePanel

      if (expanded && activePanel === 'queue') {
        setStore('app', 'rightSidebar', {
          isExpanded: false,
          width: 40,
          activePanel: ''
        })
      } else {
        setStore('app', 'rightSidebar', {
          isExpanded: true,
          width: 250,
          activePanel: 'queue'
        })
      }
    } else {
      if (store.app.rightSidebar.activePanel === 'queue') {
        setStore('app', 'rightSidebar', {
          isExpanded: false,
          width: 40,
          activePanel: ''
        })
      } else {
        setStore('app', 'rightSidebar', {
          isExpanded: false,
          width: 250,
          activePanel: 'queue'
        })
      }
    }
  }

  return (
    <>
      <div
        class={styles.rightSidebar}
        style={{ width: `${store.app.rightSidebar.width}px` }}
      >
        <div class={styles.rightSidebar__innerContainer}>
          {store.app.platform === 'win32' && (
            <div class={styles.rightSidebar__windowButtons}>
              <WindowButtons />
            </div>
          )}
          <div class={styles.rightSidebar__buttons}>
            <button class={styles.rightSidebar__button} onClick={handleQueueClick}>
              <RightSidebarButton tooltip="Queue" icon={faBars} />
            </button>
            <button class={styles.rightSidebar__button} onClick={handleLyricsClick}>
              <RightSidebarButton tooltip="Lyrics" icon={faQuoteRight} />
            </button>
          </div>
          <A
            activeClass=""
            href="/settings"
            class={
              styles.rightSidebar__button + ' ' + styles.rightSidebar__buttonSettings
            }
          >
            <RightSidebarButton tooltip="Settings" icon={faCog} />
          </A>
          <div class={styles.rightSidebar__panel}>
            {store.app.rightSidebar.activePanel === 'queue' && (
              <div class={styles.rightSidebar__panel__queue}>
                <h1>Queue</h1>
              </div>
            )}
            {store.app.rightSidebar.activePanel === 'lyrics' && (
              <div class={styles.rightSidebar__panel__lyrics}>
                <h1>Lyrics</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      {screenWidth() < 680 && store.app.rightSidebar.width > 40 && <Overlay />}
    </>
  )
}
