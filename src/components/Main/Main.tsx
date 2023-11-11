import { Outlet, Route, Routes } from '@solidjs/router'
import { Home } from '../../pages/Home/Home'
import styles from './Main.module.scss'
import { Accessor } from 'solid-js'
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
