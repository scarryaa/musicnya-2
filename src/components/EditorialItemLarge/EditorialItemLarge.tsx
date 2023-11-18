import { A } from '@solidjs/router'
import { Utils } from '../../util/util'
import styles from './EditorialItemLarge.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { mkController } from '../../api/mkController'
import { createSignal } from 'solid-js'
import { contextMenu, handleMoreClick } from './EditorialItemLargeContextMenu'

export const EditorialItemLarge = ({ item }) => {
  console.log(item)
  const editorialCard = item.meta.editorialCard

  const [isLoved, setIsLoved] = createSignal(false)
  const [isDisliked, setIsDisliked] = createSignal(false)
  const [inLibrary, setInLibrary] = createSignal(false)
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(item.id, item.type, isLoved(), inLibrary(), isDisliked())
  )

  const handlePlayClick = e => {
    e.preventDefault()
    mkController.playMediaItem(item.id, item.type)
  }

  return (
    <div
      class={styles.editorialItemLarge}
      onContextMenu={e =>
        handleMoreClick(
          e,
          item.id,
          item.type,
          isLoved,
          setIsLoved,
          inLibrary,
          setInLibrary,
          isDisliked,
          setIsDisliked,
          contextMenuItems,
          setContextMenuItems
        )
      }
    >
      <div class={styles.editorialItemLarge__info}>
        <div class={styles.editorialItemLarge__info__title}>{item.attributes.name}</div>
      </div>
      <div class={styles.editorialItemLarge__thumbnail}>
        <A
          class={styles.editorialItemLarge__thumbnail__overlay}
          href={`/media/${item.type}/${item.id}`}
        >
          <div
            class={styles.editorialItemLarge__thumbnail__overlay__playButton}
            onClick={handlePlayClick}
          >
            <Fa icon={faPlay} size="1x" />
          </div>

          <div
            class={styles.editorialItemLarge__thumbnail__overlay__moreButton}
            onClick={e =>
              handleMoreClick(
                e,
                item.id,
                item.type,
                isLoved,
                setIsLoved,
                inLibrary,
                setInLibrary,
                isDisliked,
                setIsDisliked,
                contextMenuItems,
                setContextMenuItems
              )
            }
          >
            <Fa icon={faEllipsisH} size="1x" />
          </div>
        </A>
        <div class={styles.editorialItemLarge__thumbnail__gradient}></div>
        <img
          src={Utils.formatArtworkUrl(
            item.attributes.plainEditorialCard[
              editorialCard
            ].editorialArtwork.superHeroWide.url.replace('sr', ''),
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
