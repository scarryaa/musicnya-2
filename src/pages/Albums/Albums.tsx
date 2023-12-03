import { createMemo, createSignal } from 'solid-js'
import styles from './Albums.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Search } from '../../components/LibraryActions/Search/Search'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import { faList, faRefresh, faTableCells } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../stores/store'
import useNewContextMenu from '../../composables/useNewContextMenu'
import { createViewMenuItem } from '../../components/NewContextMenu/ContextMenuItems'
import { AlbumView } from './Components/AlbumView/AlbumView'
import { SortMenu } from '../../components/SortMenu/SortMenu'
import { ViewMenu } from '../../components/ViewMenu/ViewMenu'

export const Albums = () => {
  const [currentSort, setCurrentSort] = createSignal('name')
  const [currentSortDirection, setCurrentSortDirection] = createSignal('ascending')

  const { openNewContextMenuWithItems } = useNewContextMenu()
  const [currentView, setCurrentView] = createSignal('grid' as 'grid' | 'list')
  const [search, setSearch] = createSignal('')
  const changeView = newView => {
    setCurrentView(newView)
  }

  const headers = ['Title', 'Artist', 'Release Date', 'Date Added']

  const viewMenuItems = [
    createViewMenuItem(() => changeView('grid'), 'Grid', 'grid', false, faTableCells),
    createViewMenuItem(() => changeView('list'), 'List', 'list', false, faList)
  ]

  const refreshAlbums = () => {
    store.library.refreshAlbums().catch(e => {
      console.error(e)
    })
  }

  const handleViewClick = (e: MouseEvent) => {
    openNewContextMenuWithItems(e, '', viewMenuItems, null)
  }

  const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Artist', value: 'artist' },
    { label: 'Release Date', value: 'date' },
    { label: 'Date Added', value: 'date-added' }
  ]

  const sortAlbums = (a: MusicKit.Albums, b: MusicKit.Albums) => {
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
    } else if (sort === 'date') {
      return direction === 'ascending'
        ? a.attributes.releaseDate.localeCompare(b.attributes.releaseDate)
        : b.attributes.releaseDate.localeCompare(a.attributes.releaseDate)
    }
  }

  const filteredAlbums = createMemo(() => {
    const term = search().toLowerCase()
    const filtered = store.library.albums.filter(album =>
      album.attributes.name.toLowerCase().includes(term)
    )

    return filtered.sort(sortAlbums)
  })

  const actions = (
    <div class={styles.albums__actions}>
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
      <LibraryButton faIcon={faRefresh} onClick={refreshAlbums} tooltip="Refresh" />
      <Search onInput={e => setSearch(e.target.value)} />
    </div>
  )

  return (
    <LibraryShell title={'Albums'} actions={actions}>
      <AlbumView albums={filteredAlbums} headers={headers} currentView={currentView} />
    </LibraryShell>
  )
}
