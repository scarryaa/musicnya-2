import Fa from 'solid-fa'
import styles from './MediaItem.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { contextMenu, handleContextMenu, handleMoreClick } from './MediaItemContextMenu'
import Tooltip from '../Tooltip/Tooltip'

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
  type: string
  id: string
  artistId: string
  releaseYear?: number
  curator?: string
  curatorId?: string
}) => {
  const [isLoved, setIsLoved] = createSignal(false)
  const [inLibrary, setInLibrary] = createSignal(type.includes('library'))
  const [isDisliked, setIsDisliked] = createSignal(false)
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(id, type, isLoved(), inLibrary(), isDisliked())
  )
  const isAppleCurator = type === 'apple-curators'

  const handlePlayClick = e => {
    e.preventDefault()
    mkController.playMediaItem(id, type)
  }

  return (
    <div
      class={styles.mediaItem}
      onContextMenu={e =>
        handleContextMenu(
          e,
          id,
          type,
          isLoved,
          setIsLoved,
          inLibrary,
          setInLibrary,
          isDisliked,
          setIsDisliked,
          contextMenuItems,
          setContextMenuItems
        )
      }
    >
      <div class={styles.mediaItem__inner}>
        <div class={styles.mediaItem__inner__artwork}>
          <A
            class={
              `${styles.mediaItem__inner__artwork__overlay}` +
              (isAppleCurator
                ? ` ${styles.mediaItem__inner__artwork__overlay__appleCurator}`
                : '')
            }
            href={`/media/${type}/${id}`}
          >
            {!isAppleCurator && (
              <div
                class={styles.mediaItem__inner__artwork__overlay__playButton}
                onClick={handlePlayClick}
              >
                <Fa
                  icon={faPlay}
                  size="1x"
                  color="white"
                  class={styles.mediaItem__inner__artwork__overlay__playButton__icon}
                />
              </div>
            )}
            <div
              class={styles.mediaItem__inner__artwork__overlay__moreButton}
              onClick={e =>
                handleMoreClick(
                  e,
                  id,
                  type,
                  isLoved,
                  setIsLoved,
                  inLibrary,
                  setInLibrary,
                  isDisliked,
                  setIsDisliked,
                  contextMenuItems,
                  setContextMenuItems
                )
              }
            >
              <Fa
                icon={faEllipsisH}
                size="1x"
                color="white"
                class={styles.mediaItem__inner__artwork__overlay__moreButton__icon}
              />
            </div>
          </A>
          <img src={src} />
        </div>
        <div class={styles.mediaItem__inner__info}>
          <div
            class={styles.mediaItem__inner__info__title}
            use:Tooltip={['bottom', title, true, 500]}
          >
            {title}
          </div>
          <div class={styles.mediaItem__inner__info__artists}>
            {releaseYear && (
              <span class={styles.mediaItem__inner__info__artists__year}>
                {releaseYear}
              </span>
            )}
            {artists !== null && (
              <A
                activeClass=""
                class={styles.mediaItem__inner__info__artists__link}
                href={`/media/artists/${artistId}`}
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
                  class={styles.mediaItem__inner__info__curator_link}
                  href={`/media/artists/${curatorId}`}
                >
                  <span use:Tooltip={['bottom', curator, true, 500]}>{curator}</span>
                </A>
              ) : (
                <span
                  use:Tooltip={['bottom', curator, true, 500]}
                  class={styles.mediaItem__inner__info__curator}
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
