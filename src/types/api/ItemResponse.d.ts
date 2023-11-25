import { AlbumAttributes } from './AlbumResponse'
import { ArtistAttributes } from './ArtistResponse'
import { PlaylistAttributes } from './PlaylistResponse'
import { StationAttributes } from './common'

interface Artist {
  id: string
  type: 'artists'
  attributes: ArtistAttributes
}

interface Album {
  id: string
  type: 'albums'
  attributes: AlbumAttributes
}

interface Station {
  id: string
  type: 'stations'
  attributes: StationAttributes
}

interface Playlist {
  id: string
  type: 'playlists'
  attributes: PlaylistAttributes
}
