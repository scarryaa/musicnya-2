import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
import { ApiClient } from './MkApiClient'

/**
 * Represents an API for retrieving information about the user's library.
 */
export class LibraryApi {
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
   * Creates an instance of ArtistsApi.
   * @param {MusicKit.MusicKitInstance} musicKitInstance - The MusicKit instance.
   * @param {ApiClient} musicKitApiClient - The API client for making requests to the music catalog.
   */
  constructor(musicKitInstance, musicKitApiClient) {
    this.musicKitInstance = musicKitInstance
    this.musicKitApiClient = musicKitApiClient
  }

  /**
   * Adds an item to the user's library.
   * @param id The ID of the item to be added.
   * @param type The type of the item to be added ('songs', 'albums', or 'playlists').
   * @returns A Promise that resolves to the response from the server.
   */
  async addToLibrary(id: string, type: 'songs' | 'albums' | 'playlists') {
    const strippedType = MediaItemTypeService.stripType(type)
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/library`,
      {
        method: 'POST'
      },
      {
        [`ids[${strippedType}]`]: id
      }
    )

    return response
  }

  /**
   * Removes an item from the user's library.
   * @param id The ID of the item to be removed.
   * @param type The type of the item to be removed ('songs', 'albums', or 'playlists').
   * @returns A Promise that resolves to the response from the server.
   */
  async removeFromLibrary(id: string, type: 'songs' | 'albums' | 'playlists') {
    const strippedType = MediaItemTypeService.stripType(type)
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/library/${strippedType}/${id}`,
      { method: 'DELETE' }
    )

    return response
  }

  /**
   * Checks if an item is marked as a favorite by the user.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async isItemFavorite(id: string, type: string) {
    const strippedType = MediaItemTypeService.stripType(type)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/ratings/${type}`,
      null,
      {
        ids: id
      }
    )

    console.log(response)
    return response
  }

  /**
   * Marks an item as a favorite.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async favoriteItem(id: string, type: string) {
    const strippedType = MediaItemTypeService.stripType(type)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/ratings/${type}/${id}`,
      { method: 'PUT', body: JSON.stringify({ attributes: { value: 1 } }) }
    )

    return response
  }

  /**
   * Unmarks an item as a favorite.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async unfavoriteItem(id: string, type: string) {
    const strippedType = MediaItemTypeService.stripType(type)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/ratings/${type}/${id}`,
      { method: 'DELETE' }
    )

    return response
  }

  /**
   * Marks an item as disliked.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async dislikeItem(id: string, type: string) {
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/ratings/${type}/${id}`,
      { method: 'PUT', body: JSON.stringify({ attributes: { value: -1 } }) }
    )

    return response
  }

  /**
   * Checks if an item is in the user's library.
   * @param id - The ID of the item.
   * @param type - The type of the item.
   * @returns A Promise that resolves with the response from the server.
   */
  async isItemInLibrary(id: string, type: string) {
    if (type[0] === 'l') return { data: [{ attributes: { inLibrary: true } }] }

    const strippedType = MediaItemTypeService.stripType(type)

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `catalog/${store.countryCode}/${strippedType}`,
      null,
      {
        fields: 'inLibrary',
        [`ids`]: id
      }
    )

    console.log(response)
    return response
  }

  /**
   * Retrieves a catalog item from the library id.
   *
   * @param id - The ID of the item to retrieve.
   * @param type - The type of the item to retrieve.
   * @returns A Promise that resolves to the response from the API.
   */
  async getCatalogItemFromLibrary(id: string, type: string) {
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/library/${type}/${id}/catalog`,
      null
    )

    return response
  }
}
