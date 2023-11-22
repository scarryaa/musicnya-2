import { A } from '@solidjs/router'
import { Utils } from '../../util/util'
import styles from './EditorialItemLarge.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { mkController } from '../../api/mkController'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'

// TODO check if context menu works
export const EditorialItemLarge = ({ item }) => {
  console.log(item)
  const editorialCard = item.meta.editorialCard

  const { openContextMenu } = useContextMenu()
  const handlePlayClick = e => {
    e.preventDefault()
    mkController.playMediaItem(item.id, item.type)
  }

  return (
    <div
      class={styles.editorialItemLarge}
      onContextMenu={e =>
        openContextMenu(e, item.id, ContextMenuType.Editorial, item.type)
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
              openContextMenu(e, item.id, ContextMenuType.Editorial, item.type)
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
