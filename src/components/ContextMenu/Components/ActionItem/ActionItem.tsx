import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import styles from './ActionItem.module.scss'
import Fa from 'solid-fa'
import { ActionItemDefinition } from '../../Types/ActionItemDefinition'

export const ActionItem = ({ item }: ActionItemDefinition) => {
  return (
    <div
      class={styles['action-item']}
      onclick={item.action}
      onMouseEnter={e => item.onMouseEnter(e, item.id)}
      onMouseLeave={item.onMouseLeave}
    >
      <div class={styles['action-item__icon']}>
        <Fa icon={item.icon} size="1x" color="var(--color-on-primary)" />
      </div>
      <span class={styles['action-item__label']}>{item.label}</span>
      {item.hasSubMenu && (
        <Fa icon={faChevronRight} class={styles['action-item__submenuIcon']} />
      )}
    </div>
  )
}
