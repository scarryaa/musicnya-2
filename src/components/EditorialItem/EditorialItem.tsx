import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import styles from './EditorialItem.module.scss'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'

export const EditorialItem = ({ item }) => {
  const childType =
    item.relationships?.children?.data?.[0]?.type ||
    item.relationships?.contents?.data?.[0]?.type
  const isCuratorType =
    (item.attributes?.editorialElementKind === '320' && item.attributes.link) ||
    item.relationships?.contents?.data?.[0]?.type === 'apple-curators'
  const childId =
    item.relationships?.children?.data?.[0]?.id ||
    item.relationships?.contents?.data?.[0]?.id

  const { openContextMenu } = useContextMenu()

  const handlePlayClick = e => {
    e.preventDefault()
    e.stopPropagation()
    mkManager.processItemAndPlay(childId, childType)
  }

  return (
    <div
      class={styles['editorial-item']}
      onContextMenu={e =>
        openContextMenu(e, childId, ContextMenuType.Editorial, childType)
      }
    >
      <div>
        <span class={styles['editorial-item__designBadge']}>
          {item.attributes.designBadge}
        </span>
        {item.attributes.designTag ? (
          <div class={styles['editorial-item__designTag']}>
            {item.attributes.designTag}
          </div>
        ) : (
          <>
            <div class={styles['editorial-item__title']}>
              {item.relationships?.contents?.data?.[0]?.attributes?.name}
            </div>
            <div class={styles['editorial-item__subtitle']}>
              {item.relationships?.contents?.data?.[0]?.attributes?.artistName ||
                item.relationships?.contents?.data?.[0]?.attributes?.curatorName}
            </div>
          </>
        )}
      </div>
      <div class={styles['editorial-item__image__container']}>
        <div class={styles['editorial-item__image__container__gradient']}></div>
        <A
          class={styles['editorial-item__image__container__overlay']}
          href={
            isCuratorType
              ? `/curator/${item.id}`
              : `/media/${childType}/${item.relationships?.contents?.data?.[0]?.id}`
          }
        >
          {!isCuratorType && (
            <div
              class={styles['editorial-item__image__container__overlay__playButton']}
              onClick={handlePlayClick}
            >
              <Fa icon={faPlay} size="1x" />
            </div>
          )}
        </A>
        <div class={styles['editorial-item__image__container__blurb__container']}>
          <span
            class={styles['editorial-item__image__container__blurb__container__blurb']}
          >
            {
              item.relationships?.contents?.data?.[0]?.attributes?.plainEditorialNotes
                ?.short
            }
          </span>
        </div>
        <img
          class={styles['editorial-item__image__container__image']}
          src={Utils.formatArtworkUrl(
            item.relationships.contents.data[0]?.attributes.editorialArtwork
              ?.subscriptionHero?.url ||
              item.relationships.contents.data[0]?.attributes.editorialArtwork
                ?.superHeroWide?.url ||
              item.attributes.artwork?.url,
            1000,
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
