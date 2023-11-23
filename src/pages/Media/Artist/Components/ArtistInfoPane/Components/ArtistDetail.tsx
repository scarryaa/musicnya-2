import styles from './ArtistDetail.module.scss'

export const ArtistDetail = ({ title, content }) =>
  content && (
    <div class={styles.artistDetail}>
      <span class={styles.artistDetail__title}>{title}</span>
      <span class={styles.artistDetail__description}>{content}</span>
    </div>
  )
