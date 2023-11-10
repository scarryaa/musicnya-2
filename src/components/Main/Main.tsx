import { Outlet, Route, Routes } from '@solidjs/router'
import { Home } from '../../pages/Home/Home'
import styles from './Main.module.scss'
import { Accessor } from 'solid-js'

export const Main = ({ sidebarWidth }: { sidebarWidth: Accessor<Number> }) => {
  return (
    <div class={styles.main + ' main'} style={{ 'margin-left': `${sidebarWidth()}px` }}>
      <div class={styles.main__scrollContainer}>
        <Outlet />
      </div>
    </div>
  )
}
