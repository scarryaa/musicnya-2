import { faPlay, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { Utils } from '../../util/util'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import styles from './MediaInfo.module.scss'
import { mkController } from '../../api/mkController'
import musicNote from '../../assets/music_note.png'

export const MediaInfo = ({ media }) => {
  const handlePlayClick = e => {
    e.preventDefault()
    mkController.playMediaItem(media.id, media.type)
  }

  const handleShuffleClick = e => {
    e.preventDefault()
    mkController.shufflePlayMediaItem(media.id, media.type)
  }

  if (media.type === 'uploaded-videos' || media.type === 'music-videos') {
    return (
      <div class={styles.mediaInfo}>
        <img
          src={
            media().attributes.artwork?.url
              ? Utils.formatArtworkUrl(media()?.attributes?.artwork?.url, 300)
              : Utils.formatArtworkUrl(
                  media().relationships.tracks.data[0].attributes.artwork.url,
                  300
                ) || musicNote
          }
          class={styles.mediaInfo__artwork__video}
        />
        <div class={styles.mediaInfo__info}>
          <div class={styles.mediaInfo__info__text}>
            <h1 class={styles.mediaInfo__info__text__title}>{media().attributes.name}</h1>
            {media().type !== 'stations' &&
              media().type !== 'music-videos' &&
              media().type !== 'uploaded-videos' && (
                <h2 class={styles.mediaInfo__info__text__artist}>
                  {media().attributes.artistName ||
                    media().attributes.curatorName ||
                    media().relationships?.catalog?.data?.[0]?.attributes?.curatorName}
                </h2>
              )}
            {media().type === 'music-videos' ||
              (media().type === 'uploaded-videos' && (
                <h2 class={styles.mediaInfo__info__text__artist}>
                  {media().attributes.uploadingBrandName}
                </h2>
              ))}
            {media().type !== 'playlists' &&
              media().type !== 'library-playlists' &&
              media().type !== 'stations' &&
              media().type !== 'uploaded-videos' &&
              media().type !== 'music-videos' && (
                <h3 class={styles.mediaInfo__info__text__genre}>
                  {media().attributes.genreNames[0]} •{' '}
                  {media().attributes.releaseDate.slice(0, 4)}
                </h3>
              )}
            {media().type === 'music-videos' ||
              (media().type === 'uploaded-videos' && (
                <h3 class={styles.mediaInfo__info__text__genre}>
                  {Utils.formatDate(media().attributes.uploadDate)}
                </h3>
              ))}
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

  return (
    <div class={styles.mediaInfo}>
      <img
        src={
          media().attributes.artwork?.url
            ? Utils.formatArtworkUrl(media()?.attributes?.artwork?.url, 300)
            : Utils.formatArtworkUrl(
                media().relationships.tracks.data[0].attributes.artwork.url,
                300
              ) || musicNote
        }
        class={styles.mediaInfo__artwork}
      />
      <div class={styles.mediaInfo__info}>
        <div class={styles.mediaInfo__info__text}>
          <h1 class={styles.mediaInfo__info__text__title}>{media().attributes.name}</h1>
          {media().type !== 'stations' && (
            <h2 class={styles.mediaInfo__info__text__artist}>
              {media().attributes.artistName ||
                media().attributes.curatorName ||
                media().relationships?.catalog?.data?.[0]?.attributes?.curatorName}
            </h2>
          )}
          {media().type !== 'playlists' &&
            media().type !== 'library-playlists' &&
            media().type !== 'stations' && (
              <h3 class={styles.mediaInfo__info__text__genre}>
                {media().attributes.genreNames[0]} •{' '}
                {media().attributes.releaseDate.slice(0, 4)}
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
