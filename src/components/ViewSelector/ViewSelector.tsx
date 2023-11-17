import { Utils } from '../../util/util'
import { ArtistItem } from '../ArtistItem/ArtistItem'
import { MediaItem } from '../MediaItem/MediaItem'
import { SongItem } from '../SongItem/SongItem'
import { VideoItem } from '../VideoItem/VideoItem'

export const ViewSelector = ({ item, title }) => {
  console.log(item)
  switch (item.type) {
    case 'artists':
      return <ArtistItem item={item} />
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
      return (
        <SongItem
          item={item}
          album={item.attributes.albumName}
          albumId={item.relationships?.albums.data[0].id}
        />
      )
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
