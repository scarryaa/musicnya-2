import { Utils } from '../../util/util'
import styles from './EditorialItem.module.scss'

export const EditorialItem = ({ item }) => {
  return (
    <div class={styles.editorialItem}>
      <div>
        <span class={styles.editorialItem__designBadge}>
          {item.attributes.designBadge}
        </span>
        {item.attributes.designTag ? (
          <div class={styles.editorialItem__designTag}>{item.attributes.designTag}</div>
        ) : (
          <>
            <div class={styles.editorialItem__title}>
              {item.relationships?.contents?.data?.[0]?.attributes?.name}
            </div>
            <div class={styles.editorialItem__subtitle}>
              {item.relationships?.contents?.data?.[0]?.attributes?.artistName ||
                item.relationships?.contents?.data?.[0]?.attributes?.curatorName}
            </div>
          </>
        )}
      </div>
      <div class={styles.editorialItem__image__container}>
        <div class={styles.editorialItem__image__container__overlay}></div>
        <img
          class={styles.editorialItem__image__container__image}
          src={Utils.formatArtworkUrl(
            item.relationships.contents.data[0]?.attributes.editorialArtwork
              ?.subscriptionHero?.url ||
              item.relationships.contents.data[0]?.attributes.editorialArtwork
                ?.superHeroWide?.url ||
              item.attributes.artwork?.url,
            1000,
            'webp',
            'none'
          )}
          alt=""
        />
      </div>
    </div>
  )
}
