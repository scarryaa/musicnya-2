import { Utils } from '../../util/util'
import styles from './MediaItemDetailed.module.scss'

export const MediaItemDetailed = ({
  mediaItemId,
  src,
  title,
  artists,
  releaseDate,
  albums
}) => {
  return (
    <div class={styles.mediaItemDetailed}>
      <div class={styles.mediaItemDetailed__artwork}>
        <img src={src} />
      </div>
      <div class={styles.mediaItemDetailed__info}>
        <span class={styles.mediaItemDetailed__info__title}>{title}</span>
        <span class={styles.mediaItemDetailed__info__artists}>{artists}</span>
        {albums && <span class={styles.mediaItemDetailed__info__albums}>{albums}</span>}
        {releaseDate && (
          <span class={styles.mediaItemDetailed__info__releaseDate}>
            {Utils.formatDate(releaseDate)}
          </span>
        )}
      </div>
    </div>
  )
}
