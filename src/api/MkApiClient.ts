import { AlbumData, AlbumResponse } from '../types/api/AlbumResponse'
import { ArtistData, ArtistResponse } from '../types/api/ArtistResponse'
import { ApiResponse, FetchOptions } from '../types/api/common'
import { Config } from '../types/common'

/**
 * Represents an API client for interacting with the MusicKit API.
 */
export class ApiClient {
  _musicKitInstance: MusicKit.MusicKitInstance = null
  config: Config

  /**
   * Gets the MusicKit instance.
   * @throws {Error} If the MusicKit instance is not set.
   * @returns {Object} The MusicKit instance.
   */
  get musicKitInstance(): MusicKit.MusicKitInstance {
    if (!this._musicKitInstance) {
      throw new Error('MusicKit instance not set')
    }
    return this._musicKitInstance
  }

  /**
   * Sets the MusicKit instance.
   * @param {Object} musicKitInstance - The MusicKit instance to set.
   */
  set musicKitInstance(musicKitInstance: MusicKit.MusicKitInstance) {
    this._musicKitInstance = musicKitInstance
  }

  /**
   * Creates a new instance of the ApiClient class.
   * @param {Object} musicKitInstance - The MusicKit instance.
   * @param {Object} config - The configuration object.
   */
  constructor(musicKitInstance: MusicKit.MusicKitInstance, config: Config) {
    this._musicKitInstance = null
    this.musicKitInstance = musicKitInstance

    this.config = config
  }

  /**
   * Fetches data from the MusicKit API.
   * @param {string} endpoint - The API endpoint.
   * @param {Object} options - The request options.
   * @param {Object} options.headers - The request headers.
   * @param {string | FormData | Blob | ArrayBuffer | URLSearchParams} [options.body] - The request body for POST, PUT requests.
   * @param {Object} queryParams - The query parameters to append to the URL.
   * @returns {Promise<Object>} The response data.
   * @throws {Error} If the API call fails.
   */
  async fetchFromMusicKit(
    endpoint: string,
    options: FetchOptions = { method: 'GET' },
    queryParams = {}
  ): Promise<ApiResponse<ArtistResponse | AlbumResponse>> {
    // Adjust the return type as per your API response
    let url = `https://amp-api.music.apple.com/v1/${endpoint}`

    // Handling query parameters
    const query = new URLSearchParams({
      ...queryParams,
      l: 'en-US',
      platform: 'web'
    }).toString()
    url += query ? `?${query}` : ''

    // Preparing headers
    const headers = new Headers(options?.headers || {})
    headers.set('Authorization', `Bearer ${this.config.MusicKit.token}`)
    headers.set('Music-User-Token', this.config.MusicKit.musicUserToken)

    // Stringify body if it's an object and not FormData
    let body = options?.body
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
      body = JSON.stringify(body)
    }

    // Final fetch options
    const fetchOptions: RequestInit = {
      ...options,
      headers,
      body
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      throw new Error(`API Call failed: ${response.status}`)
    }

    return response.json() as Promise<ApiResponse<AlbumData | ArtistData>>
  }
}
