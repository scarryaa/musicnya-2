import { Artist } from '../../../types/api/ItemResponse'
import { Utils } from '../../../util/util'
import styles from './ArtistListItem.module.scss'

type ArtistListItemProps = {
  artist: Artist
  selectedArtist: string
  handleArtistClick: (id: string) => void
}

export const ArtistListItem = ({
  artist,
  selectedArtist,
  handleArtistClick
}: ArtistListItemProps) => {
  return (
    <div
      class={styles['artist-list-item']}
      style={{
        'background-color': artist.id === selectedArtist ? 'var(--color-primary)' : ''
      }}
      onClick={() => handleArtistClick(artist.id)}
    >
      <div class={styles['artist-list-item-artwork']}>
        <img
          src={Utils.formatArtworkUrl(
            artist.relationships.catalog.data[0].attributes.artwork.url,
            100
          )}
        />
      </div>
      <div class={styles['artist-list-item-name']}>{artist.attributes.name}</div>
    </div>
  )
}
