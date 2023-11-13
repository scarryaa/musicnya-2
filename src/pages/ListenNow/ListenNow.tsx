import { For, Match, Switch, createEffect } from 'solid-js'
import { createHomeStore } from '../../stores/api-store'
import styles from './ListenNow.module.scss'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { Utils } from '../../util/util'
import { Shelf } from '../../components/Shelf/Shelf'
import musicNote from '../../assets/music_note.png'

export const ListenNow = () => {
  const homeStore = createHomeStore()
  const homeData = homeStore()

  createEffect(() => {
    console.log(homeData())
  })

  return (
    <div class={styles.listenNow}>
      <Switch fallback={<h1>Loading...</h1>}>
        <Match when={homeData.state === 'loading'}>
          <h1>Loading...</h1>
        </Match>
        <Match when={homeData.state === 'error'}>
          <h1>Error</h1>
        </Match>
        <Match when={homeData.state === 'ready'}>
          <div class={styles.listenNow}>
            <h1 class={styles.listenNow__header}>Listen Now</h1>
            <For each={homeData().data}>
              {item => (
                <Shelf header={item.attributes.title?.stringForDisplay}>
                  <For each={item.relationships.contents.data}>
                    {mediaItem => (
                      <MediaItem
                        id={mediaItem.id}
                        type={mediaItem.type}
                        title={mediaItem.attributes.name}
                        artists={[
                          mediaItem.attributes.artistName ||
                            mediaItem.attributes.curatorName ||
                            ' '
                        ]}
                        src={Utils.formatArtworkUrl(
                          mediaItem.attributes?.artwork?.url || musicNote,
                          200
                        )}
                      />
                    )}
                  </For>
                </Shelf>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </div>
  )
}
