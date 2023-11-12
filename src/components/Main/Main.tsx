import { Outlet } from '@solidjs/router'
import styles from './Main.module.scss'
import { store } from '../../stores/store'

export const Main = () => {
  return (
    <div
      class={styles.main + ' main'}
      style={{ 'margin-left': `${store.app.leftSidebarWidth}px` }}
    >
      <div class={styles.main__scrollContainer}>
        <Outlet />
      </div>
    </div>
  )
}
