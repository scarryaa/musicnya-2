import styles from './MediaItemSkeleton.module.scss'

export const MediaItemSkeleton = () => {
  return (
    <div class={styles['skelton-item']}>
      <div class={styles['skeleton-artwork']}></div>
      <div class={styles['skeleton-text']}>
        <div class={styles['skeleton-title']}></div>
        <div class={styles['skeleton-artist']}></div>
      </div>
    </div>
  )
}
