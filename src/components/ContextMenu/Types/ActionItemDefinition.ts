import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type ActionItemDefinition = {
  item: {
    icon: IconDefinition
    action: () => void
    label: string
    hasSubMenu?: boolean
    onMouseEnter?: (e: MouseEvent, id: string) => void
    onMouseLeave?: () => void
    id?: string
  }
}
