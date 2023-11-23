import styles from './ArtistBio.module.scss'

export const ArtistBio = ({ bio }) =>
  bio.length > 0 && (
    <div class={styles.header}>
      <p class={styles.description} innerHTML={bio.replace(/\n/g, '<br />')} />
    </div>
  )
