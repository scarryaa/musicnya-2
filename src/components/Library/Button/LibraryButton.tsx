import Fa from 'solid-fa'
import styles from './LibraryButton.module.scss'
import Tooltip from '../../Tooltip/Tooltip'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
Tooltip

type LibraryButtonProps = {
  faIcon: IconDefinition
  tooltip: string
  onClick: (e: MouseEvent) => void
}

export const LibraryButton = ({ faIcon, tooltip, onClick }: LibraryButtonProps) => {
  return (
    <div
      class={styles['library-button']}
      use:Tooltip={['bottom', tooltip, tooltip, 0]}
      onClick={onClick}
    >
      <Fa icon={faIcon} size="sm" color="var(--color-on-primary)" />
    </div>
  )
}
