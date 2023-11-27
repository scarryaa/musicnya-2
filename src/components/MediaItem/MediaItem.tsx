import styles from './MediaItem.module.scss'
import { A } from '@solidjs/router'
import Tooltip from '../Tooltip/Tooltip'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType, MediaItemType } from '../../types/types'
import useMediaItem from '../../composables/useMediaItem'
import { ArtworkOverlay, ArtworkOverlayType } from '../ArtworkOverlay/ArtworkOverlay'

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
  const { newArtistId, handlePlayClick } = useMediaItem(type, id, artistId)

  const isAppleCurator = type === 'apple-curators'
  type === 'library-playlists' ? (type = MediaItemType.Playlists) : type

  return (
    <div
      class={styles['media-item']}
      data-id={id}
      data-testid="media-item"
      onContextMenu={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
    >
      <div class={styles['media-item__inner']}>
        <div class={styles['media-item__inner__artwork']}>
          <ArtworkOverlay
            type={
              isAppleCurator ? ArtworkOverlayType.MORE : ArtworkOverlayType.PLAY_AND_MORE
            }
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
        <div class={styles['media-item__inner__info']}>
          <div
            class={styles['media-item__inner__info__title']}
            use:Tooltip={['bottom', title, true, 500]}
          >
            {title}
          </div>
          <div class={styles['media-item__inner__info__artists']}>
            {releaseYear && (
              <span class={styles['media-item__inner__info__artists__year']}>
                {releaseYear}
              </span>
            )}
            {artists !== null && (
              <A
                activeClass=""
                data-testid="artist-link"
                class={styles['media-item__inner__info__artists__link']}
                href={`/media/artists/${newArtistId()}`}
              >
                <span use:Tooltip={['bottom', artists.join(', '), true, 500]}>
                  {artists.join(', ')}
                </span>
              </A>
            )}
            {curator &&
              (curatorId ? (
                <A
                  activeClass=""
                  class={styles['media-item__inner__info__curator-link']}
                  href={`/media/artists/${curatorId}`}
                >
                  <span use:Tooltip={['bottom', curator, true, 500]}>{curator}</span>
                </A>
              ) : (
                <span
                  use:Tooltip={['bottom', curator, true, 500]}
                  class={styles['media-item__inner__info__curator']}
                >
                  {curator}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
