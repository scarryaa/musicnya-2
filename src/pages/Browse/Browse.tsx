import { Switch, Match, For, createEffect } from 'solid-js'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { MediaSelector } from '../../components/MediaSelector/MediaSelector'
import { createBrowseStore } from '../../stores/api-store'
import styles from './Browse.module.scss'

export const Browse = () => {
  const browseStore = createBrowseStore()
  const browseData = browseStore()

  createEffect(() => {
    console.log(browseData())
  })

  return (
    <div class={styles.browse}>
      <Switch fallback={<LoadingSpinner />}>
        <Match when={browseData.state === 'pending'}>
          <LoadingSpinner />
        </Match>
        <Match when={browseData.state === 'errored'}>
          <h1>Error</h1>
        </Match>
        <Match when={browseData.state === 'ready'}>
          <div class={styles.browse}>
            <h1 class={styles.browse__header}>Browse</h1>
            <For
              each={
                browseData().data[0]?.relationships?.tabs?.data[0]?.relationships
                  ?.children?.data
              }
            >
              {item => <MediaSelector item={item} />}
            </For>
          </div>
        </Match>
      </Switch>
    </div>
  )
}
