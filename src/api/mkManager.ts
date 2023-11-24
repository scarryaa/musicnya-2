import * as config from '../../config.json'
import { discordService } from '../services/discordService'
import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { setStore, store } from '../stores/store'
import { Reaction } from '../types/types'
import { Utils } from '../util/util'

class MusicKitManager {
  _musicKitInstance: MusicKit.MusicKitInstance | null = null
  private _shouldBeArray = (type: string) => {
    if (type === 'musicVideos') return false
    else return true
  }

  get musicKitInstance() {
    if (!this._musicKitInstance) throw new Error('MusicKit instance not initialized')
    return this._musicKitInstance
  }

  set musicKitInstance(value) {
    this._musicKitInstance = value
  }

  async initializeMusicKit() {
    if (this._musicKitInstance) return this._musicKitInstance

    try {
      this._musicKitInstance = await this.attemptToInitialize()
      config.MusicKit.musicUserToken = this._musicKitInstance.musicUserToken
      this.musicKitInstance.autoplayEnabled = store.app.queue.autoplay
      this.musicKitInstance._autoplayEnabled = store.app.queue.autoplay
    } catch (e) {
      console.error('Failed to initialize MusicKit: ', e)
      throw e
    }
  }

  async attemptToInitialize(attempts = 3) {
    while (attempts > 0) {
      try {
        return await MusicKit.configure({
          developerToken: config.MusicKit.token,
          app: {
            name: 'Music',
            build: '1.0.0'
          },
          sourceType: 24,
          suppressErrorDialog: true
        })
      } catch (e) {
        console.log(e)
        attempts--
        if (attempts === 0) throw e
      }
    }
  }

  async authorize(): Promise<string | void> {
    try {
      return await this.musicKitInstance.authorize()
    } catch (e) {
      console.error('Failed to authorize: ', e)
      throw e
    }
  }

  setVolume = (volume: number) => {
    if (volume < 0 || volume > 1) throw new Error('Volume must be between 0 and 1')
    if (!this.musicKitInstance) throw new Error('MusicKit instance not initialized')

    this.musicKitInstance.volume = volume
  }

  setShuffle = (shuffle: MusicKit.PlayerShuffleMode) => {
    if (!this.musicKitInstance) throw new Error('MusicKit instance not initialized')

    this.musicKitInstance.shuffleMode = shuffle ? 1 : 0
  }

  setRepeatMode = (repeatMode: MusicKit.PlayerRepeatMode) => {
    if (!this.musicKitInstance) throw new Error('MusicKit instance not initialized')

    this.musicKitInstance.repeatMode = repeatMode
  }

  play = async () => {
    await this.musicKitInstance.play()
  }

  pause = async () => {
    await this.musicKitInstance.pause()
  }

  stop = async () => {
    await this.musicKitInstance.stop()
  }

  setQueue = async (
    id: string,
    type: MusicKit.MediaItemType,
    shuffle: boolean = false,
    startWith: number = 0
  ) => {
    await this.musicKitInstance.setQueue({
      [type]: this._shouldBeArray(type) ? [id] : id,
      startWith: shuffle ? Math.floor(Math.random() * 100) : startWith
    })
  }

  moveQueueItem = async (from: number, to: number): Promise<any> => {
    this.musicKitInstance.queue._queueItems.splice(
      to,
      0,
      this.musicKitInstance.queue._queueItems.splice(from, 1)[0]
    )
    this.musicKitInstance.queue._reindex()

    return this.musicKitInstance.queue._queueItems
  }

  clearQueue = async () => {
    await this.musicKitInstance.clearQueue()
  }

  setStationQueue = async (id: string, type: MusicKit.MediaItemType) => {
    const strippedType = MediaItemTypeService.stripType(type)
    await this.musicKitInstance.setStationQueue({ [strippedType]: [id] })
    await this.play()
  }

  removeFromQueue = async (id: string): Promise<string> => {
    this.musicKitInstance.queue._queueItems =
      this.musicKitInstance.queue._queueItems.filter((item: any) => item.item.id !== id)

    this.musicKitInstance.queue._reindex()
    return id
  }

  processItemAndPlay = async (
    id: string,
    type: MusicKit.MediaItemType,
    shuffle: boolean = false,
    startWith: number = 0
  ) => {
    const strippedType = MediaItemTypeService.stripType(type)

    await this.setQueue(id, strippedType, shuffle, startWith)
    await this.play()
  }

  playNext = async (id: string, type: MusicKit.MediaItemType) => {
    const strippedType = MediaItemTypeService.stripType(type)
    console.log(id, strippedType)

    await this.musicKitInstance.playNext({
      [strippedType]: this._shouldBeArray(strippedType) ? [id] : id
    })
    this.setShuffle('off' as unknown as MusicKit.PlayerShuffleMode)
  }

  playLater = async (id: string, type: string) => {
    const strippedType = MediaItemTypeService.stripType(type)

    await this.musicKitInstance.playLater({
      [strippedType]: this._shouldBeArray(strippedType) ? [id] : id
    })
    this.setShuffle('off' as unknown as MusicKit.PlayerShuffleMode)
  }

  seekToTime = async (time: number) => {
    if (time < 0) throw new Error('Time must be greater than 0')

    await this.musicKitInstance.seekToTime(time)
  }

  skipToPreviousItem = async () => {
    await this.musicKitInstance.skipToPreviousItem()
  }

  skipToNextItem = async () => {
    await this.musicKitInstance.skipToNextItem()
  }

  toggleAutoplay = async (autoplay: boolean) => {
    this.musicKitInstance.autoplayEnabled = autoplay
    this.musicKitInstance._autoplayEnabled = autoplay
    return this.musicKitInstance.autoplayEnabled
  }

  // Events

  setUpEvents = () => {
    const eventHandlers = {
      mediaItemStateDidChange: this.mediaItemStateDidChange,
      nowPlayingItemDidChange: this.nowPlayingItemDidChange,
      queueItemsDidChange: this.queueItemsDidChange,
      playbackStateDidChange: this.playbackStateDidChange,
      playbackDurationDidChange: this.playbackDurationDidChange,
      playbackProgressDidChange: this.playbackProgressDidChange,
      playbackTimeDidChange: this.playbackTimeDidChange,
      shuffleModeDidChange: this.shuffleModeDidChange
    }

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      MusicKit.getInstance().addEventListener(event, handler)
    })
  }

  mediaItemStateDidChange = (event: any) => {
    setStore('currentTrack', {
      id: event.id,
      title: event.attributes.name,
      artist: event.attributes.artistName,
      album: event.attributes.albumName,
      artwork: event.attributes.artwork.url,
      type: event.type,
      parentType: event.container.type,
      parentID: event.container.id
    })

    console.log(event)
  }

  nowPlayingItemDidChange = async (event: any) => {
    setStore('app', 'queue', {
      index: MusicKit.getInstance().queue.position,
      nextUpIndex: MusicKit.getInstance().queue.position + 1,
      remainingStartIndex: MusicKit.getInstance().queue.position + 1
    })

    setStore('app', 'wroteToDb', false)

    // Discord RPC
    if (
      MusicKit.getInstance().nowPlayingItem !== undefined &&
      store.app.connectivity.discord.enabled
    ) {
      discordService.setActivity({
        details:
          MusicKit.getInstance().nowPlayingItem?.title +
          ' - ' +
          MusicKit.getInstance().nowPlayingItem?.albumName,
        state: MusicKit.getInstance().nowPlayingItem?.artistName,
        largeImageKey: MusicKit.getInstance().nowPlayingItem?.artwork?.url.replace(
          '{w}x{h}',
          '512x512'
        ),
        largeImageText:
          MusicKit.getInstance().nowPlayingItem?.albumName +
          (MusicKit.getInstance().nowPlayingItem?.albumName.length < 2 ? '     ' : ''),
        instance: false,
        startTimestamp: Date.now(),
        endTimestamp:
          Date.now() +
          MusicKit.getInstance().currentPlaybackDuration * 1000 -
          MusicKit.getInstance().currentPlaybackTime * 1000
      })
    }

    //   Utils.debounce(async () => {
    //     // TODO implement
    //     const isLoved = await mkManager.checkIfLoved(e.id, 'songs')
    //     setStore(
    //       'currentTrack',
    //       'loved',
    //       isLoved.data?.[0]?.attributes?.value === Reaction.Loved
    //     )
    //     setStore(
    //       'currentTrack',
    //       'disliked',
    //       isLoved.data?.[0]?.attributes?.value === Reaction.Disliked
    //     )

    //     const inLibrary = await mkManager.checkIfInLibrary(e.id, 'songs')
    //     setStore('currentTrack', 'inLibrary', inLibrary.data?.[0]?.attributes?.inLibrary)
    //   }, 1000)()

    //   const rawLyricsData = await this.getLyrics(
    //     e.item.playParams.catalogId ?? e.item.playParams.id
    //   ).then((response: any) => {
    //     return response.data[0].attributes.ttml
    //   })

    //   setStore('currentTrack', {
    //     lyrics: {
    //       lyricsArray: Utils.parseTTMLtoJS(rawLyricsData),
    //       writtenByArray: Utils.stripWrittenBy(rawLyricsData),
    //       begin: Utils.getLyricsBeginning(rawLyricsData)
    //     }
    //   })
  }

  queueItemsDidChange = (event: any) => {
    setStore('app', 'queue', {
      items: event,
      index: store.app.queue.index,
      nextUpIndex: MusicKit.getInstance().queue.position + 1,
      remainingStartIndex: store.app.queue.remainingStartIndex
    })
  }

  playbackStateDidChange = (event: any) => {
    setStore('isPlaying', event.state === 2)
    setStore('isPaused', event.state === 3)
    setStore('isStopped', event.state === 0)

    // Discord RPC
    if (event.state === 2) {
      setStore('app', 'connectivity', 'discord', 'activity', {
        details:
          MusicKit.getInstance().nowPlayingItem?.title +
          ' - ' +
          MusicKit.getInstance().nowPlayingItem?.albumName,
        state: MusicKit.getInstance().nowPlayingItem?.artistName,
        largeImageKey: MusicKit.getInstance().nowPlayingItem?.artwork?.url.replace(
          '{w}x{h}',
          '512x512'
        ),
        largeImageText:
          MusicKit.getInstance().nowPlayingItem?.albumName +
          (MusicKit.getInstance().nowPlayingItem?.albumName.length < 2 ? '     ' : ''),
        instance: false,
        startTimestamp: Date.now(),
        endTimestamp:
          Date.now() +
          MusicKit.getInstance().currentPlaybackDuration * 1000 -
          MusicKit.getInstance().currentPlaybackTime * 1000
      })

      if (store.app.connectivity.discord.enabled) {
        discordService.setActivity(store.app.connectivity.discord.activity)
      }
    } else {
      setStore('app', 'connectivity', 'discord', 'activity', null)
      if (store.app.connectivity.discord.enabled) {
        discordService.setActivity(store.app.connectivity.discord.activity)
      }
    }
  }

  playbackDurationDidChange = (event: any) => {
    setStore('duration', event.duration)
  }

  playbackProgressDidChange = (event: any) => {
    setStore('progress', event.progress * 100)
  }

  playbackTimeDidChange = (event: any) => {
    setStore('currentTime', event.currentPlaybackTime)

    if (store.currentTime > 5 && !store.app.wroteToDb) {
      increasePlayCount({
        id: store.currentTrack.id,
        artist: store.currentTrack.artist,
        playCount: 1,
        title: store.currentTrack.title
      })
      setStore('app', 'wroteToDb', true)
    }
  }

  shuffleModeDidChange = (event: any) => {
    console.log('shuffleModeDidChange', event)

    // off, songs
    if (event.shuffleMode === 0) {
      this.setShuffle('off' as unknown as MusicKit.PlayerShuffleMode)
    } else if (event.shuffleMode === 1) {
      this.setShuffle('songs' as unknown as MusicKit.PlayerShuffleMode)
    } else {
      throw new Error('Unknown shuffle mode')
    }
  }
}

export const mkManager = new MusicKitManager()
