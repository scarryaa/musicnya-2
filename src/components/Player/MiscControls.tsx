import { faVolumeLow, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import styles from './MiscControls.module.scss'
import Fa from 'solid-fa'
import { createEffect, createSignal } from 'solid-js'
import { mkController } from '../../api/mkController'
import { setStore, store } from '../../stores/store'
import { Utils } from '../../util/util'
import { localStorageService } from '../../services/localStorageService'
import { mkManager } from '../../api/MkManager'

export const MiscControls = () => {
  const [isMuted, setIsMuted] = createSignal(false)

  createEffect(() => {
    setTimeout(() => {
      const storedVolume = Number(localStorageService.get('volume'))
      updateVolume(storedVolume ?? 20)
    }, 1000) // wait for mkManager to initialize
  })

  const updateVolume = newVolume => {
    setIsMuted(newVolume === 0)
    localStorage.setItem('volume', newVolume.toString())
    mkManager.setVolume(newVolume / 100)
    setStore('volume', newVolume)
  }

  const handleScroll = e => {
    const delta = e.deltaY
    const newVolume = Math.max(0, Math.min(store.volume + (delta < 0 ? 5 : -5), 100))
    updateVolume(newVolume)
  }

  const toggleMute = () => {
    if (isMuted()) {
      updateVolume(
        localStorageService.get('previousVolume')
          ? Number(localStorageService.get('previousVolume'))
          : 20
      )
    } else {
      localStorage.setItem('previousVolume', store.volume.toString())
      updateVolume(0)
    }
  }

  return (
    <div class={styles['misc-controls']}>
      <div class={styles['misc-controls__progress']}>
        <span class={styles['misc-controls__progress__time']}>
          {store.isSeeking
            ? Utils.formatTime(store.seekTime)
            : Utils.formatTime(store.currentTime)}
        </span>
        <span class={styles['misc-controls__progress__divider']}>/</span>
        <span class={styles['misc-controls__progress__time']}>
          {Utils.formatTime(store.duration)}
        </span>
      </div>
      <div class={styles['misc-controls__volume']}>
        <button class={styles['misc-controls__button']} onClick={toggleMute}>
          <Fa icon={isMuted() ? faVolumeMute : faVolumeLow} size="1x" />
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={store.volume}
          style={{ '--progress': `${store.volume}%` }}
          class={styles['misc-controls__volume-slider']}
          onInput={e => updateVolume(e.currentTarget.valueAsNumber)}
          onWheel={handleScroll}
        />
      </div>
    </div>
  )
}
