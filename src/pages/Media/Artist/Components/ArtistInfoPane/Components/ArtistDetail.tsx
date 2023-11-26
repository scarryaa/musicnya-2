import styles from './ArtistDetail.module.scss'

export const ArtistDetail = ({ title, content }) =>
  content && (
    <div class={styles['artist-detail']}>
      <span class={styles['artist-detail__title']}>{title}</span>
      <span class={styles['artist-detail__description']}>{content}</span>
    </div>
  )
