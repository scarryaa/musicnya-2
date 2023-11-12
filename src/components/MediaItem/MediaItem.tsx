import Fa from 'solid-fa'
import styles from './MediaItem.module.scss'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { A } from '@solidjs/router'

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
  const handlePlayClick = e => {
    e.preventDefault()
    mkController.playMediaItem(id, type)
  }

  const handleMoreClick = e => {
    e.preventDefault()
    console.log('more')
  }

  return (
    <div class={styles.mediaItem}>
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
              onClick={handleMoreClick}
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
