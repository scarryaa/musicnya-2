import { API_ENDPOINTS } from '../config/config'
import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
import { LyricsResponse } from '../types/api/LyricsResponse'
import ValidationUtils from '../util/ValidationUtils'
import { ApiClient } from './MkApiClient'

export class MetadataApi {
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
   * Creates an instance of MetadataApi.
   * @param {MusicKit.MusicKitInstance} musicKitInstance - The MusicKit instance.
   * @param {ApiClient} musicKitApiClient - The API client for making requests to the music catalog.
   */
  constructor(musicKitInstance: MusicKit.MusicKitInstance, musicKitApiClient: ApiClient) {
    this.musicKitInstance = musicKitInstance
    this.musicKitApiClient = musicKitApiClient
  }

  /**
   * Retrieves the credits for a song with the specified ID.
   *
   * @param id - The ID of the song.
   * @returns A Promise that resolves to the response containing the song credits.
   */
  async getSongCredits(id: string) {
    ValidationUtils.validateParam(id, 'song ID', (id: string) => id.length > 0)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `${API_ENDPOINTS.songCatalog(store.countryCode, id)}/credits`
    )

    return response
  }

  /**
   * Retrieves the lyrics for a song with the specified ID.
   *
   * @param id - The ID of the song.
   * @returns A Promise that resolves to the response containing the song lyrics.
   */
  async getSongLyrics(id: string) {
    ValidationUtils.validateParam(id, 'song ID', (id: string) => id.length > 0)

    const response = await this.musicKitApiClient.fetchFromMusicKit<LyricsResponse>(
      `${API_ENDPOINTS.songCatalog(store.countryCode, id)}/lyrics`
    )

    return response
  }

  /**
   * Retrieves the recent songs played by the user.
   *
   * @returns {Promise<any>} A promise that resolves to the response from the API.
   */
  async getRecentSongs() {
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      API_ENDPOINTS.recentSongs
    )

    return response
  }

  /**
   * Retrieves the recently added items.
   *
   * @param offset - The offset to use for the request.
   * @returns A Promise that resolves to the response containing the recently added items.
   */
  async getRecentlyAdded(offset: number) {
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      API_ENDPOINTS.recentlyAdded,
      null,
      {
        include: 'catalog',
        offset: offset,
        extend: 'artistUrl'
      }
    )

    return response
  }

  async getShareLink(id: string, type: MusicKit.MediaItemType) {
    const strippedType = MediaItemTypeService.stripType(type)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      type.includes('library-')
        ? API_ENDPOINTS.catalogFromLibrary(store.countryCode, strippedType, id)
        : `${API_ENDPOINTS.catalog(store.countryCode, strippedType)}/${id}`,
      null,
      {
        fields: 'url',
        'ids[artists]': id
      }
    )

    return response
  }
}
