import { createMemo, createSignal } from 'solid-js'
import styles from './Playlists.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Search } from '../../components/LibraryActions/Search/Search'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import { faList, faRefresh, faTableCells } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../stores/store'
import { PlaylistView } from './Components/PlaylistView/PlaylistView'
import { ViewMenu } from '../../components/ViewMenu/ViewMenu'
import { SortMenu } from '../../components/SortMenu/SortMenu'
import useNewContextMenu from '../../composables/useNewContextMenu'
import { createViewMenuItem } from '../../components/NewContextMenu/ContextMenuItems'

export const Playlists = () => {
  const [currentSort, setCurrentSort] = createSignal('name')
  const [currentSortDirection, setCurrentSortDirection] = createSignal('ascending')

  const { openNewContextMenuWithItems } = useNewContextMenu()
  const [currentView, setCurrentView] = createSignal('grid' as 'grid' | 'list')
  const [search, setSearch] = createSignal('')
  const changeView = newView => {
    setCurrentView(newView)
  }

  const refreshPlaylists = () => {
    store.library.refreshPlaylists().catch(e => {
      console.error(e)
    })
  }

  const headers = ['Title', 'Date Added', 'Date Modified']

  const viewMenuItems = [
    createViewMenuItem(() => changeView('grid'), 'Grid', 'grid', false, faTableCells),
    createViewMenuItem(() => changeView('list'), 'List', 'list', false, faList)
  ]

  const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Date Added', value: 'date-added' },
    { label: 'Date Modified', value: 'date-modified' }
  ]

  const sortPlaylists = (a, b) => {
    const sort = currentSort()
    const direction = currentSortDirection()
    if (sort === 'none') {
      return direction === 'ascending' ? 1 : -1
    } else if (sort === 'name') {
      return direction === 'ascending'
        ? a.attributes.name.localeCompare(b.attributes.name)
        : b.attributes.name.localeCompare(a.attributes.name)
    } else if (sort === 'artist') {
      return direction === 'ascending'
        ? a.relationships.artists.data[0].attributes.name.localeCompare(
            b.relationships.artists.data[0].attributes.name
          )
        : b.relationships.artists.data[0].attributes.name.localeCompare(
            a.relationships.artists.data[0].attributes.name
          )
    } else if (sort === 'date-added') {
      return direction === 'ascending'
        ? a.attributes.dateAdded.localeCompare(b.attributes.dateAdded)
        : b.attributes.dateAdded.localeCompare(a.attributes.dateAdded)
    } else if (sort === 'date-modified') {
      return direction === 'ascending'
        ? a.attributes.lastModifiedDate.localeCompare(b.attributes.lastModifiedDate)
        : b.attributes.lastModifiedDate.localeCompare(a.attributes.lastModifiedDate)
    }
  }

  const filteredPlaylists = createMemo(() => {
    const term = search().toLowerCase()
    const filtered = store.library.playlists.filter(playlist =>
      playlist.attributes.name.toLowerCase().includes(term)
    )

    return filtered.sort(sortPlaylists)
  })

  const handleViewClick = (e: MouseEvent) => {
    openNewContextMenuWithItems(e, '', viewMenuItems, null)
  }

  const actions = (
    <div class={styles.playlists__actions}>
      <ViewMenu
        currentView={currentView}
        onViewChange={(e: MouseEvent) => handleViewClick(e)}
      />
      <SortMenu
        initialSort={currentSort()}
        initialSortDirection={currentSortDirection()}
        sortOptions={sortOptions}
        onSortChange={(newSort, newDirection) => {
          setCurrentSort(newSort)
          setCurrentSortDirection(newDirection)
        }}
        openNewContextMenuWithItems={openNewContextMenuWithItems}
      />
      <LibraryButton faIcon={faRefresh} onClick={refreshPlaylists} tooltip="Refresh" />
      <Search onInput={e => setSearch(e.target.value)} />
    </div>
  )
  return (
    <LibraryShell title={'Playlists'} actions={actions}>
      <PlaylistView
        playlists={filteredPlaylists}
        headers={headers}
        currentView={currentView}
      />
    </LibraryShell>
  )
}
