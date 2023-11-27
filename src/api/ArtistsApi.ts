import { API_ENDPOINTS, ARTIST_QUERY_PARAMS, BASE_QUERY_PARAMS } from '../config/config'
import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
import { ApiResponse, DataItem } from '../types/api/common'
import { ArtistQueryParams, BaseQueryParams } from '../types/config/config'
import ValidationUtils from '../util/ValidationUtils'
import { ApiClient } from './MkApiClient'

/**
 * Represents an API for retrieving information about artists from the music catalog.
 */
export class ArtistsApi {
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
   * Retrieves an artist's information from the music catalog.
   * @param {string} id - The ID of the artist.
   * @returns {Promise<Object>} - A promise that resolves to the artist's information.
   */
  async getArtist(id: string): Promise<ApiResponse<MusicKit.Artists>> {
    ValidationUtils.validateParam(id, 'artist ID')
    console.log(id)

    const queryParams = {
      include: 'albums,songs',
      ...BASE_QUERY_PARAMS,
      views: ARTIST_QUERY_PARAMS.views,
      extend: ARTIST_QUERY_PARAMS.extend,
      'extend[playlists]': ARTIST_QUERY_PARAMS['extend[playlists]'],
      'art[url]': ARTIST_QUERY_PARAMS['art[url]'],
      'include[songs]': ARTIST_QUERY_PARAMS['include[songs]'],
      'fields[albums]': ARTIST_QUERY_PARAMS['fields[albums]'],
      'limit[artists:top-songs]': ARTIST_QUERY_PARAMS['limit[artists:top-songs]']
    }

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      API_ENDPOINTS.artistCatalog(store.countryCode, id),
      null,
      queryParams
    )
    return response as ApiResponse<MusicKit.Artists>
  }

  /**
   * Checks if an artist is marked as a favorite by the user.
   * @param {string} id - The ID of the artist.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async isArtistFavorite(id: string) {
    ValidationUtils.validateParam(id, 'artist ID')

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      API_ENDPOINTS.favorites,
      null,
      { ...BASE_QUERY_PARAMS, 'ids[artists]': id }
    )

    return response
  }

  /**
   * Marks an artist as a favorite.
   * @param {string} id - The ID of the artist.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async favoriteArtist(id: string) {
    ValidationUtils.validateParam(id, 'artist ID')

    const queryParams: BaseQueryParams &
      Pick<ArtistQueryParams, 'art[url]'> & { 'ids[artists]': string } = {
      ...BASE_QUERY_PARAMS,
      'art[url]': ARTIST_QUERY_PARAMS['art[url]'],
      'ids[artists]': id
    }

    await this.musicKitApiClient.fetchFromMusicKit<void>(
      API_ENDPOINTS.favorites,
      { method: 'POST' },
      queryParams
    )
  }

  /**
   * Unmarks an artist as a favorite.
   * @param {string} id - The ID of the artist.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async unfavoriteArtist(id: string) {
    ValidationUtils.validateParam(id, 'artist ID')

    if (!id) {
      throw new Error('Invalid artist ID')
    }

    const queryParams = {
      'ids[artists]': id
    }

    await this.musicKitApiClient.fetchFromMusicKit<void>(
      API_ENDPOINTS.favorites,
      { method: 'DELETE' },
      queryParams
    )
  }

  /**
   * Retrieves an artist from a media item.
   *
   * @param id - The ID of the media item.
   * @param type - The type of the media item.
   * @returns A Promise that resolves to the artist information.
   * @throws Error if there is an error fetching the artist from the media item.
   */
  async getArtistFromMediaItem(id: string, type: MusicKit.MediaItemType) {
    ValidationUtils.validateParam(
      id,
      'media item ID',
      (param: string) => param && param.trim() !== ''
    )

    const strippedType = MediaItemTypeService.stripType(type)
    const queryParams = {
      ...BASE_QUERY_PARAMS,
      'fields[artists]': ARTIST_QUERY_PARAMS['fields[artists]']
    }

    try {
      let endpoint = this.constructEndpoint(id, strippedType, type) + '/artists'
      const response = await this.musicKitApiClient.fetchFromMusicKit<
        ApiResponse<DataItem>
      >(endpoint, null, {
        ...queryParams
      })

      if (MediaItemTypeService.isLibraryType(type)) {
        endpoint = `${API_ENDPOINTS.libraryArtists}/${response.data[0].id}/catalog?l=en-US&platform=web&fields=url`
        const response2 = await this.musicKitApiClient.fetchFromMusicKit<
          ApiResponse<DataItem>
        >(endpoint, null, {
          ...queryParams
        })
        return response2
      }

      return response
    } catch (error) {
      // Handle or log the error
      throw new Error('Error fetching artist from media item')
    }
  }

  /**
   * Constructs an endpoint based on the provided parameters.
   * @param id - The ID of the item.
   * @param strippedType - The stripped type of the item.
   * @param type - The type of the item.
   * @returns The constructed endpoint.
   */
  constructEndpoint(id: string, strippedType: string, type: MusicKit.MediaItemType) {
    ValidationUtils.validateParam(id, 'media item ID')
    ValidationUtils.validateParam(strippedType, 'stripped type')

    if (MediaItemTypeService.isLibraryType(type)) {
      return `${API_ENDPOINTS.baseLibrary}/${strippedType}/${id}`
    } else {
      return `${API_ENDPOINTS.baseCatalog}/${store.countryCode}/${strippedType}/${id}`
    }
  }

  async getCatalogArtistFromLibrary(id: string) {
    const response = await this.musicKitApiClient.fetchFromMusicKit<
      ApiResponse<DataItem>
    >(`${API_ENDPOINTS.libraryArtists}/${id}/${API_ENDPOINTS.baseCatalog}`, null)

    return response
  }
}
