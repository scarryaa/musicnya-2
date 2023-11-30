import Fa from 'solid-fa'
import styles from './QuickActionItem.module.scss'
import Tooltip from '../../../Tooltip/Tooltip'
import { QuickActionItemDefinition } from '../../Types/QuickActionItemDefinition'
import { onSpaceOrEnter } from '../../../NewContextMenu/Helpers/ContextMenuHelpers'

Tooltip

export const QuickActionItem = ({ item }: QuickActionItemDefinition) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    onSpaceOrEnter(e, item.action)
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      class={`${styles['quick-action-item']} ${item.disabled ? 'disabled' : ''}`}
      onclick={!item.disabled ? item.action : undefined}
      use:Tooltip={['bottom', item.tooltip, true, 0]}
      aria-disabled={item.disabled}
    >
      <Fa icon={item.icon} size="1x" />
    </div>
  )
}
