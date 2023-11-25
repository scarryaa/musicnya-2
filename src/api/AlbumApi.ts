import { ALBUM_QUERY_PARAMS, API_ENDPOINTS } from '../config/config'
import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
import { Album } from '../types/api/ItemResponse'
import { ApiResponse } from '../types/api/common'
import { ApiClient } from './MkApiClient'

export class AlbumApi {
  private _musicKitInstance: MusicKit.MusicKitInstance = null
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
    const response = await this.musicKitApiClient.fetchFromMusicKit<ApiResponse<Album>>(
      type.includes('library-')
        ? `${API_ENDPOINTS.baseLibrary}/${strippedType}/${id}/albums`
        : `${API_ENDPOINTS.albumCatalog(store.countryCode, id)}/albums`,
      null,
      {
        fields: ALBUM_QUERY_PARAMS.fields
      }
    )

    console.log(response)

    if (type.includes('library-')) {
      const response2 = await this.musicKitApiClient.fetchFromMusicKit<
        ApiResponse<Album>
      >(`${API_ENDPOINTS.albumCatalogFromLibrary(store.countryCode, id)}/albums`, null, {
        fields: ALBUM_QUERY_PARAMS.fields
      })

      return response2
    }

    return response
  }
}
