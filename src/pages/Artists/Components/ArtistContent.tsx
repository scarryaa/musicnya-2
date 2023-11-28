import { MediaItem } from '../../../components/MediaItem/MediaItem'
import { store } from '../../../stores/store'
import { Album } from '../../../types/api/ItemResponse'
import { MediaItemType } from '../../../types/types'
import { Utils } from '../../../util/util'
import styles from './ArtistContent.module.scss'

type ArtistContentProps = {
  selectedArtistId: () => string
}

export const ArtistContent = ({ selectedArtistId }: ArtistContentProps) => {
  return (
    <div class={styles['artist-content']}>
      {(store.library.albums as Album[])
        .filter(album => album.relationships.artists.data[0].id === selectedArtistId())
        .map(album => (
          <MediaItem
            id={album.id}
            title={album.attributes.name}
            artistId={
              album.relationships.artists.data[0].relationships.catalog.data[0].id
            }
            artists={[album.attributes.artistName]}
            src={Utils.formatArtworkUrl(
              album.relationships.catalog.data[0].attributes.artwork.url,
              150
            )}
            type={MediaItemType.Albums}
          ></MediaItem>
        ))}
    </div>
  )
}
