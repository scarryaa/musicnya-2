import { For } from 'solid-js'
import { store } from '../../../../stores/store'
import styles from './SubContextMenu.module.scss'
import { ActionItem } from '../ActionItem/ActionItem'
import { MenuItem } from '../../Types/MenuItem'

export const SubContextMenu = () => {
  return (
    <div
      id="subContextMenu"
      class={styles['sub-context-menu']}
      style={`display: ${
        store.app.subContextMenu.open ? 'block' : 'none'
      }; top: calc(0px + ${store.app.subContextMenu.y}px); left: calc(100% + 0px + ${
        store.app.subContextMenu.x
      }px)`}
    >
      <For each={store.app.subContextMenu.items}>
        {(item: MenuItem) => <ActionItem item={item} />}
      </For>
    </div>
  )
}
