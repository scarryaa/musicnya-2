import { A } from '@solidjs/router'
import { Utils } from '../../util/util'
import styles from './ArtistItem.module.scss'
import { createSignal } from 'solid-js'
import { contextMenu, handleContextMenu } from './ArtistItemContextMenu'

export const ArtistItem = ({ item }) => {
  const [isFavorited, setIsFavorited] = createSignal(false)
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(item.id, item.type, isFavorited)
  )

  return (
    <A
      class={styles.artistItem}
      href={`/media/artists/${item.id}`}
      activeClass=""
      onContextMenu={e =>
        handleContextMenu(
          e,
          item.id,
          item.type,
          isFavorited,
          setIsFavorited,
          contextMenuItems,
          setContextMenuItems
        )
      }
    >
      <div class={styles.artistItem__artwork__container}>
        <div class={styles.artistItem__artwork__container__overlay}></div>
        <img
          class={styles.artistItem__artwork__container__artwork}
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 200, 200, 'webp')}
        />
      </div>
      <div class={styles.artistItem__name}>{item.attributes.name}</div>
    </A>
  )
}
