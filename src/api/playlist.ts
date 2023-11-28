import { store } from '../stores/store'
import config from '../../config.json'

export const fetchPlaylist = async (id: string) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/catalog/us/playlists/${id}?l=en-US&l=en-US&platform=web&include=audio-analysis%2Cgenres%2Cartists%2Calbums%2Clibrary%2Clyrics&extend=editorialArtwork%2CeditorialVideo%2ClyricsExcerpt`,
    {
      headers: {
        authorization: `Bearer ${config.MusicKit.token}`,
        'music-user-token': config.MusicKit.musicUserToken
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

export const fetchMoreTracks = async ({
  devToken,
  musicUserToken,
  id,
  offset = 0
}: {
  devToken: string
  musicUserToken: string
  id: string
  offset?: number
}) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/catalog/us/playlists/${id}/tracks?offset=${offset}&l=en-US&platform=web&limit=100&include=albums`,
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
      throw e
    })
}

export const fetchLibraryPlaylist = async (id: string) => {
  return await fetch(
    `https://amp-api.music.apple.com/v1/me/library/playlists/${id}?art[url]=f&fields[songs]=artistUrl,artwork,durationInMillis,url&include=catalog,artists,tracks,fields&include[library-playlists]=catalog,tracks,fields,playlists&include[playlists]=curator&include[songs]=artists&l=en-US&omit[resource]=autos&platform=web`,
    {
      headers: {
        authorization: `Bearer ${config.MusicKit.token}`,
        'music-user-token': config.MusicKit.musicUserToken
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
