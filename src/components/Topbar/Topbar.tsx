import { Accessor } from 'solid-js'
import styles from './Topbar.module.scss'
import { Searchbar } from '../Searchbar/Searchbar'

type TopbarProps = {
  left: Accessor<Number>
  right: Accessor<Boolean>
}

export const Topbar = ({ left, right }) => {
  return (
    <div
      data-tauri-drag-region
      class={styles.topbar}
      style={{ left: `${left()}px`, right: `${right() ? 250 : 40}px` }}
    >
      <Searchbar />
    </div>
  )
}
