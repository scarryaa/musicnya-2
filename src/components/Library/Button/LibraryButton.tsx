import Fa from 'solid-fa'
import styles from './LibraryButton.module.scss'
import Tooltip from '../../Tooltip/Tooltip'

export const LibraryButton = ({ faIcon, tooltip }) => {
  return (
    <div class={styles.libraryButton} use:Tooltip={['bottom', tooltip, tooltip, 0]}>
      <Fa icon={faIcon} size="sm" color="var(--app-text-color)" />
    </div>
  )
}
