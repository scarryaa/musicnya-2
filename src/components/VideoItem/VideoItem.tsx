import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import styles from './VideoItem.module.scss'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import { mkManager } from '../../api/MkManager'

export const VideoItem = ({ item }) => {
  const handlePlayClick = e => {
    e.preventDefault()
    mkManager.processItemAndPlay(item.id, item.type)
  }

  return (
    <A class={styles['video-item']} href={`/media/videos/${item.id}`}>
      <div class={styles['video-item__thumbnail']}>
        <div class={styles['video-item__thumbnail__overlay']}>
          <div
            class={styles['video-item__thumbnail__overlay__playButton']}
            onClick={handlePlayClick}
          >
            <Fa icon={faPlay} size="1x" color="var(--color-white)" />
          </div>
          <div class={styles['video-item__thumbnail__overlay__moreButton']}>
            <Fa icon={faEllipsisH} size="1x" color="var(--color-white)" />
          </div>
        </div>
        <img
          src={Utils.formatArtworkUrl(
            item.attributes?.editorialArtwork?.subscriptionHero?.url ||
              item.attributes?.editorialArtwork?.contentLogo?.url ||
              item.attributes?.editorialArtwork?.fullscreenBackground?.url ||
              item.attributes.artwork.url,
            300,
            300,
            'webp',
            'none'
          )}
        />
      </div>
      <div class={styles['video-item__info']}>
        <div class={styles['video-item__info__title']}>{item.attributes.name}</div>
      </div>
    </A>
  )
}
