import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { Utils } from '../../util/util'
import styles from './EditorialItemSmall.module.scss'
import Fa from 'solid-fa'
import { A } from '@solidjs/router'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'

export const EditorialItemSmall = ({ item }) => {
  const showMoreButton = !item.attributes?.link?.label

  const isCuratorType =
    item.attributes?.link ||
    (item.attributes?.editorialElementKind === '386' && item.attributes.link) ||
    item.relationships?.contents?.data?.[0]?.type === 'apple-curators'
  const childType =
    item.relationships?.children?.data?.[0]?.type ||
    item.relationships?.contents?.data?.[0]?.type
  const childId =
    item.relationships?.children?.data?.[0]?.id ||
    item.relationships?.contents?.data?.[0]?.id

  const { openContextMenu } = useContextMenu()

  return (
    <div
      class={styles.editorialItemSmall}
      onContextMenu={e =>
        openContextMenu(
          e,
          childId,
          ContextMenuType.Editorial,
          isCuratorType ? 'curators' : childType
        )
      }
    >
      <div class={styles.editorialItemSmall__imageContainer}>
        <A
          class={styles.editorialItemSmall__imageContainer__overlay}
          href={item.attributes?.link?.url || '/media/a'}
        >
          {showMoreButton && (
            <div
              class={styles.editorialItemSmall__imageContainer__overlay__moreButton}
              onClick={e =>
                openContextMenu(
                  e,
                  childId,
                  ContextMenuType.Editorial,
                  isCuratorType ? 'curators' : childType
                )
              }
            >
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
