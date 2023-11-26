import styles from './ArtistInfoPane.module.scss'
import { ArtistBio } from './Components/ArtistBio'
import { ArtistDetail } from './Components/ArtistDetail'

export const ArtistInfoPane = ({ artist }) => {
  if (
    !artist().attributes.name &&
    !artist().attributes.artistBio &&
    !artist().attributes.origin &&
    !artist().attributes.genreNames &&
    !artist().attributes.bornOrFormed
  ) {
    return null
  }

  const { attributes } = artist()

  return (
    <div class={styles['artist-info-pane']}>
      <span class={styles['artist-info-pane__header']}>About {attributes.name}</span>
      <div class={styles['artist-info-pane__info']}>
        <ArtistBio bio={attributes.artistBio} />
        <div class={styles.artistInfoPane__details}>
          <ArtistDetail title="Hometown" content={attributes.origin} />
          <ArtistDetail title="Genres" content={attributes.genreNames?.join(', ')} />
          <ArtistDetail title="Formed" content={attributes.bornOrFormed} />
        </div>
      </div>
    </div>
  )
}
