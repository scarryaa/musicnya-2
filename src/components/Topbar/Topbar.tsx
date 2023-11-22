import styles from './Topbar.module.scss'
import { Searchbar } from '../Searchbar/Searchbar'
import { store } from '../../stores/store'
import { LeftSidebarButton } from '../LeftSidebar/LeftSidebarButton'
import {
  faChevronLeft,
  faChevronRight,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import { TopbarButton } from './TopbarButton'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'

export const Topbar = () => {
  const { openContextMenu } = useContextMenu()
  const handleBackClick = e => {
    window.history.back()
  }

  const handleForwardClick = e => {
    window.history.forward()
  }

  const handleMenuClick = e => {
    openContextMenu(e, null, ContextMenuType.App, null)
  }

  return (
    <div
      data-tauri-drag-region
      class={styles.topbar}
      style={{
        left: `${store.app.leftSidebarWidth}px`,
        right: `${store.app.rightSidebar.isExpanded ? 250 : 40}px`
      }}
    >
      <div class={styles.topbar__buttons}>
        <TopbarButton
          icon={faEllipsisH}
          tooltip="Menu"
          onClick={e => handleMenuClick(e)}
        />
        <TopbarButton
          icon={faChevronLeft}
          tooltip="Back"
          onClick={e => handleBackClick(e)}
        />
        <TopbarButton
          icon={faChevronRight}
          tooltip="Forward"
          onClick={e => handleForwardClick(e)}
        />
      </div>
      <Searchbar />
    </div>
  )
}
