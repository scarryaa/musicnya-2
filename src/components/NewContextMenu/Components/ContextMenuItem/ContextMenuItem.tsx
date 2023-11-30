import Fa from 'solid-fa'
import styles from './ContextMenuItem.module.scss'
import { ContextMenuItemDefinition } from '../../Types/ContextMenuItem'

export const ContextMenuItem = (props: ContextMenuItemDefinition) => {
  return (
    <li class={styles['context-menu-item']} role="menuitem" tabIndex={0}>
      <div class={styles['context-menu-item-button']} onClick={() => props.item.action()}>
        <Fa
          icon={props.item.icon}
          size="1x"
          color="var(--color-on-primary)"
          class={styles['context-menu-item-button-icon']}
        />
        <label class={styles['context-menu-item-button-label']}>{props.item.label}</label>
      </div>
    </li>
  )
}
