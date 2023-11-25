import { Artwork, EditorialNotes, PlayParams, TrackOrArtistRelationship } from './common'

interface AlbumResponse {
  data: AlbumData[]
}

interface AlbumData {
  id: string
  type: string
  href: string
  attributes: AlbumAttributes
  relationships: AlbumRelationships
}

interface AlbumRelationships {
  tracks: TrackOrArtistRelationship
  artists: TrackOrArtistRelationship
}

interface AlbumAttributes {
  inLibrary: boolean
  name: string
  artwork: Artwork
  url: string
}

interface AlbumAttributes {
  artistName: string
  artwork: Artwork
  contentRating: string
  editorialNotes: EditorialNotes
  genreNames: string[]
  isComplete: boolean
  isSingle: boolean
  name: string
  playParams: PlayParams
  recordLabel: string
  releaseDate: string
  trackCount: number
  url: string
}
