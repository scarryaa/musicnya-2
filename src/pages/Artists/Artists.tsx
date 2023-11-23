import styles from './Artists.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Search } from '../../components/LibraryActions/Search/Search'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { For, Match, Switch, createMemo, createResource, createSignal } from 'solid-js'
import { mkController } from '../../api/mkController'
import { Utils } from '../../util/util'
import { store } from '../../stores/store'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { ArtistListSkeleton } from '../../components/Skeletons/ArtistListSkeleton'

export const Artists = () => {
  const [selectedArtist, setSelectedArtist] = createSignal(null)
  const [search, setSearch] = createSignal('')
  const filteredArtists = createMemo(() => {
    const term = search().toLowerCase()
    return (
      store.library.artists?.filter(artist =>
        artist.attributes.name.toLowerCase().includes(term)
      ) || []
    )
  })

  const handleArtistClick = (id: string) => {
    setSelectedArtist(id)
  }

  return (
    <LibraryShell title={'Artists'} actions={<div class={styles.actions}></div>}>
      <div class={styles.artists}>
        <div class={styles.artists__sidebar}>
          <div class={styles.artists__sidebar__search}>
            <Search
              onInput={e =>
                setSearch(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9 ]/g, '')
                    .replace(/ +(?= )/g, ' ')
                    .trim()
                )
              }
            />
          </div>
          <div class={styles.artists__sidebar__list}>
            <For each={filteredArtists()}>
              {artist => (
                <div
                  class={styles.artists__sidebar__list__item}
                  style={{
                    'background-color':
                      artist.id === selectedArtist() ? 'var(--color-primary)' : ''
                  }}
                  onClick={() => handleArtistClick(artist.id)}
                >
                  <div class={styles.artists__sidebar__list__item__image}>
                    <img
                      src={Utils.formatArtworkUrl(
                        artist.relationships.catalog.data[0].attributes.artwork.url,
                        100
                      )}
                    />
                  </div>
                  <div class={styles.artists__sidebar__list__item__name}>
                    {artist.attributes.name}
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
        <div class={styles.artists__content}>
          {store.library.albums
            .filter(album => album.relationships.artists.data[0].id === selectedArtist())
            .map(album => (
              <MediaItem
                id={album.id}
                title={album.attributes.name}
                artistId={
                  album.relationships.artists.data[0].relationships.catalog.data[0].id
                }
                artists={[album.attributes.artistName]}
                src={Utils.formatArtworkUrl(
                  album.relationships.catalog.data[0].attributes.artwork.url,
                  150
                )}
                type="albums"
              ></MediaItem>
            ))}
        </div>
      </div>
    </LibraryShell>
  )
}
