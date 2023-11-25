import { ALBUM_QUERY_PARAMS, API_ENDPOINTS } from '../config/config'
import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
import { AlbumData, AlbumResponse } from '../types/api/AlbumResponse'
import { ApiResponse, DataItem } from '../types/api/common'
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
  constructor(musicKitInstance: MusicKit.MusicKitInstance, musicKitApiClient: ApiClient) {
    this.musicKitInstance = musicKitInstance
    this.musicKitApiClient = musicKitApiClient
  }

  /**
   * Adds an item to the user's library.
   * @param id The ID of the item to be added.
   * @param type The type of the item to be added ('songs', 'albums', or 'playlists').
   * @returns A Promise that resolves to the response from the server.
   */
  async addToLibrary(id: string, type: MusicKit.MediaItemType) {
    const strippedType = MediaItemTypeService.stripType(type)
    await this.musicKitApiClient.fetchFromMusicKit<void>(
      API_ENDPOINTS.baseLibrary,
      {
        method: 'POST'
      },
      {
        [`ids[${strippedType}]`]: id
      }
    )
  }

  /**
   * Removes an item from the user's library.
   * @param id The ID of the item to be removed.
   * @param type The type of the item to be removed ('songs', 'albums', or 'playlists').
   * @returns A Promise that resolves to the response from the server.
   */
  // TODO improve types
  async removeFromLibrary(id: string, type: MusicKit.MediaItemType) {
    const strippedType = MediaItemTypeService.stripType(type)
    await this.musicKitApiClient.fetchFromMusicKit<void>(
      API_ENDPOINTS.removeFromLibrary(id, strippedType),
      { method: 'DELETE' }
    )
  }

  /**
   * Checks if an item is marked as a favorite by the user.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async isItemFavorite(id: string, type: string) {
    const response = await this.musicKitApiClient.fetchFromMusicKit<RatingResponse>(
      `${API_ENDPOINTS.baseRatings}/${type}`,
      null,
      {
        ids: id
      }
    )

    return response
  }

  /**
   * Marks an item as a favorite.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async favoriteItem(id: string, type: string) {
    await this.musicKitApiClient.fetchFromMusicKit<void>(
      API_ENDPOINTS.ratingsCatalog(id, type),
      { method: 'PUT', body: JSON.stringify({ attributes: { value: 1 } }) }
    )
  }

  /**
   * Unmarks an item as a favorite.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async unfavoriteItem(id: string, type: string) {
    await this.musicKitApiClient.fetchFromMusicKit<void>(
      API_ENDPOINTS.ratingsCatalog(id, type),
      { method: 'DELETE' }
    )
  }

  /**
   * Marks an item as disliked.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async dislikeItem(id: string, type: string) {
    await this.musicKitApiClient.fetchFromMusicKit<void>(
      API_ENDPOINTS.ratingsCatalog(id, type),
      { method: 'PUT', body: JSON.stringify({ attributes: { value: -1 } }) }
    )
  }

  /**
   * Checks if an item is in the user's library.
   * @param id - The ID of the item.
   * @param type - The type of the item.
   * @returns A Promise that resolves with the response from the server.
   */
  async isItemInLibrary(
    id: string,
    type: MusicKit.MediaItemType
  ): Promise<AlbumResponse> {
    if (type[0] === 'l')
      return {
        data: [
          {
            attributes: {
              inLibrary: true,
              name: '',
              artwork: { url: '', width: 0, height: 0 },
              artistName: '',
              contentRating: '',
              url: '',
              genreNames: [],
              isComplete: false,
              isSingle: false,
              playParams: { id: '', kind: '' },
              recordLabel: '',
              releaseDate: '',
              trackCount: 0,
              editorialNotes: { short: '' }
            },
            href: '',
            id: '',
            relationships: {
              artists: { data: [], href: '' },
              tracks: { data: [], href: '' }
            },
            type: ''
          }
        ]
      }

    const strippedType = MediaItemTypeService.stripType(type)

    const response = await this.musicKitApiClient.fetchFromMusicKit<
      ApiResponse<AlbumData>
    >(
      API_ENDPOINTS.catalog(store.countryCode, strippedType),
      {
        headers: { 'Cache-Control': 'no-cache' },
        method: 'GET'
      },
      {
        ...ALBUM_QUERY_PARAMS,
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
  async getCatalogItemFromLibrary(id: string, type: MusicKit.MediaItemType) {
    const strippedType = MediaItemTypeService.stripType(type)
    const response = await this.musicKitApiClient.fetchFromMusicKit<DataItem>(
      API_ENDPOINTS.catalogFromLibrary(store.countryCode, strippedType, id),
      null
    )

    return response
  }

  /**
   * Retrieves the library ID from the catalog based on the provided ID and type.
   * @param id The ID of the item in the catalog.
   * @param type The type of the item in the catalog.
   * @returns A Promise that resolves to the response from the API.
   */
  async getLibraryIdFromCatalog(id: string, type: string) {
    const response = await this.musicKitApiClient.fetchFromMusicKit<
      ApiResponse<DataItem>
    >(API_ENDPOINTS.libraryFromCatalog(store.countryCode, type, id), null)

    console.log(response)

    return response
  }
}
