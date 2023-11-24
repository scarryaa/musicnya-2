import * as config from '../../config.json'
import { MediaItemTypeService } from '../services/mediaItemTypeService'

class MusicKitManager {
  _musicKitInstance: MusicKit.MusicKitInstance | null = null

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

  async authorize() {
    try {
      await this.musicKitInstance.authorize()
    } catch (e) {
      console.error('Failed to authorize: ', e)
      throw e
    }
  }

  setVolume = (volume: number) => {
    if (volume < 0 || volume > 1) throw new Error('Volume must be between 0 and 1')

    this.musicKitInstance.volume = volume
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

  setQueue = async (id: string, type: string) => {
    await this.musicKitInstance.setQueue({ [type]: id })
  }

  processItemAndPlay = async (item: MusicKit.MediaItem) => {
    const strippedType = MediaItemTypeService.stripType(item.type)
    const id = item.id

    await this.setQueue(id, strippedType)
  }
}

export const mkManager = new MusicKitManager()
