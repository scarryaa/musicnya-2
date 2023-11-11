import { faVolumeLow, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import styles from './MiscControls.module.scss'
import Fa from 'solid-fa'
import { createSignal } from 'solid-js'

export const MiscControls = () => {
  const [volume, setVolume] = createSignal(20)
  const [isMuted, setIsMuted] = createSignal(false)
  const [previousVolume, setPreviousVolume] = createSignal(volume())

  const handleScroll = e => {
    const delta = e.deltaY
    let newVolume = volume()

    if (delta < 0) {
      newVolume = Math.min(newVolume + 5, 100)
    } else if (delta > 0) {
      newVolume = Math.max(newVolume - 5, 0)
    }

    setVolume(newVolume)
  }

  const toggleMute = () => {
    if (isMuted()) {
      setVolume(previousVolume())
      setIsMuted(false)
    } else {
      setPreviousVolume(volume())
      setVolume(0)
      setIsMuted(true)
    }
  }

  return (
    <div class={styles.miscControls}>
      <div class={styles.miscControls__volume}>
        <button class={styles.miscControls__button} onClick={() => toggleMute()}>
          <Fa icon={isMuted() ? faVolumeMute : faVolumeLow} size="1x" />
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={`${volume()}`}
          style={{ '--progress': `${volume()}%` }}
          class={styles.miscControls__volumeSlider}
          onInput={e => {
            setVolume(e.currentTarget.valueAsNumber)
            setIsMuted(e.currentTarget.valueAsNumber === 0)
          }}
          onWheel={handleScroll}
        />
      </div>
    </div>
  )
}
