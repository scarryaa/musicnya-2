import { For, Match, Switch, createEffect } from 'solid-js'
import { createHomeStore } from '../../stores/api-store'
import styles from './ListenNow.module.scss'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { MediaSelector } from '../../components/MediaSelector/MediaSelector'
import { store } from '../../stores/store'

export const ListenNow = () => {
  const homeStore = createHomeStore()
  const homeData = homeStore()

  createEffect(() => {
    if (store.isAuthorized) {
      homeStore()
    }
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
