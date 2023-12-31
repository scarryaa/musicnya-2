import { store } from '../stores/store'

export const fetchSongDetailed = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/catalog/${store.countryCode}/songs/${id}?l=en-US&platform=web&include=audio-analysis,genres,artists,albums,library,lyrics&extend=editorialArtwork,editorialVideo,lyricsExcerpt`,
    {
      headers: {
        authorization: `Bearer ${devToken}`,
        'music-user-token': musicUserToken
      }
    }
  )
    .then(async response => {
      return await (response.json() as Promise<Response>)
    })
    .catch(e => {
      console.error(e)
      return e
    })
}

export const fetchLibrarySongDetailed = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/me/library/songs/${id}/catalog?l=en-US&platform=web&fields[catalog]=name`,
    {
      headers: {
        authorization: `Bearer ${devToken}`,
        'music-user-token': musicUserToken
      }
    }
  )
    .then(async response => {
      const res = await response.json()
      const response2 = await fetchSongDetailed({
        devToken,
        musicUserToken,
        id: res.data[0].id
      })
      return response2
    })
    .catch(e => {
      console.error(e)
      return e
    })
}
