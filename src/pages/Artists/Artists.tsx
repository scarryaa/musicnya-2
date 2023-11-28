import styles from './Artists.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Match, Switch, createMemo, createSignal } from 'solid-js'
import { store } from '../../stores/store'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import { faArrows, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { ArtistList } from './Components/ArtistList'
import { Artist } from '../../types/api/ItemResponse'
import { ArtistContent } from './Components/ArtistContent'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'

export const Artists = () => {
  const [selectedArtistId, setSelectedArtistId] = createSignal('')
  const [currentSort, setCurrentSort] = createSignal('none' as 'name' | 'none' | 'date')
  const [search, setSearch] = createSignal('')
  const [isRefreshing, setIsRefreshing] = createSignal(false)

  const filteredArtists = createMemo(() => {
    const term = search().toLowerCase()
    return (
      (store.library.artists as Artist[])?.filter((artist: Artist) =>
        artist.attributes.name.toLowerCase().includes(term)
      ) || []
    )
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

  const handleSortClick = () => {
    if (currentSort() === 'none') {
      setCurrentSort('name')
    } else {
      setCurrentSort('none')
    }
  }

  const actions = [
    <div class={styles['artists-actions']}>
      <LibraryButton faIcon={faArrows} onClick={handleSortClick} tooltip="Sort" />
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
