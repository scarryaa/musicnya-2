import { A } from '@solidjs/router'
import { Utils } from '../../util/util'
import styles from './EditorialItemLarge.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'

export const EditorialItemLarge = ({ item }) => {
  const editorialCard = item.meta.editorialCard
  console.log(item)

  return (
    <div class={styles.editorialItemLarge}>
      <div class={styles.editorialItemLarge__info}>
        <div class={styles.editorialItemLarge__info__title}>{item.attributes.name}</div>
      </div>
      <div class={styles.editorialItemLarge__thumbnail}>
        <A
          class={styles.editorialItemLarge__thumbnail__overlay}
          href={`/media/${item.type}/${item.id}`}
        >
          <div class={styles.editorialItemLarge__thumbnail__overlay__playButton}>
            <Fa icon={faPlay} size="1x" />
          </div>

          <div class={styles.editorialItemLarge__thumbnail__overlay__moreButton}>
            <Fa icon={faEllipsisH} size="1x" />
          </div>
        </A>
        <div class={styles.editorialItemLarge__thumbnail__gradient}></div>
        <img
          src={Utils.formatArtworkUrl(
            item.attributes.plainEditorialCard[editorialCard].editorialArtwork
              .superHeroWide.url,
            1000,
            'webp',
            'none'
          )}
        />
      </div>
      <div class={styles.editorialItemLarge__thumbnail__blurb}>
        <div class={styles.editorialItemLarge__thumbnail__blurb__blurb}>
          {item.attributes.plainEditorialNotes?.short}
        </div>
      </div>
    </div>
  )
}
