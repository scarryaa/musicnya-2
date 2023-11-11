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
        <div class={styles.songInfo__title}>{store.currentTrack.title}</div>
        <div class={styles.songInfo__artist}>{store.currentTrack.artist}</div>
      </div>
    </div>
  )
}
