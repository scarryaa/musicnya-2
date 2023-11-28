import { A } from '@solidjs/router'
import { Utils } from '../../util/util'
import styles from './ArtistItem.module.scss'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { ArtworkOverlay } from '../ArtworkOverlay/ArtworkOverlay'
import useHoverStates from '../../composables/useHoverStates'
import { ArtworkOverlayType } from '../ArtworkOverlay/Types'

type ArtistItemProps = {
  item: MusicKit.Resource
}

export const ArtistItem = ({ item }: ArtistItemProps) => {
  const { openContextMenu } = useContextMenu()
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverStates()

  return (
    <A
      class={styles['artist-item']}
      href={`/media/artists/${item.id}`}
      activeClass=""
      onContextMenu={e => openContextMenu(e, item.id, ContextMenuType.Artist, null)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div class={styles['artist-item__artwork__container']}>
        <ArtworkOverlay
          isLink={false}
          type={ArtworkOverlayType.NONE}
          rounded={true}
          isVisible={isHovered}
        >
          <img
            class={styles['artist-item__artwork__container__artwork']}
            src={Utils.formatArtworkUrl(item.attributes.artwork.url, 200, 200, 'webp')}
          />
        </ArtworkOverlay>
      </div>
      <div class={styles['artist-item__name']}>{item.attributes.name}</div>
    </A>
  )
}
