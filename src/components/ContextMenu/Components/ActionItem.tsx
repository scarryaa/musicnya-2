import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import styles from './ActionItem.module.scss'
import Fa from 'solid-fa'

export const ActionItem = ({ item }) => {
  return (
    <div
      class={styles.actionItem}
      onclick={item.action}
      onMouseOver={item.onMouseOver}
      onMouseLeave={item.onMouseLeave}
    >
      <div class={styles.actionItem__icon}>
        <Fa icon={item.icon} size="1x" color="var(--color-on-primary)" />
      </div>
      <span class={styles.actionItem__label}>{item.label}</span>
      {item.hasSubMenu && (
        <Fa icon={faChevronRight} class={styles.actionItem__submenuIcon} />
      )}
    </div>
  )
}
