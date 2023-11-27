import { A } from '@solidjs/router'
import { Utils } from '../../util/util'
import styles from './ArtistItem.module.scss'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'

type ArtistItemProps = {
  item: MusicKit.Resource
}

export const ArtistItem = ({ item }: ArtistItemProps) => {
  const { openContextMenu } = useContextMenu()

  return (
    <A
      class={styles['artist-item']}
      href={`/media/artists/${item.id}`}
      activeClass=""
      onContextMenu={e => openContextMenu(e, item.id, ContextMenuType.Artist, null)}
    >
      <div class={styles['artist-item__artwork__container']}>
        <div class={styles.artistItem__artwork__container__overlay}></div>
        <img
          class={styles['artist-item__artwork__container__artwork']}
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 200, 200, 'webp')}
        />
      </div>
      <div class={styles['artist-item__name']}>{item.attributes.name}</div>
    </A>
  )
}
