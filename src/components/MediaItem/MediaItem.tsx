import Fa from 'solid-fa'
import styles from './MediaItem.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import Tooltip from '../Tooltip/Tooltip'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { mkManager } from '../../api/MkManager'
import { createEffect, createSignal } from 'solid-js'
import { mkApiManager } from '../../api/MkApiManager'

export const MediaItem = ({
  src,
  title,
  artists,
  type,
  id,
  artistId,
  releaseYear,
  curator,
  curatorId
}: {
  src: string
  title?: string
  artists: string[]
  type: string
  id: string
  artistId: string
  releaseYear?: number
  curator?: string
  curatorId?: string
}) => {
  const { openContextMenu } = useContextMenu()
  const isAppleCurator = type === 'apple-curators'
  type === 'library-playlists' ? (type = 'playlists') : type
  Tooltip
  const [newArtistId, setArtistId] = createSignal(artistId)

  const handlePlayClick = e => {
    e.preventDefault()
    mkManager.processItemAndPlay(id, type)
  }

  createEffect(async () => {
    if (type === 'library-albums') {
      console.log(artistId)
      const catalogId = await mkApiManager.getCatalogArtistFromLibrary(artistId)
      setArtistId(catalogId.data[0].id)
    }
  })

  return (
    <div
      class={styles['media-item']}
      data-id={id}
      data-testid="media-item"
      onContextMenu={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
    >
      <div class={styles['media-item__inner']}>
        <div class={styles['media-item__inner__artwork']}>
          <A
            class={
              `${styles['media-item__inner__artwork__overlay']}` +
              (isAppleCurator
                ? ` ${styles['media-item__inner__artwork__overlay__apple-curator']}`
                : '')
            }
            href={`/media/${type}/${id}`}
          >
            {!isAppleCurator && (
              <div
                data-testid="play-button"
                class={styles['media-item__inner__artwork__overlay__play-button']}
                onClick={handlePlayClick}
              >
                <Fa
                  icon={faPlay}
                  size="1x"
                  color="white"
                  class={styles['media-item__inner__artwork__overlay__play-button__icon']}
                />
              </div>
            )}
            <div
              class={styles['media-item__inner__artwork__overlay__more-button']}
              onClick={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
            >
              <Fa
                icon={faEllipsisH}
                size="1x"
                color="white"
                class={styles['media-item__inner__artwork__overlay__more-button__icon']}
              />
            </div>
          </A>
          <img src={src} />
        </div>
        <div class={styles['media-item__inner__info']}>
          <div
            class={styles['media-item__inner__info__title']}
            use:Tooltip={['bottom', title, true, 500]}
          >
            {title}
          </div>
          <div class={styles['media-item__inner__info__artists']}>
            {releaseYear && (
              <span class={styles['media-item__inner__info__artists__year']}>
                {releaseYear}
              </span>
            )}
            {artists !== null && (
              <A
                activeClass=""
                class={styles['media-item__inner__info__artists__link']}
                href={`/media/artists/${newArtistId()}`}
              >
                <span use:Tooltip={['bottom', artists.join(', '), true, 500]}>
                  {artists.join(', ')}
                </span>
              </A>
            )}
            {curator &&
              (curatorId ? (
                <A
                  activeClass=""
                  class={styles['media-item__inner__info__curator-link']}
                  href={`/media/artists/${curatorId}`}
                >
                  <span use:Tooltip={['bottom', curator, true, 500]}>{curator}</span>
                </A>
              ) : (
                <span
                  use:Tooltip={['bottom', curator, true, 500]}
                  class={styles['media-item__inner__info__curator']}
                >
                  {curator}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
