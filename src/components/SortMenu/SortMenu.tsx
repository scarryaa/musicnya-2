import { createSignal } from 'solid-js'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { LibraryButton } from '../Library/Button/LibraryButton'
import { createDivider, createViewMenuItem } from '../NewContextMenu/ContextMenuItems'
import { ContextMenuItemDefinition } from '../NewContextMenu/Types/ContextMenuItem'

type SortOption = {
  label: string
  value: string
}

type SortMenuProps = {
  initialSort?: string
  initialSortDirection?: string
  sortOptions?: SortOption[]
  onSortChange?: (sort: string, sortDirection: string) => void
  openNewContextMenuWithItems: (
    e: MouseEvent,
    id: string,
    items: ContextMenuItemDefinition[],
    subType: MusicKit.MediaItemType
  ) => void
}

export const SortMenu = (props: SortMenuProps) => {
  const [currentSort, setCurrentSort] = createSignal(props.initialSort || 'none')
  const [currentSortDirection, setCurrentSortDirection] = createSignal(
    props.initialSortDirection || 'ascending'
  )

  const sortOptions = props.sortOptions || [
    { label: 'Name', value: 'name' },
    { label: 'Artist', value: 'artist' },
    { label: 'Release Date', value: 'date' },
    { label: 'Date Added', value: 'date-added' }
  ]

  const handleSortChange = (option: SortOption) => {
    setCurrentSort(option.value)
    props.onSortChange && props.onSortChange(option.value, currentSortDirection())
  }

  const toggleSortDirection = () => {
    const newDirection =
      currentSortDirection() === 'ascending' ? 'descending' : 'ascending'
    setCurrentSortDirection(newDirection)
    props.onSortChange && props.onSortChange(currentSort(), newDirection)
  }

  const sortMenuItems = sortOptions.map(option =>
    createViewMenuItem(
      () => handleSortChange(option),
      option.label,
      option.value,
      false,
      null,
      () => currentSort() === option.value
    )
  )

  sortMenuItems.push(
    createDivider(),
    createViewMenuItem(
      () => toggleSortDirection(),
      'Ascending',
      currentSortDirection(),
      false,
      null,
      () => currentSortDirection() === 'ascending'
    ),
    createViewMenuItem(
      () => toggleSortDirection(),
      'Descending',
      currentSortDirection(),
      false,
      null,
      () => currentSortDirection() === 'descending'
    )
  )

  return (
    <div>
      <LibraryButton
        faIcon={faSort}
        onClick={(e: MouseEvent) =>
          props.openNewContextMenuWithItems(e, '', sortMenuItems, null)
        }
        tooltip="Sort"
      />
    </div>
  )
}
