export interface ApiResponse<T> {
  data: T[]
  meta?: object
}

export interface Artwork {
  bgColor: string
  height: number
  textColor1: string
  textColor2: string
  textColor3: string
  textColor4: string
  url: string
  width: number
}

export interface FetchOptions {
  headers?: HeadersInit &
    Record<string, string> & {
      noCache?: boolean
    }
  body?: BodyInit
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export interface EditorialNotes {
  short: string
}

export interface Content {
  data: ContentData[]
  href: string
}

export interface ContentData {
  attributes: ContentAttributes
  id: string
  type: string
}

export interface ContentAttributes {
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

export interface PlayParams {
  id: string
  kind: string
}

export interface Preview {
  url: string
}

export interface Station {
  data: StationData
}

export interface StationData {
  attributes: StationAttributes
  relationships: StationRelationships
  id: string
  type: string
}

export interface StationAttributes {
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

export interface StationRelationships {
  contents: Contents
}

export interface Contents {
  data: Content[]
}
