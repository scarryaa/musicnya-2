import { For, Match, Switch, createEffect } from 'solid-js'
import { createHomeStore } from '../../stores/api-store'
import styles from './Home.module.scss'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { Utils } from '../../util/util'
import { Shelf } from '../../components/Shelf/Shelf'

export const Home = () => {
  const homeStore = createHomeStore()
  const homeData = homeStore()

  createEffect(() => {
    console.log(homeData())
  })

  return (
    <div class={styles.home}>
      <Switch fallback={<h1>Loading...</h1>}>
        <Match when={homeData.state === 'loading'}>
          <h1>Loading...</h1>
        </Match>
        <Match when={homeData.state === 'error'}>
          <h1>Error</h1>
        </Match>
        <Match when={homeData.state === 'ready'}>
          <div class={styles.home}>
            <h1>Home</h1>
            <For each={homeData().data}>
              {item => (
                <Shelf>
                  <For each={item.relationships.contents.data}>
                    {mediaItem => (
                      <MediaItem
                        src={Utils.formatArtworkUrl(
                          mediaItem.attributes.artwork.url,
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
