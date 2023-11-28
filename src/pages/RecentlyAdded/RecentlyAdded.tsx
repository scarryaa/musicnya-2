import { createSignal, createEffect, onCleanup, For } from 'solid-js'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { Utils } from '../../util/util'
import styles from './RecentlyAdded.module.scss'
import musicNote from '../../assets/music_note.png'
import { MediaItemSkeleton } from '../../components/Skeletons/MediaItemSkeleton'
import { mkApiManager } from '../../api/MkApiManager'

export const RecentlyAdded = () => {
  const [data, setData] = createSignal([])
  const [sentinel, setSentinel] = createSignal(null)
  const [fetchingData, setFetchingData] = createSignal(false)

  let observer

  const fetchMoreData = () => {
    if (fetchingData()) return
    setFetchingData(true)
    mkApiManager
      .getRecentlyAdded(data()?.length || 0)
      .then(newData => {
        setData([...data(), ...newData.data])
        if (newData.data.length < 25) {
          observer.disconnect()
        }
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setFetchingData(false)
      })
  }

  createEffect(() => {
    observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !fetchingData()) {
          fetchMoreData()
        }
      },
      { rootMargin: '100px' }
    )

    if (sentinel()) {
      observer.observe(sentinel())
    }

    onCleanup(() => {
      if (sentinel()) {
        observer.unobserve(sentinel())
      }
    })
  })

  return (
    <div>
      <div class={styles['recently-added']}>
        <h1 class={styles['recently-added__header']}>Recently Added</h1>
        <div class={styles['recently-added__content']}>
          <For each={data()}>
            {item => (
              <MediaItem
                artists={[item.attributes.artistName]}
                id={item.id}
                src={Utils.formatArtworkUrl(
                  item.attributes?.artwork?.url || musicNote,
                  400,
                  400
                )}
                title={item.attributes.name}
                type={item.type}
              />
            )}
          </For>
          {fetchingData() && <MediaItemSkeleton />}
        </div>
      </div>
      <div ref={setSentinel} style={{ height: '1px' }}></div>
    </div>
  )
}
