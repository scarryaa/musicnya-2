import { A } from '@solidjs/router'
import { store } from '../../stores/store'
import { Utils } from '../../util/util'
import styles from './NowPlayingTile.module.scss'

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
          {store.currentTrack.title}
        </A>
        <div class={styles.songInfo__artist}>{store.currentTrack.artist}</div>
      </div>
    </div>
  )
}
