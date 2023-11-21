import * as config from '../../config.json'

const LIBRARY_ALBUMS_URL = 'https://amp-api.music.apple.com/v1/me/library/albums'

export const albumService = {
  async fetchLibraryAlbums(params = {}) {
    try {
      const url = new URL(LIBRARY_ALBUMS_URL)
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
    } catch (error) {
      throw error
    }
  },

  async fetchAllLibraryAlbums(offset = 0, accumulatedAlbums = []) {
    try {
      const res = await albumService.fetchLibraryAlbums({
        platform: 'web',
        limit: 100,
        offset: offset,
        extend: 'artistUrl',
        art: { f: 'url' },
        include: 'catalog,artists'
      })

      // Combine current results with previous ones
      const newAlbums = accumulatedAlbums.concat(res.data)

      if (res.next) {
        // Recursively fetch more albums if necessary
        return albumService.fetchAllLibraryAlbums(offset + 100, newAlbums)
      }

      return newAlbums
    } catch (error) {
      console.error('Error fetching additional albums:', error)
      throw error
    }
  }
}
