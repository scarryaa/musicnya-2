import { Artwork, EditorialNotes, PlayParams } from './common'

interface AlbumResponse {
  data: AlbumData[]
}

interface AlbumData {
  attributes: AlbumAttributes
  id: string
  type: string
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
