import { A } from '@solidjs/router'
import { store } from '../../stores/store'
import { Utils } from '../../util/util'
import styles from './NowPlayingTile.module.scss'
import Tooltip from '../Tooltip/Tooltip'

export const NowPlayingTile = () => {
  return (
    <div class={styles.nowPlayingTile}>
      <div class={styles.albumCover}>
        <img src={Utils.formatArtworkUrl(store.currentTrack.artwork, 200)} />
      </div>
      <div class={styles.songInfo}>
        <A
          activeClass=""
          href={`/media/${store.currentTrack.parentType}/${store.currentTrack.parentID}`}
          class={styles.songInfo__title}
        >
          <span
            use:Tooltip={[
              'top',
              store.currentTrack.title,
              true,
              store.app.general.tooltipDelay
            ]}
          >
            {store.currentTrack.title}
          </span>
        </A>
        <div
          class={styles.songInfo__artist}
          use:Tooltip={[
            'top',
            store.currentTrack.artist,
            true,
            store.app.general.tooltipDelay
          ]}
        >
          {store.currentTrack.artist}
        </div>
      </div>
    </div>
  )
}
