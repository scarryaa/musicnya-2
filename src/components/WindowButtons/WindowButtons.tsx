import { JSX } from 'solid-js'
import styles from './WindowButtons.module.scss'
import { setStore, store } from '../../stores/store'
import Fa from 'solid-fa'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
const { appWindow } = await import('@tauri-apps/api/window')

type WindowButtonsProps = {
  buttonColor?: string
  buttonIconColor?: string
}

export const WindowButtons = ({ buttonColor, buttonIconColor }) => {
  const onClose = () => {
    appWindow.close()
  }

  return (
    <div class={styles.windowButtons}>
      <div class={styles.windowButtonsFlexContainer}>
        <div>
          <div
            class={styles.windowButton}
            id="titlebar-close"
            onClick={onClose}
            style={{
              'background-color': buttonColor
            }}
          >
            <Fa icon={faTimes} size="1x" color={buttonIconColor} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function WindowButtonsMac(): JSX.Element {
  const onClose = () => {
    appWindow.close()
  }

  const onMinimize = () => {
    appWindow.minimize()
  }

  const onMaximize = () => {
    setStore('app', 'isMaximized', !store.app.isMaximized)

    if (store.app.isMaximized) {
      appWindow.maximize()
    } else {
      appWindow.unmaximize()
    }
  }

  return (
    <div class={styles.titlebar} style={{ 'justify-content': 'flex-start' }}>
      <button
        onClick={onClose}
        class={styles['titlebar--button']}
        style={{
          'background-color': '#ff5f56',
          'border-radius': '50%',
          width: '12px',
          height: '12px',
          'margin-left': '8px',
          'margin-right': '8px',
          'line-height': '20px',
          position: 'absolute',
          top: '6px',
          left: '0'
        }}
      ></button>
      <button
        onClick={onMinimize}
        class={styles['titlebar--button']}
        style={{
          'background-color': '#ffbd2e',
          'border-radius': '50%',
          width: '12px',
          height: '12px',
          'margin-right': '8px',
          'line-height': '20px',
          position: 'absolute',
          top: '6px',
          left: '26px'
        }}
      ></button>
      <button
        onClick={onMaximize}
        class={styles['titlebar--button']}
        style={{
          'background-color': '#28c940',
          'border-radius': '50%',
          width: '12px',
          height: '12px',
          'margin-right': '8px',
          'line-height': '20px',
          position: 'absolute',
          top: '6px',
          left: '44px'
        }}
      ></button>
    </div>
  )
}
