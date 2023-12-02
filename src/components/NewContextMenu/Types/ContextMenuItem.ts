import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type ContextMenuItemDefinition = {
  item: {
    icon: IconDefinition
    action: () => void
    label: string
    hasSubMenu?: boolean
    isQuickAction?: boolean
    onMouseEnter?: (e: FocusEvent, id: string) => void
    onMouseLeave?: () => void
    onClick?: (e: MouseEvent, id: string) => void
    id?: string
    active?: boolean
  }
}
