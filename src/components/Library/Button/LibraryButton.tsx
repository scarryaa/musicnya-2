import Fa from 'solid-fa'
import styles from './LibraryButton.module.scss'
import Tooltip from '../../Tooltip/Tooltip'

type LibraryButtonProps = {
  faIcon: any
  tooltip: string
  onClick: () => void
}

export const LibraryButton = ({ faIcon, tooltip, onClick }) => {
  return (
    <div
      class={styles.libraryButton}
      use:Tooltip={['bottom', tooltip, tooltip, 0]}
      onClick={onClick}
    >
      <Fa icon={faIcon} size="sm" color="var(--app-text-color)" />
    </div>
  )
}
