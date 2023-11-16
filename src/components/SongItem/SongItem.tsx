import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import styles from './SongItem.module.scss'
import { faEllipsisH, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import { mkController } from '../../api/mkController'
import Tooltip from '../Tooltip/Tooltip'

export const SongItem = ({ item }) => {
  return (
    <div class={styles.songItem}>
      <div class={styles.songItem__artwork__container}>
        <div
          class={styles.songItem__artwork__container__overlay}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            mkController.playMediaItem(item.id, 'songs')
          }}
        >
          <div class={styles.songItem__artwork__container__overlay__playButton}>
            <Fa icon={faPlay} size="1x" />
          </div>
        </div>
        <div class={styles.songItem__artwork}>
          <img
            src={Utils.formatArtworkUrl(item.attributes.artwork.url, 50, 'webp', 'sr')}
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
          <A
            activeClass=""
            class={styles.songItem__info__artist}
            href={`/media/artists/${item.relationships?.artists?.data?.[0].id}`}
          >
            {item.attributes.artistName}
          </A>
        </div>
      </div>
      <div class={styles.songItem__actions}>
        <div
          class={styles.songItem__actions__addToLibrary}
          use:Tooltip={['bottom', 'Add to Library']}
        >
          <Fa icon={faPlus} size="1x" color="var(--app-primary-color)" />
        </div>
        <div class={styles.songItem__actions__moreButton}>
          <Fa icon={faEllipsisH} size="1x" color="var(--app-primary-color)" />
        </div>
      </div>
    </div>
  )
}
