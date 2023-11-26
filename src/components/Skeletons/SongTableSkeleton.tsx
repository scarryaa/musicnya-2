import styles from './SongTableSkeleton.module.scss'

export const SongTableSkeleton = () => {
  return (
    <div class={styles['skeleton-item']}>
      <div class={styles['skeleton-avatar']}></div>
      <div class={styles['skeleton-text']}></div>
      <div class={styles['skeleton-text']}></div>
    </div>
  )
}
