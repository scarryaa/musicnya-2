import { Accessor, createEffect, createSignal } from 'solid-js'
import styles from './rightSidebar.module.scss'
import { faClock, faFileLines } from '@fortawesome/free-regular-svg-icons'
import {
  faBars,
  faGlobe,
  faHeadphones,
  faHouse,
  faMusic,
  faPodcast,
  faQuoteRight,
  faRecordVinyl,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons'
import { WindowButtons } from '../WindowButtons/WindowButtons'
import { RightSidebarButton } from './RightSidebarButton'

type RightSidebarProps = {
  expanded: Accessor<boolean>
  setExpanded: (expanded: boolean) => void
  onExpandedChange: (expanded: boolean) => void
}

export const RightSidebar = ({
  expanded,
  setExpanded,
  onExpandedChange
}: RightSidebarProps) => {
  const [width, setWidth] = createSignal(250)
  const [activePanel, setActivePanel] = createSignal('')

  createEffect(() => {
    localStorage.getItem('rightSidebarExpanded') &&
      setExpanded(Boolean(localStorage.getItem('rightSidebarExpanded')))
    onExpandedChange(Boolean(localStorage.getItem('rightSidebarExpanded')))
  }, [onExpandedChange])

  return (
    <div
      class={styles.rightSidebar}
      style={{ width: expanded() ? `${width()}px` : '40px' }}
    >
      <div class={styles.rightSidebar__innerContainer}>
        <div class={styles.rightSidebar__windowButtons}>
          <WindowButtons />
        </div>
        <div class={styles.rightSidebar__buttons}>
          <button
            class={styles.rightSidebar__button}
            onClick={() => {
              if (expanded() && activePanel() === 'lyrics') {
                setActivePanel('queue')
              } else if (!expanded()) {
                setExpanded(true)
                setActivePanel('queue')
              } else {
                setExpanded(false)
                setActivePanel('')
              }
            }}
          >
            <RightSidebarButton icon={faBars} />
          </button>
          <button
            class={styles.rightSidebar__button}
            onClick={() => {
              if (expanded() && activePanel() === 'queue') {
                setActivePanel('lyrics')
              } else if (!expanded()) {
                setExpanded(true)
                setActivePanel('lyrics')
              } else {
                setExpanded(false)
                setActivePanel('')
              }
            }}
          >
            <RightSidebarButton icon={faQuoteRight} />
          </button>
        </div>
        <div class={styles.rightSidebar__panel}>
          {activePanel() === 'queue' && (
            <div class={styles.rightSidebar__panel__queue}>
              <h1>Queue</h1>
            </div>
          )}
          {activePanel() === 'lyrics' && (
            <div class={styles.rightSidebar__panel__lyrics}>
              <h1>Lyrics</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
