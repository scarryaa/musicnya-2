import {
  ApiEndpoints,
  BaseQueryParams,
  ArtistQueryParams,
  Constants,
  AlbumQueryParams
} from '../types/config/config'

export const API_ENDPOINTS: ApiEndpoints = {
  artistCatalog: (countryCode, artistId) => `catalog/${countryCode}/artists/${artistId}`,
  favorites: 'me/favorites',
  libraryArtists: 'me/library/artists',
  libraryAlbums: 'me/library/albums',
  baseLibrary: 'me/library',
  baseCatalog: 'catalog',
  recentlyAdded: 'me/library/recently-added',
  recentSongs: 'me/recent/played/tracks',
  songCatalog: (countryCode: string, songId: string) =>
    `catalog/${countryCode}/songs/${songId}`,
  catalog: (countryCode: string, type: string) => `catalog/${countryCode}/${type}`,
  libraryFromCatalog: (countryCode: string, type: string, id: string) =>
    `catalog/${countryCode}/${type}/${id}/library`,
  albumCatalog: (countryCode: string, albumId: string) =>
    `catalog/${countryCode}/albums/${albumId}`,
  albumCatalogFromLibrary: (countryCode: string, albumId: string) =>
    `me/library/albums/${albumId}/catalog`,
  catalogFromLibrary: (countryCode: string, type: string, id: string) =>
    `me/library/${type}/${id}/catalog`,
  removeFromLibrary: (id: string, type: 'songs' | 'albums' | 'playlists') =>
    `me/library/${type}/${id}`,
  baseRatings: 'me/ratings',
  ratingsCatalog: (id: string, type: string) => `me/ratings/${type}/${id}`
}

export const BASE_QUERY_PARAMS: BaseQueryParams = {
  l: 'en-US',
  platform: 'web'
}

export const ALBUM_QUERY_PARAMS: AlbumQueryParams = {
  ...BASE_QUERY_PARAMS,
  include: 'artists',
  fields: 'url,artwork,name,inLibrary',
  'fields[artists]': 'url,artwork,editorialArtwork,editorialNotes,genreNames,isGroup,name'
}

export const ARTIST_QUERY_PARAMS: ArtistQueryParams = {
  ...BASE_QUERY_PARAMS,
  include: 'albums,songs',
  views:
    'featured-release,full-albums,appears-on-albums,featured-albums,featured-on-albums,singles,compilation-albums,live-albums,latest-release,top-music-videos,similar-artists,top-songs,playlists,more-to-see',
  extend:
    'centeredFullscreenBackground,artistBio,bornOrFormed,editorialArtwork,editorialVideo,isGroup,origin,inFavorites,hero',
  'extend[playlists]': 'trackCount',
  'art[url]': 'f',
  'include[songs]': 'albums',
  'fields[albums]':
    'artistName,artistUrl,artwork,contentRating,editorialArtwork,editorialVideo,name,playParams,releaseDate,url,trackCount',
  'limit[artists:top-songs]': '20',
  'fields[artists]': 'url,artwork,editorialArtwork,editorialNotes,genreNames,isGroup,name'
}

export const CONSTANTS: Constants = {
  maxTopSongs: 20,
  defaultTooltipDelay: 500
}
