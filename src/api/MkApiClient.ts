/**
 * Represents an API client for interacting with the MusicKit API.
 */
export class ApiClient {
  _musicKitInstance = null
  config = null

  /**
   * Gets the MusicKit instance.
   * @throws {Error} If the MusicKit instance is not set.
   * @returns {Object} The MusicKit instance.
   */
  get musicKitInstance() {
    if (!this._musicKitInstance) {
      throw new Error('MusicKit instance not set')
    }
    return this._musicKitInstance
  }

  /**
   * Sets the MusicKit instance.
   * @param {Object} musicKitInstance - The MusicKit instance to set.
   */
  set musicKitInstance(musicKitInstance) {
    this._musicKitInstance = musicKitInstance
  }

  /**
   * Creates a new instance of the ApiClient class.
   * @param {Object} musicKitInstance - The MusicKit instance.
   * @param {Object} config - The configuration object.
   */
  constructor(musicKitInstance, config) {
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
    options: {
      headers?: any
      body?: any
      method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    } = { method: 'GET' },
    queryParams = {}
  ) {
    let url = `https://amp-api.music.apple.com/v1/${endpoint}`

    // Handle query parameters
    const query = new URLSearchParams({
      ...queryParams,
      ...{
        l: 'en-US',
        platform: 'web'
      }
    }).toString()
    if (query) {
      url += `?${query}`
    }

    const headers = {
      authorization: `Bearer ${this.config.MusicKit.token}`,
      'music-user-token': this.config.MusicKit.musicUserToken,
      ...options?.headers
    }

    // Ensure the correct Content-Type is set if there's a body
    if (
      options?.body &&
      typeof options.body === 'object' &&
      !(options.body instanceof FormData)
    ) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json'
      options.body = JSON.stringify(options.body)
    }

    // Set up the fetch options
    const fetchOptions = { ...options, headers }
    if (!options?.body) {
      delete fetchOptions.body // Only include body if it's provided
    }

    try {
      // @ts-ignore
      const response = await fetch(url, fetchOptions)

      if (!response.ok) {
        throw new Error(`API Call failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.log('API call error:', error)
      throw new Error(error.message)
    }
  }
}
