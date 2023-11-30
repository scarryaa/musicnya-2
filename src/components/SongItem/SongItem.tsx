import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import styles from './SongItem.module.scss'
import { faEllipsisH, faMinus, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import Tooltip from '../Tooltip/Tooltip'
import { createSignal } from 'solid-js'
import { ContextMenuType } from '../../types/types'
import { mkApiManager } from '../../api/MkApiManager'
import useNewContextMenu from '../../composables/useNewContextMenu'

Tooltip

export const SongItem = ({ item, album, albumId }) => {
  const [inLibrary, setInLibrary] = createSignal(false)
  const [checkedInLibrary, setCheckedInLibrary] = createSignal(false)
  const [libraryId, setLibraryId] = createSignal(null)
  const { openNewContextMenu } = useNewContextMenu()

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
      class={styles['song-item']}
      onMouseEnter={handleMouseOver}
      onContextMenu={e =>
        openNewContextMenu(
          e,
          libraryId(),
          ContextMenuType.Song,
          inLibrary() ? 'library-songs' : 'songs'
        )
      }
    >
      <div class={styles['song-item__artwork__container']}>
        <div
          class={styles['song-item__artwork__container__overlay']}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            mkManager.processItemAndPlay(item.id, 'songs')
          }}
        >
          <div class={styles['song-item__artwork__container__overlay__play-button']}>
            <Fa icon={faPlay} size="1x" />
          </div>
        </div>
        <div class={styles['song-item__artwork']}>
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
        <div class={styles['song-item__info']}>
          <A
            activeClass=""
            class={styles['song-item__info__title']}
            href={`/media/albums/${item.relationships?.albums?.data?.[0].id}`}
          >
            {item.attributes.name}
          </A>
          {albumId && (
            <A
              activeClass=""
              class={styles['song-item__info__artist']}
              href={`/media/albums/${item.relationships?.albums?.data?.[0].id}`}
            >
              {item.attributes.albumName}
            </A>
          )}
          {!albumId && (
            <A
              activeClass=""
              class={styles['song-item__info__artist']}
              href={`/media/artists/${item.relationships?.artists?.data?.[0]?.id}`}
            >
              {item.attributes.artistName}
            </A>
          )}
        </div>
      </div>
      <div class={styles['song-item__actions']}>
        {' '}
        {!inLibrary() ? (
          <div
            class={styles['song-item__actions__add-to-library']}
            onClick={handleAddToLibraryClick}
            use:Tooltip={['bottom', 'Add to Library']}
          >
            <Fa
              icon={faPlus}
              size="1x"
              color="var(--color-primary)"
              class={
                !checkedInLibrary()
                  ? styles['song-item__actions__add-to-library__disabled']
                  : ''
              }
            />
          </div>
        ) : (
          <div
            class={styles['song-item__actions__add-to-library']}
            onClick={handleRemoveFromLibraryClick}
            use:Tooltip={['bottom', 'Remove from Library']}
          >
            <Fa icon={faMinus} size="1x" color="var(--color-primary)" />
          </div>
        )}
        <div
          class={styles['song-item__actions__more-button']}
          onClick={e =>
            openNewContextMenu(
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
