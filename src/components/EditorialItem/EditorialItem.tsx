import { Utils } from '../../util/util'
import styles from './EditorialItem.module.scss'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { mkManager } from '../../api/MkManager'
import { createMemo } from 'solid-js'
import { EditorialInfoCard } from './Components/EditorialInfoCard'
import { ArtworkOverlay } from '../ArtworkOverlay/ArtworkOverlay'
import { ArtworkOverlayType } from '../ArtworkOverlay/Types'
import useHoverStates from '../../composables/useHoverStates'
import { Gradient } from './Components/Gradient'
import { Blurb } from './Components/Blurb'

export const EditorialItem = ({ item }: MusicKit.EditorialItem) => {
  const { openContextMenu } = useContextMenu()
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverStates()

  const childType = createMemo(
    () =>
      item.relationships?.children?.data?.[0]?.type ||
      item.relationships?.contents?.data?.[0]?.type
  )
  const isCuratorType = createMemo(
    () =>
      (item.attributes?.editorialElementKind === '320' && item.attributes.link) ||
      item.relationships?.contents?.data?.[0]?.type === 'apple-curators'
  )
  const childId = createMemo(
    () =>
      item.relationships?.children?.data?.[0]?.id ||
      item.relationships?.contents?.data?.[0]?.id
  )

  const artworkUrl = createMemo(() =>
    Utils.formatArtworkUrl(
      item.relationships.contents.data[0]?.attributes.editorialArtwork?.subscriptionHero
        ?.url ||
        item.relationships.contents.data[0]?.attributes.editorialArtwork?.superHeroWide
          ?.url ||
        item.attributes.artwork?.url ||
        '',
      1000,
      1000,
      'webp',
      'none'
    )
  )

  const handlePlayClick = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    mkManager.processItemAndPlay(childId(), childType()).catch(err => console.error(err))
  }

  return (
    <div
      class={styles['editorial-item']}
      onContextMenu={e =>
        openContextMenu(e, childId(), ContextMenuType.Editorial, childType())
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <EditorialInfoCard
        subtitle={
          item.relationships?.contents?.data?.[0]?.attributes?.artistName ||
          item.relationships?.contents?.data?.[0]?.attributes?.curatorName
        }
        title={item.relationships?.contents?.data?.[0]?.attributes?.name}
        designBadge={item.attributes.designBadge}
        designTag={item.attributes.designTag}
      />
      <div class={styles['editorial-item-image-container']}>
        <ArtworkOverlay
          isLink={true}
          type={isCuratorType() ? ArtworkOverlayType.NONE : ArtworkOverlayType.PLAY}
          link={
            isCuratorType()
              ? `/curator/${item.id}`
              : `/media/${childType()}/${item.relationships?.contents?.data?.[0]?.id}`
          }
          isVisible={isHovered}
          playClick={handlePlayClick}
          onFocus={onMouseEnter}
          onBlur={onMouseLeave}
        >
          <Gradient />
          <Blurb
            blurb={
              item.relationships?.contents?.data?.[0]?.attributes?.plainEditorialNotes
                ?.short
            }
          />
          <img
            class={styles['editorial-item-image-container-image']}
            src={artworkUrl()}
            alt={
              item.relationships?.contents?.data?.[0]?.attributes?.name ||
              item.attributes.designTag
            }
          />
        </ArtworkOverlay>
      </div>
    </div>
  )
}
