import styles from './MediaItemDetailed.module.scss'

export const MediaItemDetailed = ({ mediaItemId, src, title, artists }) => {
  return (
    <div class={styles.mediaItemDetailed}>
      <div class={styles.mediaItemDetailed__artwork}>
        <img src={src} />
      </div>
      <div class={styles.mediaItemDetailed__info}>
        <span class={styles.mediaItemDetailed__info__title}>{title}</span>
        <span class={styles.mediaItemDetailed__info__artists}>{artists}</span>
      </div>
    </div>
  )
}
