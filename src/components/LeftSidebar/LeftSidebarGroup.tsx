import Fa from 'solid-fa'
import styles from './LeftSidebarGroup.module.scss'
import {
  faChevronDown,
  faChevronRight,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'
import { createEffect, createSignal } from 'solid-js'
import { localStorageService } from '../../services/localStorageService'

export const LeftSidebarGroup = ({ title, children }) => {
  const [showChildren, setShowChildren] = createSignal(true)

  createEffect(() => {
    const storedValue = localStorageService.get(`leftSidebarGroup-${title}`)
    if (storedValue === 'false') {
      setShowChildren(false)
    }
  })

  const handleGroupClick = () => {
    setShowChildren(!showChildren())
    localStorage.setItem(
      `leftSidebarGroup-${title}`,
      showChildren() === true ? 'true' : 'false'
    )
  }

  return (
    <div class={styles['left-sidebar-group']}>
      <div class={styles['left-sidebar-group__header']} onClick={handleGroupClick}>
        <div class={styles['left-sidebar-group__header__title']}>{title}</div>
        <Fa
          icon={showChildren() ? faChevronDown : faChevronRight}
          size="xs"
          color="var(--color-sidebar-button)"
        />
      </div>
      {showChildren() && (
        <div class={styles['left-sidebar-group__children']}>{children}</div>
      )}
    </div>
  )
}
