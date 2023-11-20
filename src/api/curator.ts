import { store } from '../stores/store'

export const fetchCuratorDetailed = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/catalog/${store.countryCode}/apple-curators/${id}?l=en-US&platform=web&include=audio-analysis,genres,artists,albums,library,lyrics&extend=editorialArtwork,editorialVideo,lyricsExcerpt`,
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
