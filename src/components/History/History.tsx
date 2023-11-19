import { For, createEffect, createSignal } from 'solid-js'
import styles from './History.module.scss'
import { mkController } from '../../api/mkController'
import { QueueItem } from '../QueueItem/QueueItem'
import { HistoryItem } from '../HistoryItem/HistoryItem'

export const History = () => {
  const [history, setHistory] = createSignal([])

  createEffect(() => {
    mkController.getHistory().then(res => setHistory(res.data))
  })

  return (
    <div class={styles.history}>
      <div class={styles.history__inner}>
        <For each={history()}>
          {(item, index) => <HistoryItem item={item} index={index()} />}
        </For>
      </div>
    </div>
  )
}
