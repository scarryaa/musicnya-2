import { createSignal } from 'solid-js'
import styles from './Titlebar.module.scss'
const { appWindow } = await import('@tauri-apps/api/window')

export const Titlebar = () => {
  const [isMaximized, setIsMaximized] = createSignal(false)

  const onMinimize = () => {
    appWindow.minimize()
  }

  const onMaximize = () => {
    if (isMaximized()) {
      appWindow.unmaximize()
      setIsMaximized(false)
    } else {
      appWindow.maximize()
      setIsMaximized(true)
    }
  }

  const onClose = () => {
    appWindow.close()
  }

  return (
    <div data-tauri-drag-region class={styles.titlebar}>
      <div data-tauri-drag-region class={styles.titlebarFlexContainer}>
        <div>
          <div class={styles.windowButton} id="titlebar-minimize" onClick={onMinimize}>
            <img
              src="https://api.iconify.design/mdi:window-minimize.svg"
              alt="minimize"
            />
          </div>
          <div class={styles.windowButton} id="titlebar-maximize" onClick={onMaximize}>
            <img
              src="https://api.iconify.design/mdi:window-maximize.svg"
              alt="maximize"
            />
          </div>
          <div class={styles.windowButton} id="titlebar-close" onClick={onClose}>
            <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
          </div>
        </div>
      </div>
    </div>
  )
}
