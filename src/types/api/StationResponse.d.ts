import { Artwork, EditorialNotes, PlayParams, Preview } from './common'

interface StationResponse {
  data: StationData[]
}

interface StationData {
  attributes: StationAttributes
  relationships: StationRelationships
  id: string
  type: string
}

interface StationAttributes {
  artwork: Artwork
  durationInMillis: number
  editorialNotes: EditorialNotes
  episodeNumber: number
  isLive: boolean
  name: string
  playParams: PlayParams
  previews: Preview[]
  releaseDate: string
  trackNumber: number
  url: string
}

interface StationRelationships {
  contents: Content
}

interface Content {
  data: ContentData[]
}

interface ContentData {
  attributes: ContentAttributes
  id: string
  type: string
}

interface ContentAttributes {
  artwork: Artwork
  artistName: string
  durationInMillis: number
  name: string
  playParams: PlayParams
  previews: Preview[]
  releaseDate: string
  trackNumber: number
  url: string
  isrc: string
}
