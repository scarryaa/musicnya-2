import {
  faStepBackward,
  faPause,
  faPlay,
  faStepForward,
  faShuffle,
  faRepeat,
  faVolumeLow,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { mkController } from '../../../api/mkController'
import { setStore, store } from '../../../stores/store'
import styles from './Player.module.scss'
import { createEffect, createSignal } from 'solid-js'
import { localStorageService } from '../../../services/localStorageService'

export const Player = () => {
  const [isMuted, setIsMuted] = createSignal(false)

  createEffect(() => {
    const storedVolume = Number(localStorageService.get('volume'))
    updateVolume(storedVolume ?? 20)
  })

  const updateVolume = newVolume => {
    setIsMuted(newVolume === 0)
    localStorage.setItem('volume', newVolume.toString())
    mkController.setVolume(newVolume / 100)
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

  const toggleRepeat = () => {
    setStore('repeatMode', !store.repeatMode)
    localStorage.setItem('repeatMode', store.repeatMode.toString())
    mkController.toggleRepeatMode(store.repeatMode)
  }

  const toggleShuffle = () => {
    setStore('shuffleMode', !store.shuffleMode)
    localStorage.setItem('shuffleMode', store.shuffleMode.toString())
    mkController.toggleShuffleMode(store.shuffleMode)
  }

  const handleInput = e => {
    setStore('isSeeking', true)
    const inputPercentage = e.currentTarget.valueAsNumber
    const seekTime = (inputPercentage / 100) * store.duration
    setStore('seekTime', seekTime)
  }

  const handleChange = e => {
    mkController.seekToTime((e.currentTarget.valueAsNumber / 100) * store.duration)
    setStore('isSeeking', false)
  }

  const handlePause = () => {
    mkController.pause()
  }

  const handlePlay = () => {
    mkController.play()
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
        <div class={styles.player__controls__top}>
          <button class={styles.player__controls__button} onClick={() => toggleShuffle()}>
            <Fa
              icon={faShuffle}
              size="1x"
              color={
                store.shuffleMode
                  ? 'var(--app-primary-color)'
                  : 'var(--color-player-button)'
              }
            />
          </button>
          <button
            class={styles.player__controls__button}
            onClick={mkController.skipToPreviousItem}
          >
            <Fa icon={faStepBackward} size="lg" />
          </button>
          {store.isPlaying ? (
            <button class={styles.player__controls__button} onClick={handlePause}>
              <Fa icon={faPause} size="lg" />
            </button>
          ) : (
            <button class={styles.player__controls__button} onClick={handlePlay}>
              <Fa icon={faPlay} size="lg" />
            </button>
          )}
          <button
            class={styles.player__controls__button}
            onClick={mkController.skipToNextItem}
          >
            <Fa icon={faStepForward} size="lg" />
          </button>
          <button class={styles.player__controls__button} onClick={() => toggleRepeat()}>
            <Fa
              icon={faRepeat}
              size="1x"
              color={
                store.repeatMode
                  ? 'var(--app-primary-color)'
                  : 'var(--color-player-button)'
              }
            />
          </button>
        </div>
        <div class={styles.player__controls__bottom}>
          <span class={styles.player__controls__bottom__title}>
            {store.currentTrack.title}
          </span>
          <span class={styles.player__controls__bottom__artist}>
            {store.currentTrack.artist}
          </span>
          <div class={styles.player__controls__bottom__volume}>
            <button
              class={styles.player__controls__bottom__volume__button}
              onClick={toggleMute}
            >
              <Fa icon={isMuted() ? faVolumeMute : faVolumeLow} size="1x" />
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={store.volume}
              style={{ '--progress': `${store.volume}%` }}
              class={styles.player__controls__bottom__volume__slider}
              onInput={e => updateVolume(e.currentTarget.valueAsNumber)}
              onWheel={handleScroll}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
