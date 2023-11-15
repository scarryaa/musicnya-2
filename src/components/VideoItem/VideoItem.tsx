import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import styles from './VideoItem.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import { mkController } from '../../api/mkController'

export const VideoItem = ({ item }) => {
  const handlePlayClick = e => {
    e.preventDefault()
    mkController.playMediaItem(item.id, item.type)
  }

  return (
    <A class={styles.videoItem} href={`/media/videos/${item.id}`}>
      <div class={styles.videoItem__thumbnail}>
        <div class={styles.videoItem__thumbnail__overlay}>
          <div
            class={styles.videoItem__thumbnail__overlay__playButton}
            onClick={handlePlayClick}
          >
            <Fa icon={faPlay} size="1x" color="var(--color-white)" />
          </div>
          <div class={styles.videoItem__thumbnail__overlay__moreButton}>
            <Fa icon={faEllipsisH} size="1x" color="var(--color-white)" />
          </div>
        </div>
        <img
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 300, 'webp', 'none')}
        />
      </div>
      <div class={styles.videoItem__info}>
        <div class={styles.videoItem__info__title}>{item.attributes.name}</div>
      </div>
    </A>
  )
}
