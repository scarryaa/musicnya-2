export class ApiClient {
  _musicKitInstance = null
  config = null

  get musicKitInstance() {
    if (!this._musicKitInstance) {
      throw new Error('MusicKit instance not set')
    }
    return this._musicKitInstance
  }

  set musicKitInstance(musicKitInstance) {
    this._musicKitInstance = musicKitInstance
  }

  constructor(musicKitInstance, config) {
    this._musicKitInstance = null
    this.musicKitInstance = musicKitInstance

    this.config = config
  }

  async fetchFromMusicKit(endpoint, options = { headers: {} }) {
    const url = `https://amp-api.music.apple.com/v1/${endpoint}`
    const headers = {
      authorization: `Bearer ${this.config.MusicKit.token}`,
      'music-user-token': this.config.MusicKit.musicUserToken,
      ...options.headers
    }

    try {
      const response = await fetch(url, { ...options, headers })

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
