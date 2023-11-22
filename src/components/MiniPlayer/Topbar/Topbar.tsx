import styles from './Topbar.module.scss'

export const Topbar = ({ children }) => {
  return (
    <div data-tauri-drag-region class={styles.topbar}>
      <div class={styles.topbar__buttons}>{children}</div>
    </div>
  )
}
