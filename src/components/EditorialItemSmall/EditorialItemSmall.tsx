import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { Utils } from '../../util/util'
import styles from './EditorialItemSmall.module.scss'
import Fa from 'solid-fa'
import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'
import {
  contextMenu,
  handleContextMenu,
  handleMoreClick
} from './EditorialItemSmallContextMenu'

export const EditorialItemSmall = ({ item }) => {
  const showMoreButton = !item.attributes?.link?.label
  console.log(item)

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

  const [isLoved, setIsLoved] = createSignal(false)
  const [isDisliked, setIsDisliked] = createSignal(false)
  const [inLibrary, setInLibrary] = createSignal(false)
  const [isStation, setIsStation] = createSignal(childType === 'stations')
  const [isPlaylist, setIsPlaylist] = createSignal(childType === 'playlists')
  const [isCurator, setIsCurator] = createSignal(isCuratorType)
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(
      childId,
      childType,
      isLoved(),
      inLibrary(),
      isDisliked(),
      isStation(),
      isPlaylist(),
      isCurator()
    )
  )

  return (
    <div
      class={styles.editorialItemSmall}
      onContextMenu={e =>
        handleContextMenu(
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
          setContextMenuItems,
          isStation,
          setIsStation,
          isPlaylist,
          setIsPlaylist,
          isCurator,
          setIsCurator
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
              onClick={e => {
                e.stopImmediatePropagation()
                e.preventDefault()
                e.stopPropagation()
                handleMoreClick(
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
                  setContextMenuItems,
                  isStation,
                  setIsStation,
                  isPlaylist,
                  setIsPlaylist,
                  isCurator,
                  setIsCurator
                )
              }}
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
