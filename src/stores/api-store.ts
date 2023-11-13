import { createResource } from 'solid-js'
import * as config from '../../config.json'
import { fetchRecommendations } from '../api/home'
import { fetchAlbum, fetchLibraryAlbum } from '../api/album'

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
