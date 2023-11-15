import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import styles from './EditorialItem.module.scss'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { A } from '@solidjs/router'
import { contextMenu, handleContextMenu } from './EditorialItemContextMenu'
import { createSignal } from 'solid-js'

export const EditorialItem = ({ item }) => {
  console.log(item)
  const childType =
    item.relationships?.children?.data?.[0]?.type ||
    item.relationships?.contents?.data?.[0]?.type
  const isCuratorType =
    (item.attributes?.editorialElementKind === '320' && item.attributes.link) ||
    item.relationships?.contents?.data?.[0]?.type === 'apple-curators'
  const childId =
    item.relationships?.children?.data?.[0]?.id ||
    item.relationships?.contents?.data?.[0]?.id

  const [isLoved, setIsLoved] = createSignal(false)
  const [isDisliked, setIsDisliked] = createSignal(false)
  const [inLibrary, setInLibrary] = createSignal(false)
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(childId, childType, isLoved(), inLibrary(), isDisliked())
  )

  console.log(item)

  return (
    <div
      class={styles.editorialItem}
      onContextMenu={e =>
        isCuratorType
          ? null
          : handleContextMenu(
              e,
              childId,
              childType,
              isLoved,
              setIsLoved,
              isDisliked,
              setIsDisliked,
              inLibrary,
              setInLibrary,
              contextMenuItems,
              setContextMenuItems
            )
      }
    >
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
        <div class={styles.editorialItem__image__container__gradient}></div>
        <A
          class={styles.editorialItem__image__container__overlay}
          href={
            isCuratorType
              ? `/curator/${item.id}`
              : `/media/${childType}/${item.relationships?.contents?.data?.[0]?.id}`
          }
        >
          {!isCuratorType && (
            <div
              class={styles.editorialItem__image__container__overlay__playButton}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                mkController.playMediaItem(
                  item.relationships.contents.data[0].id,
                  childType,
                  item.relationships.contents.data[0]
                )
              }}
            >
              <Fa icon={faPlay} size="1x" />
            </div>
          )}
        </A>
        <div class={styles.editorialItem__image__container__blurb__container}>
          <span class={styles.editorialItem__image__container__blurb__container__blurb}>
            {
              item.relationships?.contents?.data?.[0]?.attributes?.plainEditorialNotes
                ?.short
            }
          </span>
        </div>
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
