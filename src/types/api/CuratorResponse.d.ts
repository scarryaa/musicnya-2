import { Artwork, EditorialNotes } from './common'

interface CuratorResponse {
  data: Curator[]
}

interface Curator {
  id: string
  type: 'curators'
  attributes: CuratorAttributes
}

interface CuratorAttributes {
  artwork: Artwork
  editorialNotes: EditorialNotes
  name: string
  url: string
}
