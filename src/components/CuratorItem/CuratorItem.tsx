import styles from './CuratorItem.module.scss'
import { Utils } from '../../util/util'
import { A } from '@solidjs/router'
import { ContextMenuType } from '../../types/types'
import useHoverStates from '../../composables/useHoverStates'
import { ArtworkOverlay } from '../ArtworkOverlay/ArtworkOverlay'
import { MediaInfoCard } from '../MediaInfoCard/MediaInfoCard'
import { ArtworkOverlayType } from '../ArtworkOverlay/Types'
import useNewContextMenu from '../../composables/useNewContextMenu'

export const CuratorItem = ({ item }) => {
  const { openNewContextMenu } = useNewContextMenu()
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverStates()

  //TODO add page for this
  return (
    <A
      activeClass=""
      class={styles['curator-item']}
      href={`/media/curators/${item.id}`}
      onContextMenu={e => openNewContextMenu(e, item.id, ContextMenuType.Curator, null)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div class={styles['curator-item__image']}>
        <ArtworkOverlay
          isLink={false}
          type={ArtworkOverlayType.MORE}
          onFocus={onMouseEnter}
          onBlur={onMouseLeave}
          isVisible={isHovered}
          moreClick={e => openNewContextMenu(e, item.id, ContextMenuType.Curator, null)}
        >
          <img
            src={Utils.formatArtworkUrl(item.attributes.artwork.url, 300, 300, 'webp')}
          />
        </ArtworkOverlay>
      </div>
      <MediaInfoCard
        title={item.attributes.name}
        subtitle={item.attributes.showHostName}
        titleLink={`/media/curators/${item.id}`}
        subtitleLink=""
      />
    </A>
  )
}
