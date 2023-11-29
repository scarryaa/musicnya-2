import { For } from 'solid-js'
import { store } from '../../../../stores/store'
import { filterMenuItems } from '../../Helpers/ContextMenuHelpers'
import { ActionItem } from '../ActionItem/ActionItem'
import { MenuItem } from '../../Types/MenuItem'

export const StandardActions = () => (
  <For each={filterMenuItems(store.app.contextMenu.items as MenuItem[], false)}>
    {item => <ActionItem item={item} />}
  </For>
)
