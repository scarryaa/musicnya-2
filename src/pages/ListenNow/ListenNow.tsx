import { For, Match, Switch, createEffect } from 'solid-js'
import { createHomeStore } from '../../stores/api-store'
import styles from './ListenNow.module.scss'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { Utils } from '../../util/util'
import { Shelf } from '../../components/Shelf/Shelf'
import musicNote from '../../assets/music_note.png'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { MediaSelector } from '../../components/MediaSelector/MediaSelector'

export const ListenNow = () => {
  const homeStore = createHomeStore()
  const homeData = homeStore()

  createEffect(() => {
    console.log(homeData())
  })

  return (
    <div class={styles.listenNow}>
      <Switch fallback={<LoadingSpinner />}>
        <Match when={homeData.state === 'pending'}>
          <LoadingSpinner />
        </Match>
        <Match when={homeData.state === 'errored'}>
          <h1>Error</h1>
        </Match>
        <Match when={homeData.state === 'ready'}>
          <div class={styles.listenNow}>
            <h1 class={styles.listenNow__header}>Listen Now</h1>
            <For each={homeData().data}>{item => <MediaSelector item={item} />}</For>
          </div>
        </Match>
      </Switch>
    </div>
  )
}
