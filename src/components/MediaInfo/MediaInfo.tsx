import { faPlay, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { Utils } from '../../util/util'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import styles from './MediaInfo.module.scss'
import { mkController } from '../../api/mkController'

export const MediaInfo = ({ media }) => {
  const handlePlayClick = e => {
    e.preventDefault()
    mkController.playMediaItem(media.id, media.type)
  }

  const handleShuffleClick = e => {
    e.preventDefault()
    mkController.shufflePlayMediaItem(media.id, media.type)
  }

  return (
    <div class={styles.mediaInfo}>
      <img
        src={Utils.formatArtworkUrl(media.attributes.artwork.url, 300)}
        class={styles.mediaInfo__artwork}
      />
      <div class={styles.mediaInfo__info}>
        <div class={styles.mediaInfo__info__text}>
          <h1 class={styles.mediaInfo__info__text__title}>{media.attributes.name}</h1>
          <h2 class={styles.mediaInfo__info__text__artist}>
            {media.attributes.artistName || media.attributes.curatorName}
          </h2>
          {media.type !== ('playlists' || 'library-playlists') && (
            <h3 class={styles.mediaInfo__info__text__genre}>
              {media.attributes.genreNames[0]} •{' '}
              {media.attributes.releaseDate.slice(0, 4)}
            </h3>
          )}
        </div>
        <div class={styles.mediaInfo__info__actions}>
          <PrimaryButton
            icon={faPlay}
            text="Play"
            _class={styles.mediaInfo__info__actions__playButton}
            onClick={handlePlayClick}
          />
          <PrimaryButton
            icon={faShuffle}
            text="Shuffle"
            _class={styles.mediaInfo__info__actions__shuffleButton}
            onClick={handleShuffleClick}
          />
        </div>
      </div>
    </div>
  )
}
