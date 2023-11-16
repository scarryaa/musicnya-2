import { Utils } from '../../util/util'
import { MediaItem } from '../MediaItem/MediaItem'
import { SongItem } from '../SongItem/SongItem'
import { VideoItem } from '../VideoItem/VideoItem'

export const ViewSelector = ({ item, title }) => {
  switch (item.type) {
    case 'artists':
      return <div>artist</div>
    case 'albums':
      return (
        <MediaItem
          artistId={null}
          artists={null}
          releaseYear={item.attributes.releaseDate.slice(0, 4)}
          id={item.id}
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 300, 'webp', 'sr')}
          title={item.attributes.name}
          type="albums"
        />
      )
    case 'songs':
      return <SongItem item={item} />
    case 'playlists':
      return (
        <MediaItem
          artistId={null}
          artists={[item.attributes.artistName ?? item.attributes.curatorName]}
          id={item.id}
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 300, 'webp', 'sr')}
          title={item.attributes.name}
          type="playlists"
        />
      )
    case 'music-videos':
    case 'uploaded-videos':
    case 'music-movies':
      return <VideoItem item={item} />
  }
}
