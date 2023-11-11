import * as config from '../../config.json'
import { setStore } from '../stores/store'

export class mkController {
  static isInitialized: boolean
  static isErrored: boolean

  static getInstance = async () => {
    if (!mkController.isInitialized) {
      console.log('Initializing MusicKit...')
      await MusicKit.configure({
        developerToken: config.MusicKit.token,
        app: {
          name: 'Music',
          build: '1.0.0'
        },
        sourceType: 24
      })
        .then(music => {
          music.authorize().then(() => {
            console.log('Authorized')
            mkController.setUpEvents()
          })

          config.MusicKit.musicUserToken = music.musicUserToken
        })
        .catch(e => {
          mkController.isInitialized = false
          mkController.isErrored = true
          console.error('Failed to initialize MusicKit: ', e)
        })
      mkController.isInitialized = true
    }
    return MusicKit.getInstance()
  }

  static setVolume = async (volume: number) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.volume = volume
    } else {
      console.error('Failed to set volume: MusicKit instance not available')
    }
  }

  static play = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.play()
    } else {
      console.error('Failed to play: MusicKit instance not available')
    }
  }

  static pause = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.pause()
    } else {
      console.error('Failed to pause: MusicKit instance not available')
    }
  }

  static stop = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.stop()
    } else {
      console.error('Failed to stop: MusicKit instance not available')
    }
  }

  static seekToTime = async (time: number) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.seekToTime(time)
    } else {
      console.error('Failed to seek: MusicKit instance not available')
    }
  }

  static skipToNextItem = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.skipToNextItem()
    } else {
      console.error('Failed to skip to next item: MusicKit instance not available')
    }
  }

  static skipToPreviousItem = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.skipToPreviousItem()
    } else {
      console.error('Failed to skip to previous item: MusicKit instance not available')
    }
  }

  static changeToMediaAtIndex = async (index: number) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.changeToMediaAtIndex(index)
    } else {
      console.error('Failed to change to media at index: MusicKit instance not available')
    }
  }

  static changeToMediaItem = async (item: any) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.changeToMediaItem(item)
    } else {
      console.error('Failed to change to media item: MusicKit instance not available')
    }
  }

  static getPlaybackDuration = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      if (instance.nowPlayingItem) {
        return instance.nowPlayingItem.attributes.durationInMillis
      } else {
        console.error('Failed to get playback duration: No now playing item')
      }
    } else {
      console.error('Failed to get playback duration: MusicKit instance not available')
    }
  }

  static getPlaybackProgress = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      return instance.currentPlaybackProgress
    } else {
      console.error('Failed to get playback progress: MusicKit instance not available')
    }
  }

  static toggleShuffleMode = async (shuffleMode: boolean) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.shuffleMode = shuffleMode ? 1 : 0
    } else {
      console.error('Failed to toggle shuffle mode: MusicKit instance not available')
    }
  }

  static toggleRepeatMode = async (repeatMode: boolean) => {
    const instance = await mkController.getInstance()
    if (instance) {
      // @ts-ignore
      instance.repeatMode = repeatMode ? 1 : 0
    } else {
      console.error('Failed to toggle repeat mode: MusicKit instance not available')
    }
  }

  static setUpEvents = () => {
    MusicKit.getInstance().addEventListener('mediaItemStateDidChange', e => {
      setStore('currentTrack', {
        id: e.id,
        title: e.attributes.name,
        artist: e.attributes.artistName,
        album: e.attributes.albumName,
        artwork: e.attributes.artwork.url
      })
    })

    MusicKit.getInstance().addEventListener('playbackStateDidChange', e => {
      setStore('isPlaying', e.state === 2)
      setStore('isPaused', e.state === 1)
      setStore('isStopped', e.state === 0)
    })

    MusicKit.getInstance().addEventListener('playbackDurationDidChange', e => {
      setStore('duration', e.duration)
    })

    MusicKit.getInstance().addEventListener('playbackProgressDidChange', e => {
      setStore('progress', e.progress * 100)
    })

    MusicKit.getInstance().addEventListener('playbackTimeDidChange', e => {
      setStore('currentTime', e.currentPlaybackTime)
    })
  }
}
