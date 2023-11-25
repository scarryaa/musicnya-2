import * as config from '../../config.json'
import { discordService } from '../services/discordService'
import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { setStore, store } from '../stores/store'
import { ApiClient } from './MkApiClient'
import { increasePlayCount } from '../db/db'
import { Utils } from '../util/util'
import { MetadataApi } from './MetadataApi'
import { MediaItemType, Reaction } from '../types/types'
import { mkApiManager } from './MkApiManager'

/**
 * Class representing a MusicKitManager.
 * This class provides methods for managing the MusicKit instance and controlling playback.
 */
class MusicKitManager {
  _musicKitInstance: MusicKit.MusicKitInstance | null = null
  _metadataApi: MetadataApi | null = null

  private shouldItemBeArray = (type: string) => {
    return type !== 'musicVideos'
  }

  get musicKitInstance(): MusicKit.MusicKitInstance {
    if (!this._musicKitInstance) throw new Error('MusicKit instance not initialized')
    return this._musicKitInstance
  }

  set musicKitInstance(value) {
    this._musicKitInstance = value
  }

  /**
   * Initializes the MusicKit instance.
   *
   * @returns {Promise<MusicKitInstance>} A promise that resolves to the initialized MusicKit instance.
   * @throws {Error} If there is an error initializing MusicKit.
   */
  async initializeMusicKit() {
    if (this._musicKitInstance) return this._musicKitInstance

    try {
      this._musicKitInstance = await this.attemptToInitialize()
      config.MusicKit.musicUserToken = this._musicKitInstance.musicUserToken
      this.musicKitInstance.autoplayEnabled = store.app.queue.autoplay
      this.musicKitInstance._autoplayEnabled = store.app.queue.autoplay
      return this._musicKitInstance
    } catch (e) {
      console.error('Failed to initialize MusicKit: ', e)
      throw e
    }
  }

  initializeApis() {
    if (!this._musicKitInstance) {
      throw new Error('MusicKit instance not initialized')
    }

    const musicKitApiClient = new ApiClient(this._musicKitInstance, config)
    this._metadataApi = new MetadataApi(this._musicKitInstance, musicKitApiClient)
  }

  /**
   * Attempts to initialize the MusicKit instance.
   * @param attempts The number of attempts to initialize.
   * @returns A promise that resolves to the initialized MusicKit instance.
   * @throws If initialization fails after the specified number of attempts.
   */
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

  /**
   * Authorizes the musicKitInstance.
   * @returns A promise that resolves to a string or void.
   * @throws If authorization fails.
   */
  async authorize(): Promise<string | void> {
    try {
      return await this.musicKitInstance.authorize()
    } catch (e) {
      console.error('Failed to authorize: ', e)
      throw e
    }
  }

  /**
   * Sets the volume of the MusicKit instance.
   * @param volume - The volume value to set. Must be between 0 and 1.
   * @throws Error if the volume is not between 0 and 1.
   * @throws Error if the MusicKit instance is not initialized.
   */
  setVolume = (volume: number) => {
    if (volume < 0 || volume > 1) throw new Error('Volume must be between 0 and 1')
    if (!this.musicKitInstance) throw new Error('MusicKit instance not initialized')

    this.musicKitInstance.volume = volume
  }

  /**
   * Sets the shuffle mode of the MusicKit instance.
   * @param shuffle - The shuffle mode to set.
   * @throws Error if the MusicKit instance is not initialized.
   */
  setShuffle = (shuffle: MusicKit.PlayerShuffleMode) => {
    if (!this.musicKitInstance) throw new Error('MusicKit instance not initialized')

    this.musicKitInstance.shuffleMode = shuffle ? 1 : 0
  }

  /**
   * Sets the repeat mode for the MusicKit instance.
   * @param repeatMode The repeat mode to set.
   * @throws Error if the MusicKit instance is not initialized.
   */
  setRepeatMode = (repeatMode: MusicKit.PlayerRepeatMode) => {
    if (!this.musicKitInstance) throw new Error('MusicKit instance not initialized')

    this.musicKitInstance.repeatMode = repeatMode
  }

  /**
   * Plays the music using the MusicKit instance.
   */
  play = async () => {
    await this.musicKitInstance.play()
  }

  /**
   * Pauses the music playback.
   */
  pause = () => {
    this.musicKitInstance.pause()
  }

  /**
   * Stops the music playback.
   */
  stop = async () => {
    await this.musicKitInstance.stop()
  }

  /**
   * Sets the queue for the MusicKit instance.
   *
   * @param id - The ID of the media item.
   * @param type - The type of the media item.
   * @param shuffle - Optional. Specifies whether to shuffle the queue. Default is false.
   * @param startWith - Optional. Specifies the starting index of the queue. Default is 0.
   */
  setQueue = async (
    id: string,
    type: MusicKit.MediaItemType,
    shuffle = false,
    startWith = 0
  ) => {
    await this.musicKitInstance.setQueue({
      [type]: this.shouldItemBeArray(type) ? [id] : id,
      startWith: shuffle ? Math.floor(Math.random() * 100) : startWith
    })
  }

  /**
   * Moves a queue item from one position to another in the music queue.
   *
   * @param from - The index of the item to move.
   * @param to - The index where the item should be moved to.
   * @returns The updated array of queue items.
   */
  moveQueueItem = (from: number, to: number): MusicKit.QueueItem[] => {
    this.musicKitInstance.queue._queueItems.splice(
      to,
      0,
      this.musicKitInstance.queue._queueItems.splice(from, 1)[0]
    )
    this.musicKitInstance.queue._reindex()

    return this.musicKitInstance.queue._queueItems
  }

  /**
   * Changes the media to the specified index.
   * @param index - The index of the media to change to.
   */
  changeToIndex = async (index: number) => {
    await this.musicKitInstance.changeToMediaAtIndex(index)
  }

  /**
   * Clears the queue of the music player.
   * @returns {Promise<void>} A promise that resolves when the queue is cleared.
   */
  clearQueue = async () => {
    await this.musicKitInstance.clearQueue()
  }

  /**
   * Sets the station queue with the specified ID and type.
   *
   * @param id - The ID of the item to add to the queue.
   * @param type - The type of the item to add to the queue.
   * @returns A promise that resolves when the queue is set and playback starts.
   */
  setStationQueue = async (id: string, type: MusicKit.MediaItemType) => {
    const strippedType = MediaItemTypeService.stripType(type)
    this.musicKitInstance.setStationQueue({ [strippedType]: [id] })
    await this.play()
  }

  /**
   * Removes an item from the queue based on its ID.
   *
   * @param id - The ID of the item to be removed.
   * @returns The ID of the removed item.
   */
  removeFromQueue = (id: string): string => {
    console.log(this.musicKitInstance.queue._queueItems)
    this.musicKitInstance.queue._queueItems =
      this.musicKitInstance.queue._queueItems.filter(
        (item: MusicKit.QueueItem) => item.item.id !== id
      )

    this.musicKitInstance.queue._reindex()
    return id
  }

  /**
   * Processes the item with the specified id and plays it.
   *
   * @param id - The id of the item to process and play.
   * @param type - The type of the item (e.g., song, album, playlist).
   * @param shuffle - Optional. Specifies whether to shuffle the queue. Defaults to false.
   * @param startWith - Optional. Specifies the index to start playing from. Defaults to 0.
   */
  processItemAndPlay = async (
    id: string,
    type: MusicKit.MediaItemType,
    shuffle = false,
    startWith = 0
  ) => {
    const strippedType = MediaItemTypeService.stripType(type)

    await this.setQueue(id, strippedType, shuffle, startWith)
    await this.play()
  }

  /**
   * Sets the queue to play the specified item next.
   *
   * @param id - The ID of the item to be played.
   * @param type - The type of the item to be played.
   * @returns void.
   */
  playNext = async (id: string, type: MusicKit.MediaItemType) => {
    const strippedType = MediaItemTypeService.stripType(type)
    console.log(id, strippedType)

    await this.musicKitInstance.playNext({
      [strippedType]: this.shouldItemBeArray(strippedType) ? [id] : id
    })
    this.setShuffle('off' as unknown as MusicKit.PlayerShuffleMode)
  }

  /**
   * Sets the queue to play the specified item later.
   *
   * @param id - The ID of the media item to play later.
   * @param type - The type of the media item.
   * @returns void.
   */
  playLater = async (id: string, type: MediaItemType) => {
    const strippedType = MediaItemTypeService.stripType(type)

    await this.musicKitInstance.playLater({
      [strippedType]: this.shouldItemBeArray(strippedType) ? [id] : id
    })
    this.setShuffle('off' as unknown as MusicKit.PlayerShuffleMode)
  }

  /**
   * Seeks to the specified time in the music track.
   * @param time The time to seek to.
   * @throws {Error} If the time is less than 0.
   */
  seekToTime = async (time: number) => {
    if (time < 0) throw new Error('Time must be greater than 0')

    await this.musicKitInstance.seekToTime(time)
  }

  /**
   * Skips to the previous item in the music player.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  skipToPreviousItem = async () => {
    await this.musicKitInstance.skipToPreviousItem()
  }

  /**
   * Skips to the next item in the music queue.
   * @returns {Promise<void>} A promise that resolves when the skip operation is complete.
   */
  skipToNextItem = async () => {
    await this.musicKitInstance.skipToNextItem()
  }

  /**
   * Toggles the autoplay feature of the music player.
   * @param autoplay - A boolean value indicating whether autoplay should be enabled or disabled.
   * @returns The updated value of the autoplayEnabled property.
   */
  toggleAutoplay = (autoplay: boolean) => {
    this.musicKitInstance.autoplayEnabled = autoplay
    this.musicKitInstance._autoplayEnabled = autoplay
    return this.musicKitInstance.autoplayEnabled
  }

  // Events

  /**
   * Sets up the event handlers for various MusicKit events.
   */
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

  /**
   * Callback function that is called when the state of a media item changes.
   * @param event The event object containing information about the changed media item.
   */
  mediaItemStateDidChange = (event: MusicKit.MediaItem) => {
    console.log(event)
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
  }

  /**
   * Handles the event when the now playing item changes.
   * @param event - The event object.
   * @returns {Promise<void>}
   */
  nowPlayingItemDidChange = async (event: { item: MusicKit.MediaItem }) => {
    console.log(event)
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
      await discordService.setActivity({
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

    Utils.debounce(async () => {
      const isLoved = await mkApiManager.isItemFavorite(event.item.id, 'songs')
      console.log(isLoved)
      setStore(
        'currentTrack',
        'loved',
        isLoved.data?.[0]?.attributes.value === Reaction.Loved
      )
      setStore(
        'currentTrack',
        'disliked',
        isLoved.data?.[0]?.attributes?.value === Reaction.Disliked
      )

      const inLibrary = await mkApiManager.isItemInLibrary(event.item.id, 'songs')
      setStore('currentTrack', 'inLibrary', inLibrary.data?.[0]?.attributes?.inLibrary)
    }, 1000)()

    const rawLyricsData = await this._metadataApi
      .getSongLyrics(event.item.playParams.catalogId ?? event.item.playParams.id)
      .then(response => {
        return response.data[0].attributes.ttml
      })

    setStore('currentTrack', {
      lyrics: {
        lyricsArray: Utils.parseTTMLtoJS(rawLyricsData),
        writtenByArray: Utils.stripWrittenBy(rawLyricsData),
        begin: Utils.getLyricsBeginning(rawLyricsData)
      }
    })
  }

  /**
   * Callback function that is called when the queue items change.
   *
   * @param event - The event object containing the updated queue items.
   */
  queueItemsDidChange = (event: MusicKit.MediaItem[]) => {
    setStore('app', 'queue', {
      items: event,
      index: store.app.queue.index,
      nextUpIndex: MusicKit.getInstance().queue.position + 1,
      remainingStartIndex: store.app.queue.remainingStartIndex
    })
  }

  /**
   * Callback function that is called when the playback state changes.
   * @param event - The event object containing information about the playback state.
   */
  playbackStateDidChange = async (event: PlaybackStateDidChangeEvent) => {
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
        await discordService.setActivity(store.app.connectivity.discord.activity)
      }
    } else {
      setStore('app', 'connectivity', 'discord', 'activity', null)
      if (store.app.connectivity.discord.enabled) {
        await discordService.setActivity(store.app.connectivity.discord.activity)
      }
    }
  }

  /**
   * Callback function that is called when the playback duration changes.
   * @param event - The event object containing the new duration.
   */
  playbackDurationDidChange = (event: PlaybackDurwtionDidChange) => {
    setStore('duration', event.duration)
  }

  /**
   * Callback function that is called when the playback progress changes.
   * @param event - The event object containing the progress information.
   */
  playbackProgressDidChange = (event: PlaybackProgressDidChange) => {
    console.log(event)
    setStore('progress', event.progress * 100)
  }

  /**
   * Callback function that is called when the playback time changes.
   * @param event - The event object containing the current playback time.
   */
  playbackTimeDidChange = async (event: PlaybackTimeDidChange) => {
    setStore('currentTime', event.currentPlaybackTime)

    if (store.currentTime > 5 && !store.app.wroteToDb) {
      await increasePlayCount({
        id: store.currentTrack.id,
        artist: store.currentTrack.artist,
        playCount: 1,
        title: store.currentTrack.title
      })
      setStore('app', 'wroteToDb', true)
    }
  }

  /**
   * Handles the change in shuffle mode.
   * @param event - The event object containing the new shuffle mode.
   */
  shuffleModeDidChange = (event: number) => {
    console.log(event)
    console.log('shuffleModeDidChange', event)

    // off, songs
    if (event === 0) {
      this.setShuffle('off' as unknown as MusicKit.PlayerShuffleMode)
    } else if (event === 1) {
      this.setShuffle('songs' as unknown as MusicKit.PlayerShuffleMode)
    } else {
      throw new Error('Unknown shuffle mode')
    }
  }
}

export const mkManager = new MusicKitManager()
