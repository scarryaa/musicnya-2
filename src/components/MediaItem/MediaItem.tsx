import Fa from 'solid-fa'
import styles from './MediaItem.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { contextMenu, handleContextMenu, handleMoreClick } from './MediaItemContextMenu'

export const MediaItem = ({
  src,
  title,
  artists,
  type,
  id
}: {
  src: string
  title?: string
  artists: string[]
  type: string
  id: string
}) => {
  const [isLoved, setIsLoved] = createSignal(false)
  const [inLibrary, setInLibrary] = createSignal(type.includes('library'))
  const [isDisliked, setIsDisliked] = createSignal(false)
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(id, type, isLoved(), inLibrary(), isDisliked())
  )

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
            class={styles.mediaItem__inner__artwork__overlay}
            href={`/media/${type}/${id}`}
          >
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
          <div class={styles.mediaItem__inner__info__title}>{title}</div>
          <div class={styles.mediaItem__inner__info__artists}>
            <div>{artists.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}