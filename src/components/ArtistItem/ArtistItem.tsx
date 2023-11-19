import { A } from '@solidjs/router'
import { Utils } from '../../util/util'
import styles from './ArtistItem.module.scss'

export const ArtistItem = ({ item }) => {
  return (
    <A class={styles.artistItem} href={`/media/artists/${item.id}`} activeClass="">
      <div class={styles.artistItem__artwork__container}>
        <div class={styles.artistItem__artwork__container__overlay}></div>
        <img
          class={styles.artistItem__artwork__container__artwork}
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 200, 200, 'webp')}
        />
      </div>
      <div class={styles.artistItem__name}>{item.attributes.name}</div>
    </A>
  )
}
