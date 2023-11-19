import { faStar, faPause, faPlay, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import Fa from 'solid-fa'
import { mkController } from '../../api/mkController'
import { store } from '../../stores/store'
import { Utils } from '../../util/util'
import styles from './SongTableItem.module.scss'
import { createSignal } from 'solid-js'
import {
  contextMenu,
  handleContextMenu,
  handleMoreClick
} from './SongTableItemContextMenu'

export const SongTableItem = ({ track, data, index }) => {
  const [isLoved, setIsLoved] = createSignal(false)
  const [isDisliked, setIsDisliked] = createSignal(false)
  const [inLibrary, setInLibrary] = createSignal(false)
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(track.id, 'songs', isLoved(), inLibrary(), isDisliked())
  )
  console.log(track)

  return (
    <tr
      onContextMenu={e =>
        handleContextMenu(
          e,
          track.id,
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
      onDblClick={() => mkController.setQueue(data().id, data().type, index)}
      class={
        data().type === 'albums' &&
        track.attributes.offers?.length === 1 &&
        track.attributes.offers?.[0]?.type === 'preorder'
          ? styles.songTableItem__unreleased
          : styles.songTableItem
      }
    >
      <td class={styles.songTableItem__number}>
        <span class={styles.songTableItem__number__popularity}>
          {data().type === 'albums' && track.meta.popularity > 0.7 && (
            <Fa icon={faStar} color="var(--app-text-color)" size="xs" />
          )}
        </span>
        <span class={styles.songTableItem__number__number}>{index + 1}</span>
        <div
          class={styles.songTableItem__number__playButton}
          onClick={() => mkController.setQueue(data().id, data().type, index)}
        >
          {track.id === store.currentTrack.id ? (
            <Fa icon={faPause} size="1x" color="var(--app-primary-color)" />
          ) : (
            <Fa icon={faPlay} size="1x" color="var(--app-text-color)" />
          )}
        </div>
      </td>
      <td>
        <div class={styles.songTableItem__title}>
          {data().type !== 'albums' && data().type !== 'library-albums' && (
            <div class={styles.songTableItem__title__albumCover}>
              <img src={Utils.formatArtworkUrl(track.attributes.artwork.url, 50)} />
            </div>
          )}
          <div class={styles.songTableItem__title__name__artist}>
            <span
              class={styles.songTableItem__title__name__artist__name}
              style={{
                color:
                  track.id === store.currentTrack.id
                    ? 'var(--app-primary-color)'
                    : 'var(--app-text-color)'
              }}
            >
              {track.attributes.name}
              {(track.relationships.catalog?.data?.[0]?.attributes.contentRating ===
                'explicit' ||
                track.attributes.contentRating === 'explicit') && (
                <span class={styles.songTableItem__title__name__artist__name__explicit}>
                  <small
                    class={
                      styles.songTableItem__title__name__artist__name__explicit__text
                    }
                  >
                    E
                  </small>
                </span>
              )}
            </span>
            <span
              class={styles.songTableItem__title__name__artist__artist}
              onClick={() => {
                data().type === 'library-albums'
                  ? store.app.navigate(
                      `/media/artists/${
                        data().relationships?.catalog?.data?.[0]?.relationships?.artists
                          ?.data?.[0]?.id
                      }`
                    )
                  : data().type === 'library-playlists'
                  ? mkController
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
        <td class={styles.songTableItem__album}>
          <A
            class={styles.songTableItem__album__link}
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
        <div class={styles.songTableItem__time}>
          <span>{Utils.formatTime(track.attributes.durationInMillis / 1000)}</span>
          <div
            class={styles.songTableItem__time__moreButton}
            onClick={e =>
              handleMoreClick(
                e,
                track.id,
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
            <Fa icon={faEllipsisH} size="1x" color="var(--app-text-color)" />
          </div>
        </div>
      </td>
    </tr>
  )
}
