import styles from './MediaItem.module.scss'
import { A } from '@solidjs/router'
import Tooltip from '../Tooltip/Tooltip'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType, MediaItemType } from '../../types/types'
import useMediaItem from '../../composables/useMediaItem'
import { ArtworkOverlay, ArtworkOverlayType } from '../ArtworkOverlay/ArtworkOverlay'
import { createMemo, createSignal } from 'solid-js'
import { store } from '../../stores/store'
import { MediaInfoCard } from '../MediaInfoCard/MediaInfoCard'

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
  const { openContextMenu } = useContextMenu()
  const [isHovering, setIsHovering] = createSignal(false)
  const { newArtistId, handlePlayClick } = useMediaItem(type, id, artistId)

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  const subtitleLink = createMemo(() =>
    releaseYear ? '#' : `/media/artists/${newArtistId()}`
  )
  const isAppleCurator = type === 'apple-curators'
  type === 'library-playlists' ? (type = MediaItemType.Playlists) : type

  return (
    <div
      class={styles['media-item']}
      data-id={id}
      data-testid="media-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
    >
      <div class={styles['media-item__inner']}>
        <div class={styles['media-item__inner__artwork']}>
          <ArtworkOverlay
            type={
              isAppleCurator ? ArtworkOverlayType.MORE : ArtworkOverlayType.PLAY_AND_MORE
            }
            isVisible={isHovering}
            isLink={true}
            link={isAppleCurator ? `/media/curators/${id}` : `/media/${type}/${id}`}
            playClick={handlePlayClick}
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
          subtitle={releaseYear?.toString() || artists.join(', ') || curator}
          subtitleLink={releaseYear ? '#' : subtitleLink}
          titleLink={isAppleCurator ? `/media/curators/${id}` : `/media/${type}/${id}`}
        />
      </div>
    </div>
  )
}
