import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import styles from './SongItem.module.scss'
import { faEllipsisH, faMinus, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import { mkController } from '../../api/mkController'
import Tooltip from '../Tooltip/Tooltip'
import { createSignal } from 'solid-js'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { MkManager } from '../../api/MkManager'
import { mkApiManager } from '../../api/MkApiManager'

export const SongItem = ({ item, album, albumId }) => {
  const [inLibrary, setInLibrary] = createSignal(false)
  const [checkedInLibrary, setCheckedInLibrary] = createSignal(false)
  const [libraryId, setLibraryId] = createSignal(null)
  const { openContextMenu } = useContextMenu()

  const handleAddToLibraryClick = e => {
    mkApiManager.addToLibrary(item.id, 'songs').then(
      res => {
        if (res) {
          setInLibrary(true)
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  const handleRemoveFromLibraryClick = e => {
    mkApiManager.removeFromLibrary(libraryId(), 'songs').then(
      res => {
        if (res) {
          setInLibrary(false)
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  const handleMouseOver = e => {
    if (checkedInLibrary()) return
    mkApiManager.isItemInLibrary(item.id, 'songs').then(
      res => {
        setCheckedInLibrary(true)
        if (res) {
          setInLibrary(res?.data?.[0]?.attributes?.inLibrary)
          setLibraryId(res?.data?.[0]?.relationships?.library?.data?.[0]?.id)
          console.log(libraryId())
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  return (
    <div
      class={styles.songItem}
      onMouseEnter={handleMouseOver}
      onContextMenu={e =>
        openContextMenu(
          e,
          libraryId(),
          ContextMenuType.Song,
          inLibrary() ? 'library-songs' : 'songs'
        )
      }
    >
      <div class={styles.songItem__artwork__container}>
        <div
          class={styles.songItem__artwork__container__overlay}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            mkManager.processItemAndPlay(item.id, 'songs')
          }}
        >
          <div class={styles.songItem__artwork__container__overlay__playButton}>
            <Fa icon={faPlay} size="1x" />
          </div>
        </div>
        <div class={styles.songItem__artwork}>
          <img
            src={Utils.formatArtworkUrl(
              item.attributes.artwork.url,
              50,
              50,
              'webp',
              'sr'
            )}
          />
        </div>
        <div class={styles.songItem__info}>
          <A
            activeClass=""
            class={styles.songItem__info__title}
            href={`/media/albums/${item.relationships?.albums?.data?.[0].id}`}
          >
            {item.attributes.name}
          </A>
          {albumId && (
            <A
              activeClass=""
              class={styles.songItem__info__artist}
              href={`/media/albums/${item.relationships?.albums?.data?.[0].id}`}
            >
              {item.attributes.albumName}
            </A>
          )}
          {!albumId && (
            <A
              activeClass=""
              class={styles.songItem__info__artist}
              href={`/media/artists/${item.relationships?.artists?.data?.[0]?.id}`}
            >
              {item.attributes.artistName}
            </A>
          )}
        </div>
      </div>
      <div class={styles.songItem__actions}>
        {' '}
        {!inLibrary() ? (
          <div
            class={styles.songItem__actions__addToLibrary}
            onClick={handleAddToLibraryClick}
            use:Tooltip={['bottom', 'Add to Library']}
          >
            <Fa
              icon={faPlus}
              size="1x"
              color="var(--color-primary)"
              class={
                !checkedInLibrary()
                  ? styles.songItem__actions__addToLibrary__disabled
                  : ''
              }
            />
          </div>
        ) : (
          <div
            class={styles.songItem__actions__addToLibrary}
            onClick={handleRemoveFromLibraryClick}
            use:Tooltip={['bottom', 'Remove from Library']}
          >
            <Fa icon={faMinus} size="1x" color="var(--color-primary)" />
          </div>
        )}
        <div
          class={styles.songItem__actions__moreButton}
          onClick={e =>
            openContextMenu(
              e,
              item.id,
              ContextMenuType.Song,
              inLibrary() ? 'library-songs' : 'songs'
            )
          }
        >
          <Fa icon={faEllipsisH} size="1x" color="var(--color-primary)" />
        </div>
      </div>
    </div>
  )
}
