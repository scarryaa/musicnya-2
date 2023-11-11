import { For, Match, Switch, createEffect } from 'solid-js'
import { createHomeStore } from '../../stores/api-store'
import styles from './Home.module.scss'

export const Home = () => {
  const homeStore = createHomeStore()
  const homeData = homeStore()

  createEffect(() => {
    console.log(homeData())
  })

  return (
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
              <div>
                <h1>{item.id}</h1>
                <p>{item.attributes.title.stringForDisplay}</p>
                <image
                  class={styles.home__image}
                  src={item.relationships.contents.data[0].attributes.artwork.url
                    .replace('{w}x{h}', '100x100')
                    .replace('{f}', 'png')}
                  onClick={() =>
                    MusicKit.getInstance().setQueue({
                      album: item.relationships.contents.data[0].id,
                      startPlaying: true
                    })
                  }
                />
              </div>
            )}
          </For>
        </div>
      </Match>
    </Switch>
  )
}
