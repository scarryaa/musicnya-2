import { faPlay, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { Utils } from '../../util/util'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import styles from './MediaInfo.module.scss'
import { mkController } from '../../api/mkController'
import musicNote from '../../assets/music_note.png'
import { createEffect, onCleanup } from 'solid-js'
import { store } from '../../stores/store'
import { A } from '@solidjs/router'
import { mkManager } from '../../api/MkManager'

export const MediaInfo = ({ media, artistId }) => {
  console.log(media())
  const handlePlayClick = e => {
    e.preventDefault()
    mkManager.processItemAndPlay(media().id, media().type)
  }

  const handleShuffleClick = e => {
    e.preventDefault()
    mkManager.processItemAndPlay(media().id, media().type, true)
  }

  const handleBlur = () => {
    const video: any = document.getElementById('video')
    video.pause()
  }

  const handleFocus = () => {
    const video: any = document.getElementById('video')
    video.play()
  }

  createEffect(() => {
    if (
      (window as any).Hls.isSupported() &&
      !store.app.media.disableAnimatedArtwork &&
      media()?.attributes?.editorialVideo?.motionDetailSquare?.video
    ) {
      const video = document.getElementById('video')
      const hls = new (window as any).Hls()
      hls.loadSource(media().attributes?.editorialVideo?.motionDetailSquare?.video, {
        appData: {
          serviceName: 'web-static-video'
        }
      })
      hls.attachMedia(video)
      hls.on((window as any).Hls.Events.MANIFEST_PARSED, function () {
        ;(video as any).play()
      })

      window.addEventListener('blur', handleBlur)
      window.addEventListener('focus', handleFocus)
    }
  })

  onCleanup(() => {
    window.removeEventListener('blur', handleBlur)
    window.removeEventListener('focus', handleFocus)
  })

  if (media().type === 'uploaded-videos' || media().type === 'music-videos') {
    return (
      <div class={styles['media-info']}>
        <img
          src={
            media().attributes.artwork?.url
              ? Utils.formatArtworkUrl(media()?.attributes?.artwork?.url, 300)
              : Utils.formatArtworkUrl(
                  media().relationships.tracks.data[0].attributes.artwork.url,
                  300
                ) || musicNote
          }
          class={styles['media-info__artwork__video']}
        />
        <div class={styles['media-info__info']}>
          <div class={styles['media-info__info__text']}>
            <h1 class={styles['media-info__info__text__title']}>
              {media().attributes.name}
            </h1>
            {media().type !== 'stations' &&
              media().type !== 'music-videos' &&
              media().type !== 'uploaded-videos' && (
                <h2 class={styles['media-info__info__text__artist']}>
                  {media().attributes.artistName ||
                    media().attributes.curatorName ||
                    media().relationships?.catalog?.data?.[0]?.attributes?.curatorName}
                </h2>
              )}
            {media().type === 'music-videos' ||
              (media().type === 'uploaded-videos' && (
                <h2 class={styles['media-info__info__text__artist']}>
                  {media().attributes.uploadingBrandName}
                </h2>
              ))}
            {media().type !== 'playlists' &&
              media().type !== 'library-playlists' &&
              media().type !== 'stations' &&
              media().type !== 'uploaded-videos' &&
              media().type !== 'music-videos' && (
                <h3 class={styles['media-info__info__text__genre']}>
                  {media().attributes.genreNames[0]} •{' '}
                  {media().attributes.releaseDate.slice(0, 4)}
                </h3>
              )}
            {media().type === 'music-videos' ||
              (media().type === 'uploaded-videos' && (
                <h3 class={styles['media-info__info__text__genre']}>
                  {Utils.formatDate(media().attributes.uploadDate)}
                </h3>
              ))}
          </div>
          <div class={styles['media-info__info__actions']}>
            <PrimaryButton
              icon={faPlay}
              text="Play"
              _class={styles['media-info__info__actions__play-button']}
              onClick={handlePlayClick}
            />
            <PrimaryButton
              icon={faShuffle}
              text="Shuffle"
              _class={styles['media-info__info__actions__shuffle-button']}
              onClick={handleShuffleClick}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div class={styles['media-info']}>
        <div class={styles['media-info__artwork__container']}>
          <img
            src={
              media().attributes.artwork?.url
                ? Utils.formatArtworkUrl(media()?.attributes?.artwork?.url, 300)
                : Utils.formatArtworkUrl(
                    media().relationships.tracks.data[0].attributes.artwork.url,
                    300
                  ) || musicNote
            }
            class={styles['media-info__artwork']}
          />
          {media()?.attributes?.editorialVideo?.motionDetailSquare?.video && (
            <video id="video" class={styles['media-info__artwork__video']} loop={true} />
          )}
        </div>
        <div class={styles['media-info__info']}>
          <div class={styles['media-info__info__text']}>
            <h1 class={styles['media-info__info__text__title']}>
              {media().attributes.name}
            </h1>
            {media().type !== 'stations' && (
              <A
                activeClass=""
                class={styles['media-info__info__text__artist']}
                href={
                  media().attributes.curatorName &&
                  media().relationships?.curator?.data?.[0]?.id
                    ? `/media/curators/${media().relationships?.curator?.data?.[0]?.id}`
                    : artistId === null
                    ? `#`
                    : `/media/artists/${artistId}`
                }
              >
                {media().attributes.artistName ||
                  media().attributes.curatorName ||
                  media().relationships?.catalog?.data?.[0]?.attributes?.curatorName}
              </A>
            )}
            {media().type !== 'playlists' &&
              media().type !== 'library-playlists' &&
              media().type !== 'stations' && (
                <h3 class={styles['media-info__info__text__genre']}>
                  {media()?.attributes?.genreNames?.[0]} •{' '}
                  {media().attributes?.releaseDate?.slice(0, 4)}
                </h3>
              )}
          </div>
          <div class={styles['media-info__info__actions']}>
            <PrimaryButton
              icon={faPlay}
              text="Play"
              _class={styles['media-info__info__actions__play-button']}
              onClick={handlePlayClick}
            />
            <PrimaryButton
              icon={faShuffle}
              text="Shuffle"
              _class={styles['media-info__info__actions__shuffle-button']}
              onClick={handleShuffleClick}
            />
          </div>
        </div>
      </div>
    )
  }
}
