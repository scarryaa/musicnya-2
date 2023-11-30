import Fa from 'solid-fa'
import styles from './ContextMenuItem.module.scss'
import { ContextMenuItemDefinition } from '../../Types/ContextMenuItem'
import useNewContextMenu from '../../../../composables/useNewContextMenu'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export const ContextMenuItem = (props: ContextMenuItemDefinition) => {
  const { handleSpaceOrEnter } = useNewContextMenu()

  return (
    <li
      class={styles['context-menu-item']}
      role="menuitem"
      tabIndex={-1}
      aria-haspopup={props.item.hasSubMenu}
      onKeyDown={e => handleSpaceOrEnter(e, props.item.action)}
      onFocus={e => props.item.onMouseEnter(e, props.item.id)}
      onBlur={props.item.onMouseLeave}
      onMouseEnter={e => props.item.onMouseEnter(e, props.item.id)}
      onMouseLeave={props.item.onMouseLeave}
    >
      <div class={styles['context-menu-item-button']} onClick={() => props.item.action()}>
        <Fa
          icon={props.item.icon}
          size="1x"
          color="var(--color-on-primary)"
          class={styles['context-menu-item-button-icon']}
        />
        <label class={styles['context-menu-item-button-label']}>{props.item.label}</label>
        {props.item.hasSubMenu && (
          <Fa icon={faChevronRight} size="1x" color="var(--color-on-primary)" />
        )}
      </div>
    </li>
  )
}
