import Fa from 'solid-fa'
import { setStore, store } from '../../stores/store'
import styles from './MiniPlayer.module.scss'
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Utils } from '../../util/util'
import { WindowButtons, WindowButtonsMac } from '../WindowButtons/WindowButtons'
import { Topbar } from './Topbar/Topbar'
import { createSignal } from 'solid-js'

export const MiniPlayer = () => {
  const [showWindowButtons, setShowWindowButtons] = createSignal(true)
  const handleImageClick = () => {
    setShowWindowButtons(!showWindowButtons())
  }

  return (
    <div class={styles.miniPlayer}>
      <Topbar>
        <div class={styles.miniPlayer__topbar}>
          {showWindowButtons() && store.app.platform !== 'darwin' && (
            <WindowButtons
              buttonColor={'rgba(40, 40, 40, 0.5)'}
              buttonIconColor={'var(--color-white)'}
            />
          )}
          {showWindowButtons() && store.app.platform === 'darwin' && <WindowButtonsMac />}
        </div>
      </Topbar>
      {showWindowButtons() && (
        <button
          class={styles.miniPlayer__exitButton}
          onClick={() => {
            Utils.resizeToSavedSize()
          }}
          style={{
            left: store.app.platform === 'darwin' ? 'calc(100% - 3rem)' : '1rem'
          }}
        >
          <Fa icon={faChevronDown} size="sm" color="var(--color-white)" />
        </button>
      )}
      <div class={styles.miniPlayer__artwork}>
        <img
          src={Utils.formatArtworkUrl(store.currentTrack.artwork, 400)}
          style={{ opacity: store.currentTrack.artwork ? 1 : 0 }}
          onClick={handleImageClick}
        />
      </div>
    </div>
  )
}
