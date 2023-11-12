import styles from './MediaItem.module.scss'

export const MediaItem = ({ src }: { src: string }) => {
  return (
    <div class={styles.mediaItem}>
      <div>
        <img src={src} />
      </div>
    </div>
  )
}
