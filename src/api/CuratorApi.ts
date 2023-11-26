import { API_ENDPOINTS } from '../config/config'
import { store } from '../stores/store'
import { ApiResponse } from '../types/api/common'
import { ApiClient } from './MkApiClient'

export class CuratorApi {
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

  /**
   * Retrieves a curator by ID.
   * @param id The ID of the curator.
   * @returns A promise that resolves to the response containing the curator data.
   */
  async getCurator(id: string) {
    const response = await this.musicKitApiClient.fetchFromMusicKit<ApiResponse<Curator>>(
      `${API_ENDPOINTS.curatorCatalog(store.countryCode, id)}`
    )

    return response
  }
}
