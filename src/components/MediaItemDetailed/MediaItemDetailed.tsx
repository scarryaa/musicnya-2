import { Accessor } from 'solid-js'
import { Utils } from '../../util/util'
import styles from './MediaItemDetailed.module.scss'

type MediaItemDetailedProps = {
  mediaItemId: string | Accessor<string>
  src: string
  title: string
  artists: string
  releaseDate?: string
  albums?: string
  circleArtwork?: boolean
}

export const MediaItemDetailed = ({
  mediaItemId,
  src,
  title,
  artists,
  releaseDate,
  albums,
  circleArtwork
}: MediaItemDetailedProps) => {
  return (
    <div class={styles['media-item-detailed']}>
      <div class={styles['media-item-detailed__artwork']}>
        <img src={src} style={{ 'border-radius': circleArtwork ? '50%' : '0' }} />
      </div>
      <div class={styles['media-item-detailed__info']}>
        <span class={styles['media-item-detailed__info__title']}>{title}</span>
        <span class={styles['media-item-detailed__info__artists']}>{artists}</span>
        {albums && (
          <span class={styles['media-item-detailed__info__albums']}>{albums}</span>
        )}
        {releaseDate && (
          <span class={styles['media-item-detailed__info__release-date']}>
            {Utils.formatDate(releaseDate)}
          </span>
        )}
      </div>
    </div>
  )
}
