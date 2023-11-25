import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
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
  constructor(musicKitInstance, musicKitApiClient) {
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
    ValidationUtils.validateParam(id, 'song ID', id => id.length > 0)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `catalog/${store.countryCode}/songs/${id}/credits`
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
    ValidationUtils.validateParam(id, 'song ID', id => id.length > 0)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `catalog/${store.countryCode}/songs/${id}/lyrics`
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
      `me/recent/played/tracks`
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
      `me/library/recently-added`,
      null,
      {
        include: 'catalog',
        offset: offset,
        extend: 'artistUrl'
      }
    )

    return response
  }

  async getShareLink(id: string, type: string) {
    const strippedType = MediaItemTypeService.stripType(type)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      type.includes('library-')
        ? `me/library/${strippedType}/${id}/catalog`
        : `catalog/${store.countryCode}/${type}/${id}`,
      null,
      {
        fields: 'url',
        'ids[artists]': id
      }
    )

    return response
  }
}
