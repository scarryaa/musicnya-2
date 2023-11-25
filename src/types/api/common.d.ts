import { Album, Artist, Playlist } from './ItemResponse'

interface ApiResponse<T> {
  data: T[]
  meta?: object
}

type DataItem = Artist | Album | Station | Playlist

interface Description {
  standard: string
}

interface Artwork {
  width: number
  url: string
  height: number
  textColor3?: string
  textColor2?: string
  textColor4?: string
  textColor1?: string
  bgColor?: string
  hasP3?: boolean
}

interface TrackOrArtistRelationship {
  href: string
  data: TrackOrArtistData[]
}

interface TrackOrArtistData {
  id: string
  type: string
  href: string
  attributes: TrackOrArtistAttributes
}

interface TrackOrArtistAttributes {
  inLibrary: boolean
  name: string
  artwork?: Artwork
  url: string
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
  id: string
  attributes: StationAttributes
  type: string
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
