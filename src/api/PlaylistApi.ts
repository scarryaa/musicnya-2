import { MediaItemTypeService } from '../services/mediaItemTypeService'
import { store } from '../stores/store'
import { ApiClient } from './MkApiClient'

export class PlaylistApi {
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
   * Creates an instance of PlaylistApi.
   * @param {MusicKit.MusicKitInstance} musicKitInstance - The MusicKit instance.
   * @param {ApiClient} musicKitApiClient - The API client for making requests to the music catalog.
   */
  constructor(musicKitInstance, musicKitApiClient) {
    this.musicKitInstance = musicKitInstance
    this.musicKitApiClient = musicKitApiClient
  }

  /**
   * Adds an item to a playlist.
   *
   * @param id - The ID of the item to be added.
   * @param type - The type of the item to be added ('songs', 'albums', or 'playlists').
   * @param playlistId - The ID of the playlist.
   * @returns A Promise that resolves to the response from the server.
   */
  async addItemToPlaylist(
    id: string,
    type: 'songs' | 'albums' | 'playlists',
    playlistId: string
  ) {
    const strippedType = MediaItemTypeService.stripType(type)
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/library/playlists/${playlistId}/tracks`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: [
            {
              id,
              type: strippedType
            }
          ]
        })
      }
    )

    return response
  }

  /**
   * Removes an item from a playlist.
   *
   * @param id - The ID of the item to be removed.
   * @param type - The type of the item to be removed ('songs', 'albums', or 'playlists').
   * @param playlistId - The ID of the playlist.
   * @returns A Promise that resolves to the response from the server.
   */
  async removeItemFromPlaylist(
    id: string,
    type: 'songs' | 'albums' | 'playlists',
    playlistId: string
  ) {
    const strippedType = MediaItemTypeService.stripType(type)
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/library/playlists/${playlistId}/tracks`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          data: [
            {
              id,
              type: strippedType
            }
          ]
        })
      }
    )

    return response
  }

  /**
   * Creates a new playlist.
   *
   * @param name - The name of the playlist.
   * @param description - The description of the playlist.
   * @returns A Promise that resolves to the response from the server.
   */
  async createPlaylist(name: string, description: string) {
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/library/playlists`,
      {
        method: 'POST',
        body: JSON.stringify({
          attributes: {
            name,
            description
          }
        })
      }
    )

    return response
  }

  /**
   * Removes a playlist.
   *
   * @param playlistId - The ID of the playlist.
   * @returns A Promise that resolves to the response from the server.
   */
  async removePlaylist(playlistId: string) {
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `me/library/playlists/${playlistId}`,
      {
        method: 'DELETE'
      }
    )

    return response
  }

  /**
   * Fetches more items for a playlist.
   *
   * @param playlistId - The ID of the playlist.
   * @param type - The type of the playlist.
   * @param offset - The offset to use for the request.
   * @returns A Promise that resolves to the response from the server.
   */
  async fetchMoreItems(playlistId: string, type: string, offset: number) {
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      type.includes('library-')
        ? `me/library/playlists/${playlistId}/tracks`
        : `catalog/${store.countryCode}/playlists/${playlistId}/tracks`,
      null,
      {
        include: 'albums,catalog,artists',
        offset: offset,
        limit: 100
      }
    )

    return response
  }
}
