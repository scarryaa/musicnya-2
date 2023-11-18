import { Utils } from '../../util/util'
import styles from './QueueItem.module.scss'

export const QueueItem = ({ item }) => {
  return (
    <div class={styles.queueItem}>
      <img
        class={styles.queueItem__artwork}
        src={Utils.formatArtworkUrl(item.attributes.artwork.url, 40, 'webp', 'sr')}
      />
      <div class={styles.queueItem__info}>
        <span class={styles.queueItem__info__title}>{item.attributes.name}</span>
        <span class={styles.queueItem__info__artist}>{item.attributes.artistName}</span>
      </div>
    </div>
  )
}
