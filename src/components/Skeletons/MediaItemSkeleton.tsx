import styles from './MediaItemSkeleton.module.scss'

export const MediaItemSkeleton = () => {
  return (
    <div class={styles.skeletonItem}>
      <div class={styles.skeletonArtwork}></div>
      <div class={styles.skeletonText}>
        <div class={styles.skeletonTitle}></div>
        <div class={styles.skeletonArtist}></div>
      </div>
    </div>
  )
}
