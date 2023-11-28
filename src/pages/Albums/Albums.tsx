import { For, Match, Switch, createMemo, createSignal } from 'solid-js'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { Utils } from '../../util/util'
import styles from './Albums.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Search } from '../../components/LibraryActions/Search/Search'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import { faArrows, faRefresh, faTableCells } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../stores/store'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'

export const Albums = () => {
  const [currentView, setCurrentView] = createSignal('grid' as 'grid' | 'list')
  const [currentSort, setCurrentSort] = createSignal(
    'none' as 'name' | 'none' | 'artist' | 'date' | 'genre'
  )
  const [search, setSearch] = createSignal('')
  console.log(store.library.albums)

  const refreshAlbums = () => {
    store.library.refreshAlbums()
  }

  const sortAlbums = (a, b) => {
    const sort = currentSort()
    switch (sort) {
      case 'name':
        return a.attributes.name.localeCompare(b.attributes.name)
      case 'artist':
        return a.relationships.artists.data[0].attributes.name.localeCompare(
          b.relationships.artists.data[0].attributes.name
        )
      case 'date':
        return new Date(a.attributes.releaseDate) - new Date(b.attributes.releaseDate)
      case 'genre':
        return a.attributes.genreNames[0].localeCompare(b.attributes.genreName[0])
      default:
        return 0
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
        onClick={() => {
          if (currentView() === 'grid') {
            setCurrentView('list')
          } else {
            setCurrentView('grid')
          }
        }}
        tooltip="View"
      />
      <LibraryButton
        faIcon={faArrows}
        onClick={() => {
          if (currentSort() === 'none') {
            setCurrentSort('name')
          } else {
            setCurrentSort('none')
          }
        }}
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
            <div class={styles.albums__list}></div>
          </Match>
        </Switch>
      </div>
    </LibraryShell>
  )
}
