import { For, createEffect, createSignal } from 'solid-js'
import styles from './History.module.scss'
import { HistoryItem } from '../HistoryItem/HistoryItem'
import { mkApiManager } from '../../api/MkApiManager'

export const History = () => {
  const [history, setHistory] = createSignal([])

  createEffect(() => {
    mkApiManager.getRecentSongs().then(res => setHistory(res.data))
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
