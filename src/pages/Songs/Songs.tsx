import { faRefresh, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { SortMenu } from '../../components/SortMenu/SortMenu'
import { Search } from '../../components/LibraryActions/Search/Search'
import useNewContextMenu from '../../composables/useNewContextMenu'
import styles from './Songs.module.scss'
import { createMemo, createSignal } from 'solid-js'
import { store } from '../../stores/store'
import { SongView } from './Components/SongView/SongView'
import { mkManager } from '../../api/MkManager'

export const Songs = () => {
  const { openNewContextMenuWithItems } = useNewContextMenu()

  const [currentSort, setCurrentSort] = createSignal('name')
  const [currentSortDirection, setCurrentSortDirection] = createSignal('ascending')
  const [search, setSearch] = createSignal('')

  const refreshSongs = () => {
    store.library.refreshSongs().catch(e => {
      console.error(e)
    })
  }

  const shuffleSongs = () => {
    // pick 300 songs at random and set the queue
    mkManager
      .setQueue(
        store.library.songs
          .slice(0, 300)
          .sort(() => Math.random() - 0.5)
          .map(song => song.id),
        'songs',
        true
      )
      .then(async () => {
        await mkManager.play()
      })
      .catch(e => {
        console.error(e)
      })
  }

  const headers = [
    {
      label: 'Title',
      class: 'song-title-header-class'
    },
    {
      label: 'Artist',
      class: 'song-artist-header-class'
    },
    {
      label: 'Album',
      class: 'song-album-header-class'
    },
    {
      label: 'Time',
      class: 'song-time-header-class'
    }
  ]

  const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Artist', value: 'artist' },
    { label: 'Release Date', value: 'date' },
    { label: 'Date Added', value: 'date-added' }
  ]

  const sortSongs = (a: MusicKit.Songs, b: MusicKit.Songs) => {
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

  const filteredSongs = createMemo(() => {
    const term = search().toLowerCase()
    const filtered = store.library.songs.filter(song =>
      song.attributes.name.toLowerCase().includes(term)
    )

    return filtered.sort(sortSongs)
  })

  const actions = (
    <div class={styles['songs-actions']}>
      <LibraryButton faIcon={faShuffle} onClick={shuffleSongs} tooltip="Shuffle" />
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
      <LibraryButton faIcon={faRefresh} onClick={refreshSongs} tooltip="Refresh" />
      <Search onInput={e => setSearch(e.target.value)} />
    </div>
  )

  return (
    <LibraryShell title={'Songs'} actions={actions}>
      <SongView songs={filteredSongs} headers={headers} />
    </LibraryShell>
  )
}
