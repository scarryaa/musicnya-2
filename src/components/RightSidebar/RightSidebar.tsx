import { createEffect, createSignal } from 'solid-js'
import styles from './rightSidebar.module.scss'
import { faBars, faCog, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { WindowButtons } from '../WindowButtons/WindowButtons'
import { RightSidebarButton } from './RightSidebarButton'
import { setStore, store } from '../../stores/store'
import { A } from '@solidjs/router'

export const RightSidebar = () => {
  const handleLyricsClick = () => {
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
  }

  const handleQueueClick = () => {
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
  }

  return (
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
            <RightSidebarButton icon={faBars} />
          </button>
          <button class={styles.rightSidebar__button} onClick={handleLyricsClick}>
            <RightSidebarButton icon={faQuoteRight} />
          </button>
        </div>
        <A
          href="/settings"
          class={styles.rightSidebar__button + ' ' + styles.rightSidebar__buttonSettings}
        >
          <RightSidebarButton icon={faCog} />
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
  )
}
