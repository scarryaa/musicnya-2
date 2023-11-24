import Fa from 'solid-fa'
import { For } from 'solid-js'
import { store } from '../../../stores/store'
import styles from './SubContextMenu.module.scss'
import { ActionItem } from './ActionItem'

export const SubContextMenu = () => {
  return (
    <div
      class={styles.subContextMenu}
      style={`display: ${
        store.app.subContextMenu.open ? 'block' : 'none'
      }; top: calc(0px + ${
        store.app.subContextMenu.y
      }px); left: 100%; position: absolute; width: 100%; max-height: 200px; overflow-y: auto;`}
    >
      <For each={store.app.subContextMenu.items}>
        {item => <ActionItem item={item} />}
      </For>
    </div>
  )
}
