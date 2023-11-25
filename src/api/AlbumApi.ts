import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
import { AlbumData } from '../types/api/AlbumResponse'
import { ApiClient } from './MkApiClient'

export class AlbumApi {
  _musicKitInstance: MusicKit.MusicKitInstance = null
  musicKitApiClient: ApiClient = null

  get musicKitInstance() {
    if (!this._musicKitInstance) {
      throw new Error('MusicKit instance not set')
    }
    return this._musicKitInstance
  }

  set musicKitInstance(musicKitInstance) {
    this._musicKitInstance = musicKitInstance
  }

  /**
   * Creates an instance of AlbumApi.
   * @param {MusicKit.MusicKitInstance} musicKitInstance - The MusicKit instance.
   * @param {ApiClient} musicKitApiClient - The API client for making requests to the music catalog.
   */
  constructor(musicKitInstance: MusicKit.MusicKitInstance, musicKitApiClient: ApiClient) {
    this.musicKitInstance = musicKitInstance
    this.musicKitApiClient = musicKitApiClient
  }

  async getAlbumFromMediaItem(id: string, type: MusicKit.MediaItemType) {
    const strippedType = MediaItemTypeService.stripType(type)
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      type.includes('library-')
        ? `me/library/${strippedType}/${id}/albums`
        : `catalog/${store.countryCode}/${strippedType}/${id}/albums`,
      null,
      {
        fields: 'url,artwork,name'
      }
    )

    if (type.includes('library-')) {
      const response2 = await this.musicKitApiClient.fetchFromMusicKit(
        `me/library/albums/${(response.data?.[0] as AlbumData).id}/catalog`,
        null,
        {
          fields: 'url'
        }
      )

      return response2
    }

    return response
  }
}
