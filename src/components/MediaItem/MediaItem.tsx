import Fa from 'solid-fa'
import styles from './MediaItem.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { A } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import Tooltip from '../Tooltip/Tooltip'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'

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
  const { openContextMenu } = useContextMenu()
  const isAppleCurator = type === 'apple-curators'

  const handlePlayClick = e => {
    e.preventDefault()
    console.log(id)
    mkController.playMediaItem(id, type)
  }

  return (
    <div
      class={styles.mediaItem}
      onContextMenu={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
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
              onClick={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
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
