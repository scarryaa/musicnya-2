import { PlayParams } from './common'

interface LyricsResponse {
  data: LyricsData[]
}

interface LyricsData {
  attributes: LyricsAttributes
  id: string
  type: string
}

interface LyricsAttributes {
  ttml: string
  playParams: PlayParams
}
