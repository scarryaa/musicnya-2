import { Switch, Match, For, createEffect } from 'solid-js'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { MediaSelector } from '../../components/MediaSelector/MediaSelector'
import { createRadioStore } from '../../stores/api-store'
import styles from './Radio.module.scss'
export const Radio = () => {
  const radioStore = createRadioStore()
  const radioData = radioStore()

  createEffect(() => {
    console.log(radioData())
  })

  return (
    <div class={styles.radio}>
      <Switch fallback={<LoadingSpinner />}>
        <Match when={radioData.state === 'pending'}>
          <LoadingSpinner />
        </Match>
        <Match when={radioData.state === 'errored'}>
          <h1>Error</h1>
        </Match>
        <Match when={radioData.state === 'ready'}>
          <div class={styles.radio}>
            <h1 class={styles.radio__header}>Radio</h1>
            <For
              each={
                radioData().data[0]?.relationships?.tabs?.data[0]?.relationships?.children
                  ?.data
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
