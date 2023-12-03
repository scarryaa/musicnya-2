import { faList, faTableCells } from '@fortawesome/free-solid-svg-icons'
import { LibraryButton } from '../Library/Button/LibraryButton'
import { Accessor, createMemo } from 'solid-js'

type ViewMenuProps = {
  currentView: Accessor<string>
  onViewChange: (e: MouseEvent) => void
}

export const ViewMenu = (props: ViewMenuProps) => {
  const icon = createMemo(() => (props.currentView() === 'list' ? faList : faTableCells))

  return (
    <LibraryButton
      faIcon={icon()}
      onClick={(e: MouseEvent) => {
        props.onViewChange(e)
      }}
      tooltip="View"
    />
  )
}
