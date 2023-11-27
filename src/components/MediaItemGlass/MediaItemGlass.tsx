import { faPlay, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import Fa from 'solid-fa'
import { For, createSignal } from 'solid-js'
import styles from './MediaItemGlass.module.scss'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { mkManager } from '../../api/MkManager'
import { ArtworkOverlay, ArtworkOverlayType } from '../ArtworkOverlay/ArtworkOverlay'

type MediaItemGlassProps = {
  src: string
  title: string
  artists: string[]
  type: MusicKit.MediaItemType
  id: string
  reason: string
}

export const MediaItemGlass = ({
  src,
  title,
  artists,
  type,
  id,
  reason
}: MediaItemGlassProps) => {
  const { openContextMenu } = useContextMenu()
  const [isHovering, setIsHovering] = createSignal(false)

  const handleMouseEnter = () => setIsHovering(true)

  const handleMouseLeave = () => setIsHovering(false)

  const handlePlayClick = (e: MouseEvent): void => {
    e.preventDefault()
    mkManager.processItemAndPlay(id, type).catch(err => console.error(err))
  }

  return (
    <A
      class={styles['media-item-glass']}
      href={`/media/${type}/${id}`}
      onContextMenu={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span class={styles['media-item-glass__reason']}>{reason}</span>
      <div class={styles['media-item-glass__inner']}>
        <div class={styles['media-item-glass__inner__artwork']}>
          <ArtworkOverlay
            isVisible={isHovering}
            isLink={false}
            type={ArtworkOverlayType.PLAY_AND_MORE}
            moreClick={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
            playClick={handlePlayClick}
            roundBottomCorners={false}
          >
            <img
              class={styles['media-item-glass__inner__artwork__image']}
              src={src}
              alt={title}
            />
          </ArtworkOverlay>
        </div>
        <div class={styles['media-item-glass__inner__chin']}>
          <div class={styles['media-item-glass__inner__chin__inner']}>
            <div class={styles['media-item-glass__inner__chin__inner__info']}>
              <div class={styles['media-item-glass__inner__chin__inner__info__title']}>
                {title}
              </div>
              <div class={styles['media-item-glass__inner__chin__inner__info__artists']}>
                <For each={artists}>
                  {artist => (
                    <span
                      class={
                        styles[
                          'media-item-glass__inner__chin__inner__info__artists__artist'
                        ]
                      }
                    >
                      {artist}
                    </span>
                  )}
                </For>
              </div>
            </div>
            <div class={styles['media-item-glass__inner__chin__inner__artwork']}>
              <img src={src} />
            </div>
          </div>
        </div>
      </div>
    </A>
  )
}
