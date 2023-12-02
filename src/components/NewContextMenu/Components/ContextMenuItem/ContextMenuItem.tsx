import Fa from 'solid-fa'
import styles from './ContextMenuItem.module.scss'
import { ContextMenuItemDefinition } from '../../Types/ContextMenuItem'
import useNewContextMenu from '../../../../composables/useNewContextMenu'
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Divider } from '../Divider/Divider'

export const ContextMenuItem = (props: ContextMenuItemDefinition) => {
  const { handleSpaceOrEnter } = useNewContextMenu()

  if (props.item.label === 'divider') {
    return <Divider />
  }

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
        {props.item.icon && (
          <Fa
            icon={props.item.icon}
            size="1x"
            color="var(--color-on-primary)"
            class={styles['context-menu-item-button-icon']}
          />
        )}
        <label class={styles['context-menu-item-button-label']}>{props.item.label}</label>
        {props.item.hasSubMenu && (
          <Fa icon={faChevronRight} size="1x" color="var(--color-on-primary)" />
        )}
        {props.item.active && props.item.active() && (
          <div class={styles['context-menu-item-button-active-indicator']}>
            <Fa icon={faCheck} size="1x" color="var(--color-on-primary)" />
          </div>
        )}
      </div>
    </li>
  )
}
