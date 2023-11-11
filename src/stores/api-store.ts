import { createResource } from 'solid-js'
import * as config from '../../config.json'
import { fetchRecommendations } from '../api/home'

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
