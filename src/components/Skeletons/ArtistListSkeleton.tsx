import styles from './ArtistListSkeleton.module.scss'

export const ArtistListSkeleton = () => {
  return (
    <div class={styles.item}>
      <div class={styles.skeletonArtwork}></div>
      <div class={styles.skeletonText}></div>
    </div>
  )
}
