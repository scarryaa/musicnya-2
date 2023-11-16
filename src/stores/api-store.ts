import { createEffect, createResource, createSignal } from 'solid-js'
import * as config from '../../config.json'
import { fetchRecommendations } from '../api/home'
import { fetchAlbum, fetchLibraryAlbum } from '../api/album'
import { fetchLibraryPlaylist, fetchPlaylist } from '../api/playlist'
import { fetchStation } from '../api/station'
import { fetchBrowse } from '../api/browse'
import { fetchRadio } from '../api/radio'
import { fetchVideo } from '../api/video'
import { fetchRecentlyAdded } from '../api/recentlyAdded'

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

export const createVideoStore = () => {
  return function (params: { id: string }) {
    const [data] = createResource(
      () => params.id,
      async () =>
        await fetchVideo({
          devToken: config.MusicKit.token,
          musicUserToken: MusicKit.getInstance()?.musicUserToken,
          id: params.id
        })
    )

    return data
  }
}

export const createRecentlyAddedStore = () => {
  return function () {
    const [resourceData, { refetch }] = createResource<
      any,
      {
        devToken: string
        musicUserToken: string
      },
      string
    >(
      {
        devToken: config.MusicKit.token,
        musicUserToken: MusicKit.getInstance()?.musicUserToken
      },
      fetchRecentlyAdded
    )

    const [fullData, setFullData] = createSignal([])

    createEffect(() => {
      const data = resourceData()
      if (data) {
        setFullData(data.data)
      }
    })

    const appendData = newData => {
      setFullData(currentData => [...currentData, ...newData])
    }

    return { data: fullData, appendData, refetch }
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

export const createBrowseStore = () => {
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
        musicUserToken: MusicKit.getInstance()?.musicUserToken
      },
      fetchBrowse
    )

    return data
  }
}

export const createRadioStore = () => {
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
        musicUserToken: MusicKit.getInstance()?.musicUserToken
      },
      fetchRadio
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
