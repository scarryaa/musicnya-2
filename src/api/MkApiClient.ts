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

  async fetchFromMusicKit(endpoint, options = {}) {
    const url = `https://amp-api.music.apple.com/v1/${endpoint}`
    const headers = {
      authorization: `Bearer ${config}`
    }
  }
}
