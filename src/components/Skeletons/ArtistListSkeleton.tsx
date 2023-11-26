import styles from './ArtistListSkeleton.module.scss'

export const ArtistListSkeleton = () => {
  return (
    <div class={styles.item}>
      <div class={styles['skeleton-artwork']}></div>
      <div class={styles['skeleton-text']}></div>
    </div>
  )
}
