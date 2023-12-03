import { For } from 'solid-js'
import { Search } from '../../../components/LibraryActions/Search/Search'
import { Artist } from '../../../types/api/ItemResponse'
import styles from './ArtistList.module.scss'
import { ArtistListItem } from './ArtistListItem'

export const ArtistList = ({
  artists,
  selectedArtist,
  handleArtistClick,
  setSearch
}: {
  artists: () => Artist[]
  selectedArtist: string
  handleArtistClick: (id: string) => void
  setSearch: (search: string) => void
}) => {
  const handleSearchInput = (e: InputEvent) => {
    setSearch(
      (e.target as HTMLInputElement).value
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/ +(?= )/g, ' ')
        .trim()
    )
  }

  console.log(artists())
  return (
    <div class={styles['artist-list']}>
      <div class={styles['artist-list-search']}>
        <Search onInput={(e: InputEvent) => handleSearchInput(e)} />
      </div>
      <div class={styles['artist-list-list']}>
        <For each={artists()}>
          {artist => (
            <ArtistListItem
              artist={artist}
              selectedArtist={selectedArtist}
              handleArtistClick={handleArtistClick}
            />
          )}
        </For>
      </div>
    </div>
  )
}
