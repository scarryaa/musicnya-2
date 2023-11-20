import { createSignal, createEffect, onCleanup, For, Match, Switch, Show } from 'solid-js'
import { mkController } from '../../api/mkController'
import { Utils } from '../../util/util'
import styles from './Artists.module.scss'
import { MediaItemSkeleton } from '../../components/Skeletons/MediaItemSkeleton'
import { store } from '../../stores/store'
import { MediaItem } from '../../components/MediaItem/MediaItem'

export const Artists = () => {
  const [data, setData] = createSignal([])
  const [sentinel, setSentinel] = createSignal(null)
  const [fetchingData, setFetchingData] = createSignal(false)
  const [selectedArtist, setSelectedArtist] = createSignal(null)

  let observer

  const handleArtistClick = async (id: string) => {
    setSelectedArtist(id)
  }

  const fetchMoreData = () => {
    if (fetchingData()) return
    setFetchingData(true)
    mkController
      .getArtists(data()?.length.toString())
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
      <div class={styles.artists}>
        <Switch fallback={<div>loading</div>}>
          <Match when={data() && data().length > 0}>
            <h1 class={styles.artists__header}>Artists</h1>
            <div class={styles.artists__content}>
              <div class={styles.artists__content__artists}>
                <For each={data()}>
                  {item => (
                    <div
                      class={styles.artists__item}
                      onClick={e => handleArtistClick(item.id)}
                    >
                      <div class={styles.artists__item__image}>
                        <img
                          src={Utils.formatArtworkUrl(
                            item.relationships?.catalog?.data?.[0]?.attributes.artwork
                              .url,
                            200
                          )}
                          alt={item.attributes.name}
                        />
                      </div>
                      <div class={styles.artists__item__info}>
                        <span class={styles.artists__item__info__name}>
                          {item.attributes.name}
                        </span>
                      </div>
                    </div>
                  )}
                </For>
              </div>
              <Show when={selectedArtist()}>
                <div class={styles.artists__selectedArtist}>
                  <For
                    each={store.library.albums.filter(
                      item =>
                        item.relationships?.artists?.data?.[0]?.id === selectedArtist()
                    )}
                  >
                    {item => (
                      <MediaItem
                        artistId={null}
                        id={item.id}
                        type={item.type}
                        artists={[item.attributes.artistName]}
                        src={Utils.formatArtworkUrl(
                          item.attributes.artwork.url,
                          400,
                          400
                        )}
                        title={item.attributes.name}
                      />
                    )}
                  </For>
                </div>
              </Show>
              {fetchingData() && <MediaItemSkeleton />}
            </div>
          </Match>
        </Switch>
        <div ref={setSentinel} style={{ height: '1px' }}></div>
      </div>
    </div>
  )
}
