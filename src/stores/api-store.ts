import { createResource } from 'solid-js'
import * as config from '../../config.json'
import { fetchRecommendations } from '../api/home'
import { fetchAlbum, fetchLibraryAlbum } from '../api/album'
import { fetchLibraryPlaylist, fetchPlaylist } from '../api/playlist'
import { fetchStation } from '../api/station'

export const createStationStore = () => {
  return function (params: { id: string }) {
    const [data] = createResource(
      () => params.id,
      async () =>
        await fetchStation({
          devToken: config.MusicKit.token,
          musicUserToken: MusicKit.getInstance()?.musicUserToken,
          id: params.id
        })
    )

    return data
  }
}

export const createHomeStore = () => {
  return function () {
    const [data] = createResource<
      any,
      {
        devToken: string
        musicUserToken: string
      },
      string
    >(
      {
        devToken: config.MusicKit.token,
        musicUserToken: config.MusicKit.musicUserToken
      },
      fetchRecommendations
    )

    return data
  }
}

export const createAlbumStore = () => {
  return function (params: { id: string }) {
    const [data] = createResource(
      () => params.id,
      async () =>
        await (params.id.startsWith('l.') ? fetchLibraryAlbum : fetchAlbum)({
          devToken: config.MusicKit.token,
          musicUserToken: MusicKit.getInstance()?.musicUserToken,
          id: params.id
        })
    )

    return data
  }
}

export const createPlaylistStore = () => {
  return function (params: { id: string }) {
    const [data] = createResource<
      any,
      {
        devToken: string
        musicUserToken: string
        id: string
      },
      string
    >(
      {
        devToken: config.MusicKit.token,
        musicUserToken: MusicKit.getInstance()?.musicUserToken,
        id: params.id
      },
      params.id.substring(0, 2) === 'pl' ? fetchPlaylist : fetchLibraryPlaylist
    )

    return data
  }
}
