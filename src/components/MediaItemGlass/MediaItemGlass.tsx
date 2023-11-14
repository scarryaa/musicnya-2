import { A } from '@solidjs/router'
import styles from './MediaItemGlass.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { For } from 'solid-js'
import { mkController } from '../../api/mkController'

export const MediaItemGlass = ({ src, title, artists, type, id, reason }) => {
  const handlePlayClick = e => {
    e.preventDefault()
    mkController.playMediaItem(id, type)
  }

  const handleMoreClick = e => {
    e.preventDefault()
    console.log('more')
  }

  return (
    <A class={styles.mediaItemGlass} href={`/media/${type}/${id}`}>
      <span class={styles.mediaItemGlass__reason}>{reason}</span>
      <div class={styles.mediaItemGlass__inner}>
        <div class={styles.mediaItemGlass__inner__artwork}>
          <div class={styles.mediaItemGlass__inner__artwork__overlay}>
            <div
              class={styles.mediaItemGlass__inner__artwork__overlay__playButton}
              onClick={handlePlayClick}
            >
              <Fa
                icon={faPlay}
                size="1x"
                color="white"
                class={styles.mediaItemGlass__inner__artwork__overlay__playButton__icon}
              />
            </div>
            <div
              class={styles.mediaItemGlass__inner__artwork__overlay__moreButton}
              onClick={handleMoreClick}
            >
              <Fa
                icon={faEllipsisH}
                size="1x"
                color="white"
                class={styles.mediaItemGlass__inner__artwork__overlay__moreButton__icon}
              />
            </div>
          </div>
          <img src={src} />
        </div>
        <div class={styles.mediaItemGlass__inner__chin}>
          <div class={styles.mediaItemGlass__inner__chin__inner}>
            <div class={styles.mediaItemGlass__inner__chin__inner__info}>
              <div class={styles.mediaItemGlass__inner__chin__inner__info__title}>
                {title}
              </div>
              <div class={styles.mediaItemGlass__inner__chin__inner__info__artists}>
                <For each={artists}>
                  {artist => (
                    <span
                      class={
                        styles.mediaItemGlass__inner__chin__inner__info__artists__artist
                      }
                    >
                      {artist}
                    </span>
                  )}
                </For>
              </div>
            </div>
            <div class={styles.mediaItemGlass__inner__chin__inner__artwork}>
              <img src={src} />
            </div>
          </div>
        </div>
      </div>
    </A>
  )
}
