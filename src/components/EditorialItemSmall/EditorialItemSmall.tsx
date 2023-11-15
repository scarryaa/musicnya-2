import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { Utils } from '../../util/util'
import styles from './EditorialItemSmall.module.scss'
import Fa from 'solid-fa'
import { A } from '@solidjs/router'

export const EditorialItemSmall = ({ item }) => {
  const showMoreButton = !item.attributes?.link?.label

  return (
    <div class={styles.editorialItemSmall}>
      <div class={styles.editorialItemSmall__imageContainer}>
        <A
          activeClass=""
          class={styles.editorialItemSmall__imageContainer__overlay}
          href={item.attributes?.link?.url || '#'}
          target="_blank"
        >
          {showMoreButton && (
            <div class={styles.editorialItemSmall__imageContainer__overlay__moreButton}>
              <Fa icon={faEllipsisH} size="1x" />
            </div>
          )}
        </A>
        <img
          class={styles.editorialItemSmall__imageContainer__image}
          src={Utils.formatArtworkUrl(
            item.attributes?.artwork?.url ||
              item.relationships?.contents?.data?.[0]?.attributes?.editorialArtwork
                ?.subscriptionHero?.url,
            1000,
            'webp',
            'none'
          )}
        />
      </div>
      <div class={styles.editorialItemSmall__title}>
        {item.attributes?.designTag ||
          item.relationships?.contents?.data?.[0]?.attributes?.name}
      </div>
    </div>
  )
}
