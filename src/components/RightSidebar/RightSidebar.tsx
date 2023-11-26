import { createEffect, createSignal } from 'solid-js'
import styles from './rightSidebar.module.scss'
import { faBars, faClock, faCog, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { WindowButtons } from '../WindowButtons/WindowButtons'
import { RightSidebarButton } from './RightSidebarButton'
import { setStore, store } from '../../stores/store'
import { A } from '@solidjs/router'
import { Overlay } from './RightSidebarOverlay'
import { Queue } from '../Queue/Queue'
import { Lyrics } from '../Lyrics/Lyrics'
import { History } from '../History/History'
import Fa from 'solid-fa'

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

  const handleFooterHistoryClick = () => {
    setStore('app', 'rightSidebar', 'activePanel', 'history')
  }

  const handleFooterQueueClick = () => {
    setStore('app', 'rightSidebar', 'activePanel', 'queue')
  }

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

      if ((expanded && activePanel === 'queue') || activePanel === 'history') {
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
      if (
        store.app.rightSidebar.activePanel === 'queue' ||
        store.app.rightSidebar.activePanel === 'history'
      ) {
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
        class={styles['right-sidebar']}
        style={{ width: `${store.app.rightSidebar.width}px` }}
      >
        <div class={styles['right-sidebar__inner-container']}>
          {store.app.platform === 'win32' && (
            <div class={styles['right-sidebar__window-buttons']}>
              <WindowButtons buttonColor={null} buttonIconColor={'var(--color-black)'} />
            </div>
          )}
          <div class={styles['right-sidebar__buttons']}>
            <button class={styles['right-sidebar__button']} onClick={handleQueueClick}>
              <RightSidebarButton tooltip="Queue" icon={faBars} />
            </button>
            <button class={styles['right-sidebar__button']} onClick={handleLyricsClick}>
              <RightSidebarButton tooltip="Lyrics" icon={faQuoteRight} />
            </button>
          </div>
          <A
            activeClass=""
            href="/settings"
            class={
              styles['right-sidebar__button'] +
              ' ' +
              styles['right-sidebar__button-settings']
            }
          >
            <RightSidebarButton tooltip="Settings" icon={faCog} />
          </A>
          <div class={styles['right-sidebar__panel']}>
            {store.app.rightSidebar.activePanel === 'queue' && <Queue />}
            {store.app.rightSidebar.activePanel === 'history' && <History />}
            {store.app.rightSidebar.activePanel === 'lyrics' && <Lyrics />}

            {(store.app.rightSidebar.activePanel === 'history' ||
              store.app.rightSidebar.activePanel === 'queue') && (
              <div class={styles['right-sidebar__panel__footer']}>
                <div class={styles['right-sidebar__panel__footer__inner-container']}>
                  <div
                    class={
                      styles['right-sidebar__panel__footer__inner-container__background']
                    }
                  ></div>
                  <div
                    class={
                      styles['right-sidebar__panel__footer__inner-container__button']
                    }
                    onClick={handleFooterQueueClick}
                    style={
                      store.app.rightSidebar.activePanel === 'queue'
                        ? 'background-color: var(--active-color)'
                        : ''
                    }
                  >
                    <Fa icon={faBars} size="1x" color="var(--color-white)" />
                  </div>
                  <div
                    class={
                      styles['right-sidebar__panel__footer__inner-container__button']
                    }
                    onClick={handleFooterHistoryClick}
                    style={
                      store.app.rightSidebar.activePanel === 'history'
                        ? 'background-color: var(--active-color)'
                        : ''
                    }
                  >
                    <Fa icon={faClock} size="1x" color="var(--color-white)" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {screenWidth() < 680 && store.app.rightSidebar.width > 40 && <Overlay />}
    </>
  )
}
