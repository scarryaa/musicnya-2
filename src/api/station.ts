import { store } from '../stores/store'

export const fetchStation = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/catalog/${store.countryCode}/stations/${id}?art[url]=f&extend=editorialArtwork,editorialVideo,offers,trackCount&fields[albums]=name,artwork,playParams,url&fields[apple-curators]=name,url&fields[artists]=name,artwork,url&fields[curators]=name,url&fields[songs]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&include=tracks,curator&include[music-videos]=artists&include[songs]=artists&l=en-US&limit[tracks]=300&limit[view.contributors]=15&limit[view.featured-artists]=15&limit[view.more-by-curator]=15&omit[resource]=autos&platform=web&views=contributors,featured-artists,more-by-curator`,
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

export const fetchStationDetailed = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/catalog/us/stations/${id}?l=en-US&platform=web&include=audio-analysis,genres,artists,albums,library,lyrics&extend=editorialArtwork,editorialVideo,lyricsExcerpt`,
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
