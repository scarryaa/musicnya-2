import { createSignal } from 'solid-js'
import { mkController } from '../../api/mkController'
import { store } from '../../stores/store'
import styles from './HistoryItem.module.scss'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import Tooltip from '../Tooltip/Tooltip'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { mkManager } from '../../api/MkManager'
import { mkApiManager } from '../../api/MkApiManager'

export const HistoryItem = ({ item, index }) => {
  const { openContextMenu } = useContextMenu()

  const handleDoubleClick = e => {
    mkManager.changeToIndex(index)
  }

  const handlePlayClick = e => {
    mkManager.changeToIndex(index)
  }

  const handleAlbumClick = e => {
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
    mkApiManager.getAlbumFromMediaItem(item.id, item.type).then(
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
    mkApiManager.getArtistFromMediaItem(item.id, item.type).then(
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
      class={styles.historyItem}
      onDblClick={handleDoubleClick}
      onContextMenu={e =>
        openContextMenu(e, item.id, ContextMenuType.HistoryItem, item.type)
      }
    >
      <div class={styles.historyItem__artwork__container}>
        <div class={styles.historyItem__artwork__container__overlay}>
          <div
            class={styles.historyItem__artwork__container__overlay__playButton}
            onClick={handlePlayClick}
          >
            <Fa icon={faPlay} size="1x" color="var(--color-white)" />
          </div>
        </div>
        <img
          class={styles.historyItem__artwork__container__artwork}
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 40, 40, 'webp', 'sr')}
        />
      </div>
      <div class={styles.historyItem__info}>
        <span
          class={styles.historyItem__info__title}
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
          class={styles.historyItem__info__artist}
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
