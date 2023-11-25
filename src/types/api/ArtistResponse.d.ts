import { EditorialNotes } from './common'

interface ArtistResponse {
  data: ArtistData[]
}

interface ArtistData {
  attributes: ArtistAttributes
  id: string
  type: string
}

interface ArtistAttributes {
  editorialNotes: EditorialNotes
  genreNames: string[]
  name: string
  url: string
}
