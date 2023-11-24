import { ApiClient } from './MkApiClient'

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

  constructor(musicKitInstance, musicKitApiClient) {
    this.musicKitInstance = musicKitInstance
    this.musicKitApiClient = musicKitApiClient
  }

  async getArtist(id) {
    const response = await this.musicKitApiClient.fetchFromMusicKit(
      `catalog/us/artists/${id}`
    )
    return response.data[0]
  }
}
