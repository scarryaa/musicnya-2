import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
import { ArtistData, ArtistResponse } from '../types/api/ArtistResponse'
import { ApiResponse } from '../types/api/common'
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
  async getArtist(id: string): Promise<ArtistResponse> {
    ValidationUtils.validateParam(id, 'artist ID')
    console.log(id)

    const queryParams = {
      include: 'albums,songs',
      l: 'en-US',
      platform: 'web',
      views:
        'featured-release,full-albums,appears-on-albums,featured-albums,featured-on-albums,singles,compilation-albums,live-albums,latest-release,top-music-videos,similar-artists,top-songs,playlists,more-to-see',
      extend:
        'centeredFullscreenBackground,artistBio,bornOrFormed,editorialArtwork,editorialVideo,isGroup,origin,inFavorites,hero',
      'extend[playlists]': 'trackCount',
      'include[songs]': 'albums',
      'fields[albums]':
        'artistName,artistUrl,artwork,contentRating,editorialArtwork,editorialVideo,name,playParams,releaseDate,url,trackCount',
      'limit[artists:top-songs]': '20',
      'art[url]': 'f'
    }

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `catalog/${store.countryCode}/artists/${id}`,
      null,
      queryParams
    )
    return response
  }

  /**
   * Checks if an artist is marked as a favorite by the user.
   * @param {string} id - The ID of the artist.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async isArtistFavorite(id: string) {
    ValidationUtils.validateParam(id, 'artist ID')

    const queryParams = {
      l: 'en-US',
      platform: 'web',
      'ids[artists]': id
    }

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      'me/favorites',
      null,
      queryParams
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

    const queryParams = {
      l: 'en-US',
      platform: 'web',
      'art[url]': 'f',
      'ids[artists]': id
    }

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      'me/favorites',
      { method: 'POST' },
      queryParams
    )

    return response
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

    const response = await this.musicKitApiClient.fetchFromMusicKit(
      'me/favorites',
      { method: 'DELETE' },
      queryParams
    )

    return response
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
      'fields[artists]':
        'url,artwork,editorialArtwork,editorialNotes,genreNames,isGroup,name,url'
    }

    try {
      let endpoint = this.constructEndpoint(id, strippedType, type) + '/artists'
      const response = await this.musicKitApiClient.fetchFromMusicKit(endpoint, null, {
        ...queryParams
      })

      if (MediaItemTypeService.isLibraryType(type)) {
        endpoint = `me/library/artists/${
          (response.data[0] as ArtistData).id
        }/catalog?l=en-US&platform=web&fields=url`
        const response2 = await this.musicKitApiClient.fetchFromMusicKit(endpoint, null, {
          ...queryParams
        })
        return response2
      }

      return response
    } catch (error) {
      // Handle or log the error
      console.log(error)
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
      return `me/library/${strippedType}/${id}`
    } else {
      return `catalog/${store.countryCode}/${strippedType}/${id}`
    }
  }
}
