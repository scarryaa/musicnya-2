import { store } from '../stores/store'

export const fetchAlbum = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/catalog/${store.countryCode}/albums/${id}?art[url]=f&extend=editorialArtwork,editorialVideo,trackCount,extendedAssetUrls,offers&fields[artists]=name,url&fields[curators]=name&fields[record-labels]=name,url&include=record-labels,artists&include[music-videos]=artists&include[playlists]=curator&include[songs]=artists,composers,albums&l=en-US&meta[albums:tracks]=popularity&platform=web&views=appears-on,audio-extras,more-by-artist,other-versions,related-videos,video-extras,you-might-also-like`,
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

export const fetchLibraryAlbum = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/me/library/albums/${id}?art[url]=f&fields[artists]=name,url&includeOnly=catalog,artists,tracks&include[albums]=artists,tracks&include[library-albums]=artists,tracks&include[music-videos]=catalog,artists,tracks&l=en-US&platform=web`,
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

export const fetchAlbumDetailed = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/catalog/us/albums/${id}?l=en-US&l=en-US&platform=web&include=audio-analysis,genres,artists,albums,library&extend=editorialArtwork,editorialVideo`,
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

export const fetchLibraryAlbumDetailed = async ({
  devToken,
  musicUserToken,
  id
}: {
  devToken: string
  musicUserToken: string
  id: string
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/me/library/albums/${id}?art[url]=f&fields[artists]=name,url&includeOnly=catalog,artists,tracks&include[albums]=artists,tracks&include[library-albums]=artists,tracks&include[music-videos]=catalog,artists,tracks&l=en-US&platform=web`,
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
