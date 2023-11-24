export class ArtistsApi {
  _musicKitInstance: MusicKit.MusicKitInstance = null

  get musicKitInstance() {
    if (!this._musicKitInstance) {
      throw new Error('MusicKit instance not set')
    }
    return this._musicKitInstance
  }

  set musicKitInstance(musicKitInstance) {
    this._musicKitInstance = musicKitInstance
  }

  constructor(musicKitInstance) {
    this.musicKitInstance = musicKitInstance
  }
}
