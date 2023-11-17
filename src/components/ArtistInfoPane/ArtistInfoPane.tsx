import styles from './ArtistInfoPane.module.scss'

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

  return (
    <div class={styles.artistInfoPane}>
      <div class={styles.artistInfoPane__header}>
        <span class={styles.artistInfoPane__header__main__title}>
          About {artist().attributes.name}
        </span>
        <div class={styles.artistInfoPane__header__inner}>
          {artist().attributes?.artistBio?.length > 0 && (
            <div class={styles.artistInfoPane__header__inner}>
              <p
                class={styles.artistInfoPane__header__inner__description}
                innerHTML={artist().attributes.artistBio.replace(/\n/g, '<br />')}
              />
            </div>
          )}
          <div class={styles.artistInfoPane__header__inner__extraInfo}>
            {artist().attributes?.origin && (
              <div class={styles.artistInfoPane__header__inner__extraInfo__item}>
                <span
                  class={styles.artistInfoPane__header__inner__extraInfo__item__header}
                >
                  Hometown
                </span>
                <span class={styles.artistInfoPane__header__inner__extraInfo__item__text}>
                  {artist().attributes.origin}
                </span>
              </div>
            )}
            {artist().attributes?.genreNames &&
              artist().attributes?.genreNames?.length > 0 && (
                <div class={styles.artistInfoPane__header__inner__extraInfo__item}>
                  <div
                    class={styles.artistInfoPane__header__inner__extraInfo__item__header}
                  >
                    Genres
                  </div>
                  <span
                    class={styles.artistInfoPane__header__inner__extraInfo__item__text}
                  >
                    {artist().attributes.genreNames?.join(', ')}
                  </span>
                </div>
              )}
            {artist().attributes?.bornOrFormed && (
              <div class={styles.artistInfoPane__header__inner__extraInfo__item}>
                <div
                  class={styles.artistInfoPane__header__inner__extraInfo__item__header}
                >
                  Formed
                </div>
                <span class={styles.artistInfoPane__header__inner__extraInfo__item__text}>
                  {artist().attributes.bornOrFormed}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
