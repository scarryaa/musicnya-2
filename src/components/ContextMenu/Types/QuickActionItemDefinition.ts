import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type QuickActionItemDefinition = {
  item: {
    icon: IconDefinition
    action: () => void
    disabled?: boolean
    tooltip: string
  }
}
