import styles from './Artists.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Match, Switch, createMemo, createSignal } from 'solid-js'
import { store } from '../../stores/store'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { ArtistList } from './Components/ArtistList'
import { Artist } from '../../types/api/ItemResponse'
import { ArtistContent } from './Components/ArtistContent'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { SortMenu } from '../../components/SortMenu/SortMenu'
import useNewContextMenu from '../../composables/useNewContextMenu'

export const Artists = () => {
  const { openNewContextMenuWithItems } = useNewContextMenu()

  const sortOptions = [{ label: 'Name', value: 'name' }]
  const [selectedArtistId, setSelectedArtistId] = createSignal('')
  const [currentSort, setCurrentSort] = createSignal('none' as 'name' | 'none' | 'date')
  const [currentSortDirection, setCurrentSortDirection] = createSignal(
    'ascending' as 'ascending' | 'descending'
  )
  const [search, setSearch] = createSignal('')
  const [isRefreshing, setIsRefreshing] = createSignal(false)

  const filteredArtists = createMemo(() => {
    const term = search().toLowerCase()
    const filtered =
      (store.library.artists as Artist[])?.filter((artist: Artist) =>
        artist.attributes.name.toLowerCase().includes(term)
      ) || []

    return filtered.sort((a, b) => {
      if (currentSort() === 'none') {
        return currentSortDirection() === 'ascending' ? 1 : -1
      } else if (currentSort() === 'name') {
        return currentSortDirection() === 'ascending'
          ? a.attributes.name.localeCompare(b.attributes.name)
          : b.attributes.name.localeCompare(a.attributes.name)
      }
    })
  })

  const refreshArtists = () => {
    setIsRefreshing(true)
    setSelectedArtistId(null)

    store.library
      .refreshArtists()
      .finally(() => setIsRefreshing(false))
      .catch(e => {
        console.error(e)
      })
  }

  const handleArtistClick = (id: string) => {
    setSelectedArtistId(id)
  }

  const actions = [
    <div class={styles['artists-actions']}>
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
      <LibraryButton faIcon={faRefresh} onClick={refreshArtists} tooltip="Refresh" />
    </div>
  ]

  return (
    <LibraryShell title={'Artists'} actions={actions}>
      <div class={styles.artists}>
        <Switch>
          <Match when={isRefreshing()}>
            <LoadingSpinner />
          </Match>
          <Match when={!isRefreshing() && store.library.artists.length > 0}>
            <ArtistList
              setSearch={setSearch}
              artists={filteredArtists}
              selectedArtist={selectedArtistId()}
              handleArtistClick={handleArtistClick}
            />
            <ArtistContent selectedArtistId={selectedArtistId} />
          </Match>
        </Switch>
      </div>
    </LibraryShell>
  )
}
