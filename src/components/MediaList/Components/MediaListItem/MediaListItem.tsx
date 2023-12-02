import { Utils } from '../../../../util/util'
import styles from './MediaListItem.module.scss'
import { A } from '@solidjs/router'
import Tooltip from '../../../Tooltip/Tooltip'
import useNewContextMenu from '../../../../composables/useNewContextMenu'
import { ContextMenuType } from '../../../../types/types'

export const MediaListItem = ({ item }: { item: MusicKit.Albums }) => {
  const { openNewContextMenu } = useNewContextMenu()

  return (
    <tr
      class={styles['media-list-item']}
      onContextMenu={e =>
        openNewContextMenu(e, item.id, ContextMenuType.MediaItem, 'albums')
      }
    >
      <td class={styles['media-list-item-detail']}>
        <img
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 50)}
          alt={`${item.attributes.name} cover`}
          aria-label={`${item.attributes.name} cover`}
        />
        <div class={styles['media-list-item-detail-title']}>
          <A
            activeClass=""
            href={`/media/albums/${item.id}`}
            class={styles['media-list-item-detail-title-text']}
          >
            <span use:Tooltip={['bottom', item.attributes.name, true, 500]}>
              {item.attributes.name}
            </span>
          </A>
        </div>
      </td>
      <td class={styles['media-list-item-info']}>
        <div class={styles['media-list-item-artist-name']}>
          <A
            activeClass=""
            href={`/media/artists/${item.relationships.artists.data[0].relationships?.catalog.data[0].id}`}
            class={styles['media-list-item-artist-name-text']}
          >
            <span use:Tooltip={['bottom', item.attributes.artistName, true, 500]}>
              {item.attributes.artistName}
            </span>
          </A>
        </div>
      </td>
      <td class={styles['media-list-item-info']}>
        <div class={styles['media-list-item-title']}>
          {Utils.formatDate(item.attributes.dateAdded.slice(0, -10))}
        </div>
      </td>
      <td class={styles['media-list-item-info']}>
        <div class={styles['media-list-item-title']}>
          {Utils.formatDate(item.attributes.releaseDate)}
        </div>
      </td>
    </tr>
  )
}
