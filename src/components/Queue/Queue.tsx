import { For, createEffect, createSignal } from 'solid-js'
import styles from './Queue.module.scss'
import { store } from '../../stores/store'
import { QueueItem } from '../QueueItem/QueueItem'
import Fa from 'solid-fa'
import { faInfinity } from '@fortawesome/free-solid-svg-icons'

export const Queue = () => {
  const [queueItems, setQueueItems] = createSignal(store.app.queue.items)

  createEffect(() => {
    setQueueItems(store.app.queue.items)
  }, [store.app.queue.items])

  return (
    <div class={styles.queue}>
      <div class={styles.queue__header}>
        <button class={styles.queue__header__clear}>Clear</button>
        <button class={styles.queue__header__autoplayButton}>
          <Fa icon={faInfinity} />
        </button>
      </div>

      {queueItems().length > 0 && (
        <div class={styles.queue__content}>
          <h4 class={styles.queue__upNext}>Up Next</h4>
          <For each={queueItems().slice(0, 1)}>
            {(item, index) => <QueueItem item={item} />}
          </For>

          <h4 class={styles.queue__queue}>Queue</h4>
          <For each={queueItems().slice(1, queueItems().length)}>
            {(item, index) => <QueueItem item={item} />}
          </For>
        </div>
      )}
    </div>
  )
}
