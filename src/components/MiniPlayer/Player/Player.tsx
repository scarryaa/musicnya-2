import {
  faStepBackward,
  faPause,
  faPlay,
  faStepForward,
  faShuffle,
  faRepeat,
  faVolumeLow,
  faVolumeMute,
  faPlus,
  faMinus,
  faHeart,
  faThumbsDown,
  faBars,
  faQuoteRight
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as faHeartRegular,
  faThumbsDown as faThumbsDownRegular
} from '@fortawesome/free-regular-svg-icons'
import Fa from 'solid-fa'
import { mkController } from '../../../api/mkController'
import { setStore, store } from '../../../stores/store'
import styles from './Player.module.scss'
import { createEffect, createSignal } from 'solid-js'
import { localStorageService } from '../../../services/localStorageService'
import { Utils } from '../../../util/util'
import { tauriService } from '../../../services/tauriService'
import { mkManager } from '../../../api/mkManager'

export const Player = () => {
  const [isMuted, setIsMuted] = createSignal(false)

  createEffect(() => {
    const storedVolume = Number(localStorageService.get('volume'))
    updateVolume(storedVolume ?? 20)
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

  const handlePause = () => {
    mkManager.pause()
  }

  const handlePlay = () => {
    mkManager.play()
  }

  const handleLibraryButton = e => {
    if (store.currentTrack.inLibrary) {
      mkController.removeFromLibrary(store.currentTrack.id, 'songs').then(res => {
        if (res) {
          setStore('currentTrack', {
            ...store.currentTrack,
            inLibrary: false
          })
        }
      })
    } else {
      mkController.addToLibrary(store.currentTrack.id, 'songs').then(res => {
        if (res) {
          setStore('currentTrack', {
            ...store.currentTrack,
            inLibrary: true
          })
        }
      })
    }
  }

  const handleLoveButton = e => {
    if (store.currentTrack.loved) {
      mkController.unlove(store.currentTrack.id, 'songs').then(res => {
        if (res) {
          setStore('currentTrack', {
            ...store.currentTrack,
            loved: false
          })
        }
      })
    } else {
      mkController.love(store.currentTrack.id, 'songs').then(res => {
        if (res) {
          setStore('currentTrack', {
            ...store.currentTrack,
            loved: true
          })
        }
      })
    }
  }

  const handleDislikeButton = e => {
    if (store.currentTrack.disliked) {
      mkController.unlove(store.currentTrack.id, 'songs').then(res => {
        if (res) {
          setStore('currentTrack', {
            ...store.currentTrack,
            disliked: false
          })
        }
      })
    } else {
      mkController.dislike(store.currentTrack.id, 'songs').then(res => {
        if (res) {
          setStore('currentTrack', {
            ...store.currentTrack,
            disliked: true
          })
        }
      })
    }
  }

  const handleQueueButton = async e => {
    if (store.app.miniPlayer.activePanel === 'queue') {
      await tauriService.setWindowSize(325, 325)
      setStore('app', 'miniPlayer', 'activePanel', '')
      setStore('app', 'miniPlayer', 'panelOpen', false)
    } else if (store.app.miniPlayer.activePanel === 'lyrics') {
      await tauriService.setWindowSize(325, 700)
      setStore('app', 'miniPlayer', 'activePanel', 'queue')
      setStore('app', 'miniPlayer', 'panelOpen', true)
    } else {
      await tauriService.setWindowSize(325, 700)
      setStore('app', 'miniPlayer', 'activePanel', 'queue')
      setStore('app', 'miniPlayer', 'panelOpen', true)
    }
  }

  const handleLyricsButton = async e => {
    if (store.app.miniPlayer.activePanel === 'lyrics') {
      await tauriService.setWindowSize(325, 325)
      setStore('app', 'miniPlayer', 'activePanel', '')
      setStore('app', 'miniPlayer', 'panelOpen', false)
    } else if (store.app.miniPlayer.activePanel === 'queue') {
      await tauriService.setWindowSize(325, 700)
      setStore('app', 'miniPlayer', 'activePanel', 'lyrics')
      setStore('app', 'miniPlayer', 'panelOpen', true)
    } else {
      await tauriService.setWindowSize(325, 700)
      setStore('app', 'miniPlayer', 'activePanel', 'lyrics')
      setStore('app', 'miniPlayer', 'panelOpen', true)
    }
  }

  return (
    <>
      <div
        class={styles.player}
        style={{ bottom: store.app.miniPlayer.panelOpen ? '385px' : '10px' }}
      >
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
        <div class={styles.player__progress__time}>
          <span class={styles.player__progress__time__current}>
            {store.isSeeking
              ? Utils.formatTime(store.seekTime)
              : Utils.formatTime(store.currentTime)}
          </span>
          <span class={styles.player__progress__time__total}>
            {Utils.formatTime(store.duration)}
          </span>
        </div>
        <div class={styles.player__controls}>
          <div class={styles.player__controls__top}>
            <button
              class={styles.player__controls__button}
              onClick={() => toggleShuffle()}
            >
              <Fa
                icon={faShuffle}
                size="1x"
                color={
                  store.shuffleMode
                    ? 'var(--color-primary)'
                    : 'var(--color-mini-player-button)'
                }
              />
            </button>
            <button
              class={styles.player__controls__button}
              onClick={mkManager.skipToPreviousItem}
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
              onClick={mkManager.skipToNextItem}
            >
              <Fa icon={faStepForward} size="lg" />
            </button>
            <button
              class={styles.player__controls__button}
              onClick={() => toggleRepeat()}
            >
              <Fa
                icon={faRepeat}
                size="1x"
                color={
                  store.repeatMode
                    ? 'var(--color-primary)'
                    : 'var(--color-mini-player-button)'
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
          <div class={styles.player__controls__bottom__left}>
            <div
              class={styles.player__controls__bottom__left__queue}
              onClick={handleQueueButton}
            >
              <Fa
                icon={faBars}
                size="1x"
                color={
                  store.app.miniPlayer.activePanel === 'queue'
                    ? 'var(--color-primary)'
                    : 'var(--color-white)'
                }
              />
            </div>
            <div
              class={styles.player__controls__bottom__left__lyrics}
              onClick={handleLyricsButton}
            >
              <Fa
                icon={faQuoteRight}
                size="1x"
                color={
                  store.app.miniPlayer.activePanel === 'lyrics'
                    ? 'var(--color-primary)'
                    : 'var(--color-white)'
                }
              />
            </div>
          </div>
          <div class={styles.player__controls__bottom__misc}>
            <div
              class={styles.player__controls__bottom__misc__addToLibrary}
              onClick={handleLibraryButton}
            >
              <Fa
                icon={store.currentTrack.inLibrary ? faMinus : faPlus}
                size="1x"
                color="var(--color-white)"
              />
            </div>
            <div
              class={styles.player__controls__bottom__misc__like}
              onClick={handleLoveButton}
            >
              <Fa
                icon={store.currentTrack.loved ? faHeart : faHeartRegular}
                size="1x"
                color="var(--color-white)"
              />
            </div>
            <div
              class={styles.player__controls__bottom__misc__dislike}
              onClick={handleDislikeButton}
            >
              <Fa
                icon={store.currentTrack.disliked ? faThumbsDown : faThumbsDownRegular}
                size="1x"
                color="var(--color-white)"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
