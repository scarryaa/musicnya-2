import Fa from 'solid-fa'
import { setStore, store } from '../../stores/store'
import styles from './MiniPlayer.module.scss'
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Utils } from '../../util/util'
import { WindowButtons, WindowButtonsMac } from '../WindowButtons/WindowButtons'
import { Topbar } from './Topbar/Topbar'
import { createEffect, createSignal } from 'solid-js'
import { Player } from './Player/Player'
import { Queue } from '../Queue/Queue'
import { Lyrics } from '../Lyrics/Lyrics'

export const MiniPlayer = () => {
  const [showWindowButtons, setShowWindowButtons] = createSignal(true)
  const handleImageClick = () => {
    setShowWindowButtons(!showWindowButtons())
  }

  const handleExitClick = () => {
    Utils.resizeToSavedSize()
    setStore('app', 'miniPlayer', {
      panelOpen: false,
      activePanel: ''
    })
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
          onClick={handleExitClick}
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
      {showWindowButtons() && <Player />}
      {store.app.miniPlayer.panelOpen && (
        <div class={styles.miniPlayer__bottomPane}>
          {store.app.miniPlayer.activePanel === 'queue' && <Queue />}
          {store.app.miniPlayer.activePanel === 'lyrics' && <Lyrics />}
        </div>
      )}
    </div>
  )
}
