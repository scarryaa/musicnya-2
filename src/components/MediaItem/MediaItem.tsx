import styles from './MediaItem.module.scss'
import Tooltip from '../Tooltip/Tooltip'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType, MediaItemType } from '../../types/types'
import useMediaItem from '../../composables/useMediaItem'
import { ArtworkOverlay } from '../ArtworkOverlay/ArtworkOverlay'
import { MediaInfoCard } from '../MediaInfoCard/MediaInfoCard'
import useHoverStates from '../../composables/useHoverStates'
import { ArtworkOverlayType } from '../ArtworkOverlay/Types'
import { createMemo } from 'solid-js'

export const MediaItem = ({
  src,
  title,
  artists,
  type,
  id,
  artistId,
  releaseYear,
  curator,
  curatorId
}: {
  src: string
  title?: string
  artists: string[]
  type: MediaItemType
  id: string
  artistId: string
  releaseYear?: number
  curator?: string
  curatorId?: string
}) => {
  Tooltip
  const { subtitleLink, handlePlayClick, isAppleCurator } = useMediaItem(
    type,
    id,
    artistId,
    releaseYear
  )
  const { openContextMenu } = useContextMenu()
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverStates()

  const link = createMemo(() =>
    isAppleCurator()
      ? `/media/curators/${curatorId}`
      : `/media/${type.replace('library-', '')}/${id}`
  )
  return (
    <div
      class={styles['media-item']}
      data-id={id}
      data-type={type}
      data-testid="media-item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onContextMenu={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
    >
      <div class={styles['media-item__inner']}>
        <div class={styles['media-item__inner__artwork']}>
          <ArtworkOverlay
            type={
              isAppleCurator()
                ? ArtworkOverlayType.MORE
                : ArtworkOverlayType.PLAY_AND_MORE
            }
            isVisible={isHovered}
            isLink={true}
            link={link()}
            playClick={handlePlayClick}
            onFocus={onMouseEnter}
            onBlur={onMouseLeave}
            moreClick={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
          >
            <img
              class={styles['media-item__inner__artwork__image']}
              src={src}
              alt={title}
            />
          </ArtworkOverlay>
        </div>
        <MediaInfoCard
          title={title}
          subtitle={releaseYear?.toString() || curator || artists?.join(', ')}
          subtitleLink={releaseYear ? '' : subtitleLink}
          titleLink={link()}
        />
      </div>
    </div>
  )
}
