import * as config from '../../config.json'

const LIBRARY_SONGS_URL = 'https://amp-api.music.apple.com/v1/me/library/songs'

export const songService = {
  async fetchLibrarySongs(params = {}) {
    const url = new URL(LIBRARY_SONGS_URL)
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const response = await fetch(url.toString(), {
      headers: {
        authorization: `Bearer ${config.MusicKit.token}`,
        'music-user-token': config.MusicKit.musicUserToken
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  },

  async fetchAllLibrarySongs(offset = 0, accumulatedSongs = []): Promise<any[]> {
    const res = await songService.fetchLibrarySongs({
      platform: 'web',
      limit: 100,
      offset: offset,
      extend: 'artistUrl',
      art: { f: 'url' },
      include: 'catalog,artists,albums'
    })

    // Combine current results with previous ones
    const newSongs = accumulatedSongs.concat(res.data)

    if (res.next) {
      // Recursively fetch more songs if necessary
      return songService.fetchAllLibrarySongs(offset + 100, newSongs)
    }

    return newSongs
  }
}
