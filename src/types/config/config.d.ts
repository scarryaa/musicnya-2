export type ArtistCatalogEndpoint = (countryCode: string, artistId: string) => string
export type AlbumCatalogEndpoint = (countryCode: string, albumId: string) => string
export type RemoveFromLibraryEndpoint = (
  id: string,
  type: MusicKit.MediaItemType
) => string
export type CatalogEndpoint = (countryCode: string, type: string) => string
type CatalogFromLibraryEndpoint = (
  countryCode: string,
  type: string,
  id: string
) => string
type LibraryFromCatalogEndpoint = (
  countryCode: string,
  type: string,
  id: string
) => string
type SongCatalogEndpoint = (countryCode: string, songId: string) => string

export interface ApiEndpoints {
  artistCatalog: ArtistCatalogEndpoint
  favorites: string
  libraryArtists: string
  baseLibrary: string
  catalog: CatalogEndpoint
  baseCatalog: string
  libraryAlbums: string
  albumCatalog: AlbumCatalogEndpoint
  albumCatalogFromLibrary: AlbumCatalogEndpoint
  removeFromLibrary: RemoveFromLibraryEndpoint
  baseRatings: string
  ratingsCatalog: (id: string, type: string) => string
  catalogFromLibrary: CatalogFromLibraryEndpoint
  libraryFromCatalog: LibraryFromCatalogEndpoint
  songCatalog: SongCatalogEndpoint
  recentSongs: string
  recentlyAdded: string
}

export interface BaseQueryParams {
  l: string
  platform: string
}

export interface ArtistQueryParams extends BaseQueryParams {
  include: string
  views: string
  extend: string
  'extend[playlists]': string
  'art[url]': string
  'include[songs]': string
  'fields[albums]': string
  'limit[artists:top-songs]': string
  'fields[artists]': string
}

export interface AlbumQueryParams extends BaseQueryParams {
  include: string
  'fields[artists]': string
  fields: string
}

export interface Constants {
  maxTopSongs: number
  defaultTooltipDelay: number
}
