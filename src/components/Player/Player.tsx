import Fa from 'solid-fa'
import styles from './Player.module.scss'
import {
  faRepeat,
  faShuffle,
  faStepBackward,
  faStepForward
} from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { createSignal } from 'solid-js'

export const Player = () => {
  const [progress, setProgress] = createSignal(0)

  return (
    <div class={styles.player}>
      <div class={styles.player__progress}>
        <input
          type="range"
          min="0"
          max="100"
          value={`${progress()}`}
          style={{ '--progress': `${progress()}%` }}
          class={styles.player__progress__slider}
          onInput={e => setProgress(e.currentTarget.valueAsNumber)}
        />
      </div>
      <div class={styles.player__controls}>
        <button class={styles.player__controls__button}>
          <Fa icon={faShuffle} size="1x" />
        </button>
        <button class={styles.player__controls__button}>
          <Fa icon={faStepBackward} size="lg" />
        </button>
        <button class={styles.player__controls__button}>
          <Fa icon={faPlayCircle} size="2x" />
        </button>
        <button class={styles.player__controls__button}>
          <Fa icon={faStepForward} size="lg" />
        </button>
        <button class={styles.player__controls__button}>
          <Fa icon={faRepeat} size="1x" />
        </button>
      </div>
    </div>
  )
}
