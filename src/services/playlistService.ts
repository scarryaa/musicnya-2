import * as config from '../../config.json'

const LIBRARY_PLAYLISTS_URL = 'https://amp-api.music.apple.com/v1/me/library/playlists'

export const playlistService = {
  async fetchLibraryPlaylists(params = {}) {
    try {
      const url = new URL(LIBRARY_PLAYLISTS_URL)
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

  async fetchLibraryPlaylistTracks(id: string, params = {}) {
    try {
      const url = new URL(LIBRARY_PLAYLISTS_URL + `/${id}/tracks`)
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

  async fetchAndProcessPlaylists(offset: number) {
    try {
      const playlistsResponse = await playlistService.fetchLibraryPlaylists({
        platform: 'web',
        limit: 100,
        offset: offset,
        extend: 'artistUrl',
        art: { f: 'url' },
        include: 'catalog,artists'
      })

      let allPlaylists = playlistsResponse.data

      // Check if additional playlists need to be fetched
      if (playlistsResponse.next) {
        const additionalPlaylists = await playlistService.fetchAdditionalPlaylists(
          offset + 100
        )
        allPlaylists = allPlaylists.concat(additionalPlaylists)
      }

      // Fetch tracks for each playlist
      const playlistsWithTracks = await playlistService.fetchTracksForPlaylists(
        allPlaylists
      )

      console.log('playlistsWithTracks', playlistsWithTracks)
      return playlistsWithTracks
    } catch (error) {
      console.error('Error fetching playlists:', error)
    }
  },

  async fetchAdditionalPlaylists(offset: number, accumulatedPlaylists = []) {
    const response = await playlistService.fetchLibraryPlaylists({
      platform: 'web',
      limit: 100,
      offset: offset,
      extend: 'artistUrl',
      art: { f: 'url' },
      include: 'catalog,artists'
    })

    const newPlaylists = accumulatedPlaylists.concat(response.data)

    if (response.next) {
      return playlistService.fetchAdditionalPlaylists(offset + 100, newPlaylists)
    } else {
      return newPlaylists
    }
  },

  async fetchTracksForPlaylist(playlistId, offset = 0, accumulatedTracks = []) {
    const response = await playlistService.fetchLibraryPlaylistTracks(playlistId, {
      platform: 'web',
      limit: 100,
      offset: offset,
      include: 'catalog,artists,[tracks]=artists'
    })

    const newTracks = accumulatedTracks.concat(response.data)

    if (response.next) {
      return playlistService.fetchTracksForPlaylist(playlistId, offset + 100, newTracks)
    } else {
      return newTracks
    }
  },

  async fetchTracksForPlaylists(playlists) {
    const playlistsWithTracks = await Promise.all(
      playlists.map(async playlist => {
        const tracks = await playlistService.fetchTracksForPlaylist(playlist.id)
        return {
          ...playlist,
          relationships: { ...playlist.relationships, tracks: { data: tracks } }
        }
      })
    )

    return playlistsWithTracks
  }
}
