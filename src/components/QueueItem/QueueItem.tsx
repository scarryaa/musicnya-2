import { A } from '@solidjs/router'
import { mkController } from '../../api/mkController'
import { store } from '../../stores/store'
import { Utils } from '../../util/util'
import styles from './QueueItem.module.scss'
import Tooltip from '../Tooltip/Tooltip'
import Fa from 'solid-fa'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { createSignal } from 'solid-js'
import { contextMenu, handleContextMenu } from './QueueItemContextMenu'

export const QueueItem = ({ item, index }) => {
  const [isLoved, setIsLoved] = createSignal(false)
  const [isDisliked, setIsDisliked] = createSignal(false)
  const [inLibrary, setInLibrary] = createSignal(false)
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(item.id, 'songs', isLoved(), inLibrary(), isDisliked())
  )

  const handleDoubleClick = e => {
    mkController.changeToIndex(index)
  }

  const handlePlayClick = e => {
    mkController.changeToIndex(index)
  }

  const handleAlbumClick = e => {
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
    mkController.getAlbumFromMediaItem(item.id, 'songs').then(
      res => {
        if (res) {
          store.app.navigate(`/media/albums/${res.data[0].id}`)
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  const handleArtistClick = e => {
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
    mkController.getArtistFromMediaItem(item.id, 'songs').then(
      res => {
        if (res) {
          store.app.navigate(`/media/artists/${res.data[0].id}`)
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  return (
    <div
      class={styles.queueItem}
      onDblClick={handleDoubleClick}
      onContextMenu={e =>
        handleContextMenu(
          e,
          item.id,
          'songs',
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
      <div class={styles.queueItem__artwork__container}>
        <div class={styles.queueItem__artwork__container__overlay}>
          <div
            class={styles.queueItem__artwork__container__overlay__playButton}
            onClick={handlePlayClick}
          >
            <Fa icon={faPlay} size="1x" color="var(--color-white)" />
          </div>
        </div>
        <img
          class={styles.queueItem__artwork__container__artwork}
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 40, 'webp', 'sr')}
        />
      </div>
      <div class={styles.queueItem__info}>
        <span
          class={styles.queueItem__info__title}
          onClick={handleAlbumClick}
          use:Tooltip={[
            'top',
            item.attributes.name,
            true,
            store.app.general.tooltipDelay
          ]}
        >
          {item.attributes.name}
        </span>
        <span
          class={styles.queueItem__info__artist}
          onClick={handleArtistClick}
          use:Tooltip={[
            'top',
            item.attributes.artistName,
            true,
            store.app.general.tooltipDelay
          ]}
        >
          {item.attributes.artistName}
        </span>
      </div>
    </div>
  )
}
