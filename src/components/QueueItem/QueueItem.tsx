import { store } from '../../stores/store'
import { Utils } from '../../util/util'
import styles from './QueueItem.module.scss'
import Tooltip from '../Tooltip/Tooltip'
import Fa from 'solid-fa'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { mkManager } from '../../api/MkManager'
import { mkApiManager } from '../../api/MkApiManager'
Tooltip

export const QueueItem = ({ item, index }) => {
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
    mkApiManager.getAlbumFromMediaItem(item.id, 'songs').then(
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
    mkApiManager.getArtistFromMediaItem(item.id, 'songs').then(
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
      className={styles['queue-item']}
      onDoubleClick={handleDoubleClick}
      onContextMenu={e =>
        openContextMenu(e, item.id, ContextMenuType.QueueItem, item.type + 's')
      }
    >
      <div className={styles['queue-item__artwork__container']}>
        <div className={styles['queue-item__artwork__container__overlay']}>
          <div
            className={styles['queue-item__artwork__container__overlay__play-button']}
            onClick={handlePlayClick}
          >
            <Fa icon={faPlay} size="1x" color="var(--color-white)" />
          </div>
        </div>
        <img
          className={styles['queue-item__artwork__container__artwork']}
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 40, 40, 'webp', 'sr')}
        />
      </div>
      <div className={styles['queue-item__info']}>
        <span
          className={styles['queue-item__info__title']}
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
          className={styles['queue-item__info__artist']}
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
