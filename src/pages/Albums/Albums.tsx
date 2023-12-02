import { For, Match, Switch, createMemo, createSignal } from 'solid-js'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { Utils } from '../../util/util'
import styles from './Albums.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Search } from '../../components/LibraryActions/Search/Search'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import {
  faArrows,
  faCheck,
  faList,
  faRefresh,
  faTableCells
} from '@fortawesome/free-solid-svg-icons'
import { store } from '../../stores/store'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import useNewContextMenu from '../../composables/useNewContextMenu'
import {
  createDivider,
  createViewMenuItem
} from '../../components/NewContextMenu/ContextMenuItems'
import { MediaList } from '../../components/MediaList/MediaList'

export const Albums = () => {
  const { openNewContextMenuWithItems } = useNewContextMenu()
  const [currentView, setCurrentView] = createSignal('grid' as 'grid' | 'list')
  const [currentSort, setCurrentSort] = createSignal(
    'none' as 'name' | 'none' | 'artist' | 'date' | 'genre' | 'date-added'
  )
  const [currentSortDirection, setCurrentSortDirection] = createSignal(
    'ascending' as 'ascending' | 'descending'
  )
  const [search, setSearch] = createSignal('')
  const changeView = newView => {
    setCurrentView(newView)
  }

  const headers = ['Title', 'Artist', 'Release Date', 'Date Added']

  const viewMenuItems = [
    createViewMenuItem(() => changeView('grid'), 'Grid', 'grid', false, faTableCells),
    createViewMenuItem(() => changeView('list'), 'List', 'list', false, faList)
  ]

  // TODO kind of a hacky way to add checkmarks, fix?
  const sortMenuItems = [
    createViewMenuItem(
      () => setCurrentSort('none'),
      'None',
      'none',
      false,
      null,
      () => currentSort() === 'none'
    ),
    createViewMenuItem(
      () => setCurrentSort('name'),
      'Name',
      'name',
      false,
      null,
      () => currentSort() === 'name'
    ),
    createViewMenuItem(
      () => setCurrentSort('artist'),
      'Artist',
      'artist',
      false,
      null,
      () => currentSort() === 'artist'
    ),
    createViewMenuItem(
      () => setCurrentSort('date'),
      'Release Date',
      'date',
      false,
      null,
      () => currentSort() === 'date'
    ),
    createViewMenuItem(
      () => setCurrentSort('date-added'),
      'Date Added',
      'date-added',
      false,
      null,
      () => currentSort() === 'date-added'
    ),
    createDivider(),
    createViewMenuItem(
      () => setCurrentSortDirection('ascending'),
      'Ascending',
      'ascending',
      false,
      null,
      () => currentSortDirection() === 'ascending'
    ),
    createViewMenuItem(
      () => setCurrentSortDirection('descending'),
      'Descending',
      'descending',
      false,
      null,
      () => currentSortDirection() === 'descending'
    )
  ]

  const refreshAlbums = () => {
    store.library.refreshAlbums().catch(e => {
      console.error(e)
    })
  }

  const handleViewClick = (e: MouseEvent) => {
    openNewContextMenuWithItems(e, '', viewMenuItems, null)
  }

  const handleSortClick = (e: MouseEvent) => {
    openNewContextMenuWithItems(e, '', sortMenuItems, null)
  }

  const sortAlbums = (a, b) => {
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

  const changeSort = e => {
    setCurrentSort(e.target.value)
  }

  const actions = (
    <div class={styles.albums__actions}>
      <LibraryButton
        faIcon={faTableCells}
        onClick={(e: MouseEvent) => handleViewClick(e)}
        tooltip="View"
      />
      <LibraryButton
        faIcon={faArrows}
        onClick={(e: MouseEvent) => handleSortClick(e)}
        tooltip="Sort"
      />
      <LibraryButton faIcon={faRefresh} onClick={refreshAlbums} tooltip="Refresh" />
      <Search onInput={e => setSearch(e.target.value)} />
    </div>
  )
  return (
    <LibraryShell title={'Albums'} actions={actions}>
      <div class={styles.albums}>
        <Switch>
          <Match when={store.library.albums.length === 0}>
            <LoadingSpinner />
          </Match>
          <Match when={currentView() === 'grid'}>
            <div class={styles.albums__grid}>
              <For each={filteredAlbums()}>
                {album => {
                  return (
                    <div class={styles.albums__item}>
                      <MediaItem
                        artistId={
                          album.relationships.artists.data[0].relationships.catalog
                            .data[0].id
                        }
                        artists={[album.relationships.artists.data[0].attributes.name]}
                        id={album.id}
                        type={album.type}
                        title={album.attributes.name}
                        src={Utils.formatArtworkUrl(album.attributes.artwork?.url, 200)}
                      />
                    </div>
                  )
                }}
              </For>
            </div>
          </Match>
          <Match when={currentView() === 'list'}>
            <div class={styles.albums__list}>
              <MediaList headers={headers} items={filteredAlbums} />
            </div>
          </Match>
        </Switch>
      </div>
    </LibraryShell>
  )
}
