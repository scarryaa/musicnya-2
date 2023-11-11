import styles from './NowPlayingTile.module.scss'

export const NowPlayingTile = ({ title, artist }) => {
  return (
    <div class={styles.nowPlayingTile}>
      <div class={styles.albumCover}>
        <img src="https://via.placeholder.com/200" alt="Now playing" />
      </div>
      <div class={styles.songInfo}>
        <div class={styles.songInfo__title}>{title}</div>
        <div class={styles.songInfo__artist}>{artist}</div>
      </div>
    </div>
  )
}
