import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type MenuItem = {
  action: () => void
  disabled?: boolean
  icon: IconDefinition
  isQuickAction?: boolean
  label: string
  hasSubMenu?: boolean
  onMouseEnter?: (e: MouseEvent, id: string) => void
  onMouseLeave?: () => void
  tooltip: string
  id?: string
  index?: number
}
