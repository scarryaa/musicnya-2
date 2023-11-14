import { setStore } from '../../stores/store'
import styles from './RightSidebarOverlay.module.scss'

export const Overlay = () => (
  <div
    class={styles.overlay}
    onClick={() =>
      setStore('app', 'rightSidebar', { isExpanded: false, width: 40, activePanel: '' })
    }
  />
)
