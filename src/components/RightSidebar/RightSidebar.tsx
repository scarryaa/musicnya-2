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
      <div class={styles.rightSidebar__windowButtons}>
        <WindowButtons />
      </div>
      <div class={styles.rightSidebar__buttons}>
        <button
          class={styles.rightSidebar__button}
          onClick={() => setExpanded(!expanded())}
        >
          <RightSidebarButton icon={faBars} />
        </button>
      </div>
    </div>
  )
}
