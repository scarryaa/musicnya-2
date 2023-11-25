import Fa from 'solid-fa'
import styles from './Player.module.scss'
import {
  faRepeat,
  faShuffle,
  faStepBackward,
  faStepForward
} from '@fortawesome/free-solid-svg-icons'
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { setStore, store } from '../../stores/store'
import { mkController } from '../../api/mkController'
import { mkManager } from '../../api/MkManager'

export const Player = () => {
  const toggleRepeat = () => {
    // all , one , none
    if (store.repeatMode === 'all') {
      setStore('repeatMode', 'one')
      localStorage.setItem('repeatMode', 'one')
      mkManager.setRepeatMode('one' as MusicKit.PlayerRepeatMode)
    } else if (store.repeatMode === 'one') {
      setStore('repeatMode', 'none')
      localStorage.setItem('repeatMode', 'none')
      mkManager.setRepeatMode('none' as MusicKit.PlayerRepeatMode)
    } else {
      setStore('repeatMode', 'all')
      localStorage.setItem('repeatMode', 'all')
      mkManager.setRepeatMode('all' as MusicKit.PlayerRepeatMode)
    }
  }

  const toggleShuffle = () => {
    setStore('shuffleMode', !store.shuffleMode)
    localStorage.setItem('shuffleMode', store.shuffleMode.toString())
    mkManager.setShuffle(store.shuffleMode)
  }

  const handleInput = e => {
    setStore('isSeeking', true)
    const inputPercentage = e.currentTarget.valueAsNumber
    const seekTime = (inputPercentage / 100) * store.duration
    setStore('seekTime', seekTime)
  }

  const handleChange = e => {
    mkManager.seekToTime((e.currentTarget.valueAsNumber / 100) * store.duration)
    setStore('isSeeking', false)
  }

  const handleSkipPrevious = () => {
    if (store.currentTime > 5) {
      mkManager.seekToTime(0)
    } else {
      mkManager.skipToPreviousItem()
    }
  }

  const handleSkipNext = () => {
    mkManager.skipToNextItem()
  }

  const handlePause = () => {
    mkManager.pause()
  }

  const handlePlay = () => {
    mkManager.play()
  }

  return (
    <div class={styles.player}>
      <div class={styles.player__progress}>
        <input
          type="range"
          min="0"
          max="100"
          value={`${store.progress}`}
          style={{
            '--progress': `${
              store.isSeeking ? (store.seekTime / store.duration) * 100 : store.progress
            }%`
          }}
          class={styles.player__progress__slider}
          onInput={handleInput}
          onChange={handleChange}
        />
      </div>
      <div class={styles.player__controls}>
        <button class={styles.player__controls__button} onClick={() => toggleShuffle()}>
          <Fa
            icon={faShuffle}
            size="1x"
            color={
              store.shuffleMode ? 'var(--color-primary)' : 'var(--color-player-button)'
            }
          />
        </button>
        <button
          class={styles.player__controls__button}
          onClick={() => handleSkipPrevious()}
        >
          <Fa icon={faStepBackward} size="lg" />
        </button>
        <button
          class={styles.player__controls__button}
          onClick={() => (store.isPlaying ? handlePause() : handlePlay())}
        >
          <Fa
            icon={store.isPlaying ? faPauseCircle : faPlayCircle}
            size="2x"
            color="var(--color-player-button)"
          />
        </button>
        <button class={styles.player__controls__button} onClick={() => handleSkipNext()}>
          <Fa icon={faStepForward} size="lg" />
        </button>
        <button class={styles.player__controls__button} onClick={() => toggleRepeat()}>
          <Fa
            icon={faRepeat}
            size="1x"
            color={
              // TODO implement repeat one
              store.repeatMode === 'all'
                ? 'var(--color-primary)'
                : 'var(--color-player-button)'
            }
          />
        </button>
      </div>
    </div>
  )
}
