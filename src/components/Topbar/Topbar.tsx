import styles from './Topbar.module.scss'
import { Searchbar } from '../Searchbar/Searchbar'
import { store } from '../../stores/store'

export const Topbar = () => {
  return (
    <div
      data-tauri-drag-region
      class={styles.topbar}
      style={{
        left: `${store.app.leftSidebarWidth}px`,
        right: `${store.app.rightSidebar.isExpanded ? 250 : 40}px`
      }}
    >
      <Searchbar />
    </div>
  )
}
