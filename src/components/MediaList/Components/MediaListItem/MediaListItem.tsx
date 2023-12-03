import styles from './MediaListItem.module.scss'
import { A } from '@solidjs/router'
import useNewContextMenu from '../../../../composables/useNewContextMenu'
import { ContextMenuType } from '../../../../types/types'
import Tooltip from '../../../Tooltip/Tooltip'

type MediaListItemProps = {
  id: string
  type: MusicKit.MediaItemType
  artwork: string
  title: string
  artistName: string
  artistId: string
  dateAdded: string
  releaseDate: string
}

export const MediaListItem = ({
  id,
  type,
  artwork,
  title,
  artistName,
  artistId,
  dateAdded,
  releaseDate
}: MediaListItemProps) => {
  const { openNewContextMenu } = useNewContextMenu()

  return (
    <tr
      class={styles['media-list-item']}
      onContextMenu={e => openNewContextMenu(e, id, ContextMenuType.MediaItem, type)}
    >
      <td class={styles['media-list-item-detail']}>
        <img src={artwork} alt={`${title} cover`} aria-label={`${title} cover`} />
        <div class={styles['media-list-item-detail-title']}>
          <A
            activeClass=""
            href={`/media/playlists/${id}`}
            class={styles['media-list-item-detail-title-text']}
          >
            <span use:Tooltip={['bottom', title, true, 500]}>{title}</span>
          </A>
        </div>
      </td>
      {artistName && (
        <td class={styles['media-list-item-info']}>
          <div class={styles['media-list-item-artist-name']}>
            <A
              activeClass=""
              href={`/media/artists/${artistId}`}
              class={styles['media-list-item-artist-name-text']}
            >
              <span use:Tooltip={['bottom', artistName, true, 500]}>{artistName}</span>
            </A>
          </div>
        </td>
      )}
      <td class={styles['media-list-item-info']}>
        <div class={styles['media-list-item-title']}>{releaseDate}</div>
      </td>
      <td class={styles['media-list-item-info']}>
        <div class={styles['media-list-item-title']}>{dateAdded}</div>
      </td>
    </tr>
  )
}
