import styles from './SongTableSkeleton.module.scss'

export const SongTableSkeleton = () => {
  return (
    <div class={styles.skeletonItem}>
      <div class={styles.skeletonAvatar}></div>
      <div class={styles.skeletonText}></div>
      <div class={styles.skeletonText}></div>
    </div>
  )
}
