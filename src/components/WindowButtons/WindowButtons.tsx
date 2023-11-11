import { createSignal } from 'solid-js'
import styles from './WindowButtons.module.scss'
const { appWindow } = await import('@tauri-apps/api/window')

export const WindowButtons = () => {
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
    <div class={styles.windowButtons}>
      <div class={styles.windowButtonsFlexContainer}>
        <div>
          <div class={styles.windowButton} id="titlebar-close" onClick={onClose}>
            <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
          </div>
        </div>
      </div>
    </div>
  )
}
