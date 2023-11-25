import { For, createEffect, createSignal, onCleanup } from 'solid-js'
import styles from './SongTable.module.scss'
import { Utils } from '../../util/util'
import { mkController } from '../../api/mkController'
import Fa from 'solid-fa'
import { faEllipsisH, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../stores/store'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'
import { SongTableSkeleton } from '../Skeletons/SongTableSkeleton'
import { SongTableItem } from '../SongTableItem/SongTableItem'
import { mkApiManager } from '../../api/MkApiManager'

export const SongTable = ({ data }) => {
  const [sentinel, setSentinel] = createSignal(null)
  const [tracks, setTracks] = createSignal(null)
  const [isFetchingComplete, setIsFetchingComplete] = createSignal(false)
  const [isFetching, setIsFetching] = createSignal(false)
  const rowHeight = 55
  const totalTracks = data().attributes.trackCount
  const [remainingTracks, setRemainingTracks] = createSignal(
    totalTracks - tracks()?.length ?? 0
  )
  const [trackCount, setTrackCount] = createSignal(0)
  const [duration, setDuration] = createSignal('')

  createEffect(() => {
    setTracks(data().relationships.tracks.data)
    setTrackCount(data().attributes.trackCount || data().relationships.tracks.data.length)
    setDuration(
      Utils.formatTimeHours(
        data()
          .relationships.tracks.data.filter(track => track.attributes.durationInMillis)
          .reduce((a, b) => a + b.attributes.durationInMillis, 0) / 1000
      )
    )
    console.log(data().relationships)

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
      if (entries[0].isIntersecting && !isFetchingComplete() && !isFetching()) {
        setIsFetching(true)
        mkApiManager.fetchMoreTracks(data().id, data().type, tracks().length).then(
          res => {
            if (res && res.data) {
              setTracks([...tracks(), ...res.data])
              if (res.data.length < 100) {
                setIsFetchingComplete(true)
                observer.disconnect()
              }
              setTrackCount(tracks().length)
              setDuration(
                Utils.formatTimeHours(
                  tracks()
                    .filter(track => track.attributes.durationInMillis)
                    .reduce((a, b) => a + b.attributes.durationInMillis, 0) / 1000
                )
              )

              setRemainingTracks(totalTracks - tracks().length)
            }
            setIsFetching(false)
            setIsFetchingComplete(true)
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
              <SongTableItem data={data} track={track} index={index()} />
            )}
          </For>
        </tbody>
      </table>
      <div ref={setSentinel} style={{ height: '1px' }}></div>
      {isFetching() && <SongTableSkeleton />}
      <div class={styles.album__tracks__info}>
        {data().type.includes('albums') && (
          <span class={styles.album__tracks__releaseDate}>
            {Utils.formatDate(data().attributes.releaseDate)}
          </span>
        )}
        <div class={styles.album__tracks__trackCount}>
          {trackCount()} tracks
          {', '}
          {duration()}
        </div>
        <div class={styles.album__tracks__copyright}>{data().attributes.copyright}</div>
      </div>
    </div>
  )
}
