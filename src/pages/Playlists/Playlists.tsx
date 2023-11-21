import { For, Match, Switch, createMemo, createSignal } from 'solid-js'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { Utils } from '../../util/util'
import styles from './Playlists.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Search } from '../../components/LibraryActions/Search/Search'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import { faArrows, faRefresh, faTableCells } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../stores/store'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import musicNote from '../../assets/music_note.png'

export const Playlists = () => {
  const [currentView, setCurrentView] = createSignal('grid' as 'grid' | 'list')
  const [currentSort, setCurrentSort] = createSignal(
    'none' as 'name' | 'none' | 'artist' | 'date' | 'genre'
  )
  const [search, setSearch] = createSignal('')
  console.log(store.library.playlists)

  const refreshPlaylists = () => {
    store.library.refreshPlaylists()
  }

  const sortPlaylists = (a, b) => {
    const sort = currentSort()
    switch (sort) {
      case 'name':
        return a.attributes.name.localeCompare(b.attributes.name)
      case 'artist':
        return a.relationships.artists.data[0].attributes.name.localeCompare(
          b.relationships.artists.data[0].attributes.name
        )
      case 'date':
        // @ts-ignore
        return new Date(a.attributes.releaseDate) - new Date(b.attributes.releaseDate)
      case 'genre':
        return a.attributes.genreNames[0].localeCompare(b.attributes.genreName[0])
      default:
        return 0
    }
  }

  const filteredPlaylists = createMemo(() => {
    const term = search().toLowerCase()
    const filtered = store.library.playlists.filter(playlist =>
      playlist.attributes.name.toLowerCase().includes(term)
    )

    return filtered.sort(sortPlaylists)
  })

  const changeSort = e => {
    setCurrentSort(e.target.value)
  }

  const actions = (
    <div class={styles.playlists__actions}>
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
      <LibraryButton faIcon={faRefresh} onClick={refreshPlaylists} tooltip="Refresh" />
      <Search onInput={e => setSearch(e.target.value)} />
    </div>
  )
  return (
    <LibraryShell title={'Playlists'} actions={actions}>
      <div class={styles.playlists}>
        <Switch>
          <Match when={store.library.playlists.length === 0}>
            <LoadingSpinner />
          </Match>
          <Match when={currentView() === 'grid'}>
            <div class={styles.playlists__grid}>
              <For each={filteredPlaylists()}>
                {playlist => {
                  return (
                    <div class={styles.playlists__item}>
                      <MediaItem
                        artistId={null}
                        artists={[playlist.attributes.artistName]}
                        id={playlist.id}
                        src={Utils.formatArtworkUrl(
                          playlist.attributes?.artwork?.url || musicNote,
                          400,
                          400
                        )}
                        title={playlist.attributes.name}
                        type={playlist.type}
                      />
                    </div>
                  )
                }}
              </For>
            </div>
          </Match>
          <Match when={currentView() === 'list'}>
            <div class={styles.playlists__list}></div>
          </Match>
        </Switch>
      </div>
    </LibraryShell>
  )
}
