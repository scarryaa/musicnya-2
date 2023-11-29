import { faStar, faPause, faPlay, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import Fa from 'solid-fa'
import { mkController } from '../../api/mkController'
import { store } from '../../stores/store'
import { Utils } from '../../util/util'
import styles from './SongTableItem.module.scss'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { mkManager } from '../../api/MkManager'
import { mkApiManager } from '../../api/MkApiManager'

export const SongTableItem = ({ track, data, index }) => {
  const { openContextMenu } = useContextMenu()
  return (
    <tr
      onContextMenu={e => openContextMenu(e, track.id, ContextMenuType.Song, data().type)}
      onDblClick={() => mkManager.setQueue(data().id, data().type, false, index)}
      class={
        data().type === 'albums' &&
        track.attributes.offers?.length === 1 &&
        track.attributes.offers?.[0]?.type === 'preorder'
          ? styles['song-table-item__unreleased']
          : styles['song-table-item']
      }
    >
      <td class={styles['song-table-item__number']}>
        <span class={styles['song-table-item__number__popularity']}>
          {data().type === 'albums' && track?.meta?.popularity > 0.7 && (
            <Fa icon={faStar} color="var(--color-on-primary)" size="xs" />
          )}
        </span>
        <span class={styles['song-table-item__number__number']}>{index + 1}</span>
        <div
          class={styles['song-table-item__number__playButton']}
          onClick={() => mkManager.setQueue(data().id, data().type, false, index)}
        >
          {track.id === store.currentTrack.id ? (
            <Fa icon={faPause} size="1x" color="var(--color-primary)" />
          ) : (
            <Fa icon={faPlay} size="1x" color="var(--color-on-primary)" />
          )}
        </div>
      </td>
      <td>
        <div class={styles['song-table-item__title']}>
          {data().type !== 'albums' && data().type !== 'library-albums' && (
            <div class={styles['song-table-item__title__albumCover']}>
              <img src={Utils.formatArtworkUrl(track.attributes.artwork.url, 50)} />
            </div>
          )}
          <div class={styles['song-table-item__title__name__artist']}>
            <span
              class={styles['song-table-item__title__name__artist__name']}
              style={{
                color:
                  track.id === store.currentTrack.id
                    ? 'var(--color-primary)'
                    : 'var(--color-on-primary)'
              }}
            >
              {track.attributes.name}
              {(track.relationships?.catalog?.data?.[0]?.attributes?.contentRating ===
                'explicit' ||
                track.attributes.contentRating === 'explicit') && (
                <span
                  class={styles['song-table-item__title__name__artist__name__explicit']}
                >
                  <small
                    class={
                      styles['song-table-item__title__name__artist__name__explicit__text']
                    }
                  >
                    E
                  </small>
                </span>
              )}
            </span>
            <span
              class={styles['song-table-item__title__name__artist__artist']}
              onClick={() => {
                data().type === 'library-albums'
                  ? store.app.navigate(
                      `/media/artists/${
                        data().relationships?.catalog?.data?.[0]?.relationships?.artists
                          ?.data?.[0]?.id
                      }`
                    )
                  : data().type === 'library-playlists'
                  ? mkApiManager
                      .getArtistFromMediaItem(
                        track.relationships?.catalog?.data?.[0].id,
                        'songs'
                      )
                      .then(
                        res => {
                          if (res) {
                            store.app.navigate(`/media/artists/${res.data[0].id}`)
                          }
                        },
                        err => {
                          console.error(err)
                        }
                      )
                  : store.app.navigate(
                      `/media/artists/${track.relationships?.artists?.data?.[0]?.id}`
                    )
              }}
            >
              {track.attributes.artistName}
            </span>
          </div>
        </div>
      </td>
      {data().type !== 'albums' && data().type !== 'library-albums' && (
        <td class={styles['song-table-item__album']}>
          <A
            class={styles['song-table-item__album__link']}
            href={
              data().type === 'library-playlists'
                ? `/media/albums/${
                    track.relationships?.catalog?.data?.[0]?.attributes?.url
                      ?.split('/')?.[6]
                      ?.split('?')?.[0]
                  }`
                : `/media/albums/${
                    track?.attributes?.url?.split('/')?.[6]?.split('?')?.[0]
                  }`
            }
          >
            {track.attributes.albumName}
          </A>
        </td>
      )}
      <td>
        <div class={styles['song-table-item__time']}>
          <span>{Utils.formatTime(track.attributes.durationInMillis / 1000)}</span>
          <div
            class={styles['song-table-item__time__moreButton']}
            onClick={e => openContextMenu(e, track.id, ContextMenuType.Song, data().type)}
          >
            <Fa icon={faEllipsisH} size="1x" color="var(--color-on-primary)" />
          </div>
        </div>
      </td>
    </tr>
  )
}
