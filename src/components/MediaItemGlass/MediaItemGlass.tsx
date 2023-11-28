import { A } from '@solidjs/router'
import { For } from 'solid-js'
import styles from './MediaItemGlass.module.scss'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { mkManager } from '../../api/MkManager'
import { ArtworkOverlay } from '../ArtworkOverlay/ArtworkOverlay'
import useHoverStates from '../../composables/useHoverStates'
import { ArtworkOverlayType } from '../ArtworkOverlay/Types'

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
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverStates()

  const handlePlayClick = (e: MouseEvent): void => {
    e.preventDefault()
    mkManager.processItemAndPlay(id, type).catch(err => console.error(err))
  }

  return (
    <A
      class={styles['media-item-glass']}
      href={`/media/${type}/${id}`}
      onContextMenu={e => openContextMenu(e, id, ContextMenuType.MediaItem, type)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span class={styles['media-item-glass__reason']}>{reason}</span>
      <div class={styles['media-item-glass__inner']}>
        <div class={styles['media-item-glass__inner__artwork']}>
          <ArtworkOverlay
            isVisible={isHovered}
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
