import { Artwork, Description } from './common'

interface PlaylistResponse {
  data: PlaylistData[]
}

interface PlaylistData {
  attributes: PlaylistAttributes
  id: string
  type: string
}

interface PlaylistAttributes {
  artwork: Artwork
  curatorName: string
  description: Description
  lastModifiedDate: string
  name: string
  playlistType: string
  url: string
}
