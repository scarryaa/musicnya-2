import { For } from 'solid-js'
import { store } from '../../../../stores/store'
import { filterMenuItems } from '../../Helpers/ContextMenuHelpers'
import { ActionItem } from '../ActionItem/ActionItem'

export const StandardActions = ({ items }) => (
  <For each={filterMenuItems(store.app.contextMenu.items, false)}>
    {item => <ActionItem item={item} />}
  </For>
)
