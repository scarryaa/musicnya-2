import { For, createEffect, createSignal, onCleanup } from 'solid-js'
import styles from './SongTable.module.scss'
import { Utils } from '../../util/util'
import { mkController } from '../../api/mkController'
import Fa from 'solid-fa'
import { faEllipsisH, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../stores/store'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { SongTableSkeleton } from '../Skeletons/SongTableSkeleton'

export const SongTable = ({ data }) => {
  const [sentinel, setSentinel] = createSignal(null)
  const [tracks, setTracks] = createSignal(null)
  const [isFetchingComplete, setIsFetchingComplete] = createSignal(false)
  const [isFetching, setIsFetching] = createSignal(false)

  createEffect(() => {
    setTracks(data().relationships.tracks.data)

    if (data().relationships.tracks.data.length < 100) {
      console.log('setIsFetchingComplete')
      setIsFetchingComplete(true)
    } else {
      console.log('setIsFetchingComplete false')
      setIsFetchingComplete(false)
    }

    if (sentinel()) {
      observer.observe(sentinel())
    }
  }, [data])

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && !isFetchingComplete()) {
        setIsFetching(true)
        mkController.fetchMoreTracks(data().id, data().type, tracks().length).then(
          res => {
            if (res && res.data) {
              setTracks([...tracks(), ...res.data])
              if (res.data.length < 100) {
                setIsFetchingComplete(true)
                observer.disconnect()
              }
              setIsFetching(false)
            }
          },
          err => {
            console.error(err)
            setIsFetchingComplete(true)
            setIsFetching(false)
          }
        )
      }
    },
    { rootMargin: '100px' }
  )

  onCleanup(() => {
    if (sentinel()) {
      observer.unobserve(sentinel())
    }
  })

  return (
    <div class={styles.album__tracks}>
      <table class={styles.album__tracks__table}>
        <thead>
          <tr>
            <th class={styles.album__tracks__table__number}>#</th>
            <th>Title</th>
            {data().type !== 'albums' && data().type !== 'library-albums' && (
              <th class={styles.album__tracks__table__album}>Album</th>
            )}
            <th class={styles.album__tracks__table__time}>Time</th>
          </tr>
        </thead>
        <tbody>
          <For each={tracks()}>
            {(track, index) => (
              <tr
                onDblClick={() => mkController.setQueue(data().id, data().type, index())}
              >
                <td class={styles.album__tracks__table__number}>
                  <span class={styles.album__tracks__table__number__popularity}>
                    {data().type === 'albums' && track.meta.popularity > 0.7 && (
                      <Fa icon={faStar} color="var(--app-text-color)" size="xs" />
                    )}
                  </span>
                  <span class={styles.album__tracks__table__number__number}>
                    {index() + 1}
                  </span>
                  <div
                    class={styles.album__tracks__table__number__playButton}
                    onClick={() => mkController.setQueue(data().id, data().type, index())}
                  >
                    {track.id === store.currentTrack.id ? (
                      <Fa icon={faPause} size="1x" color="var(--app-primary-color)" />
                    ) : (
                      <Fa icon={faPlay} size="1x" color="var(--app-text-color)" />
                    )}
                  </div>
                </td>
                <td>
                  <div class={styles.album__tracks__table__title}>
                    {data().type !== 'albums' && data().type !== 'library-albums' && (
                      <div class={styles.album__tracks__table__title__albumCover}>
                        <img
                          src={Utils.formatArtworkUrl(track.attributes.artwork.url, 50)}
                        />
                      </div>
                    )}
                    <div class={styles.album__tracks__table__title__name__artist}>
                      <span
                        class={styles.album__tracks__table__title__name__artist__name}
                        style={{
                          color:
                            track.id === store.currentTrack.id
                              ? 'var(--app-primary-color)'
                              : 'var(--app-text-color)'
                        }}
                      >
                        {track.attributes.name}
                        {(track.relationships.catalog?.data?.[0]?.attributes
                          .contentRating === 'explicit' ||
                          track.attributes.contentRating === 'explicit') && (
                          <span
                            class={
                              styles.album__tracks__table__title__name__artist__name__explicit
                            }
                          >
                            <small
                              class={
                                styles.album__tracks__table__title__name__artist__name__explicit__text
                              }
                            >
                              E
                            </small>
                          </span>
                        )}
                      </span>
                      <div
                        class={styles.album__tracks__table__title__name__artist__artist}
                      >
                        {track.attributes.artistName}
                      </div>
                    </div>
                  </div>
                </td>
                {data().type !== 'albums' && data().type !== 'library-albums' && (
                  <td class={styles.album__tracks__table__album}>
                    <A
                      href={
                        data().type === 'library-playlists'
                          ? `/media/albums/${
                              track.relationships?.catalog?.data?.[0].attributes?.url
                                ?.split('/')?.[6]
                                ?.split('?')?.[0]
                            }`
                          : `/media/albums/${
                              track?.attributes?.url?.split('/')?.[6]?.split('?')?.[0]
                            }`
                      }
                    >
                      {track.attributes.albumName}
                    </A>
                  </td>
                )}
                <td>
                  <div class={styles.album__tracks__table__time}>
                    <span>
                      {Utils.formatTime(track.attributes.durationInMillis / 1000)}
                    </span>
                    <div class={styles.album__tracks__table__time__moreButton}>
                      <Fa icon={faEllipsisH} size="1x" color="var(--app-text-color)" />
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      {isFetching() && <SongTableSkeleton />}
      <div ref={setSentinel} style={{ height: '1px' }}></div>
    </div>
  )
}