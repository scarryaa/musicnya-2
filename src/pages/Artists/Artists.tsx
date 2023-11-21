import styles from './Artists.module.scss'
import { LibraryShell } from '../../components/Library/Shell/LibraryShell'
import { Search } from '../../components/LibraryActions/Search/Search'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { For, Match, Switch, createMemo, createResource, createSignal } from 'solid-js'
import { LibraryButton } from '../../components/Library/Button/LibraryButton'
import { mkController } from '../../api/mkController'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { Utils } from '../../util/util'
import { store } from '../../stores/store'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { ArtistListSkeleton } from '../../components/Skeletons/ArtistListSkeleton'

export const Artists = () => {
  const [artists] = createResource(() => '0', mkController.getLibraryArtists, {
    initialValue: []
  })
  const [selectedArtist, setSelectedArtist] = createSignal(null)
  const [search, setSearch] = createSignal('')
  const filteredArtists = createMemo(() => {
    const term = search().toLowerCase()
    return (
      artists()?.data?.filter(artist =>
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
            <Switch>
              <Match when={artists.state === 'refreshing'}>
                <div class={styles.artists__sidebar__list__skelContainer}>
                  {Array.from({ length: 8 }, _ => (
                    <div class={styles.artists__sidebar__list__skelContainer__item}>
                      <ArtistListSkeleton />
                    </div>
                  ))}
                </div>
              </Match>

              <Match when={artists.state === 'ready'}>
                <For each={filteredArtists()}>
                  {artist => (
                    <div
                      class={styles.artists__sidebar__list__item}
                      style={{
                        'background-color':
                          artist.id === selectedArtist() ? 'var(--app-primary-color)' : ''
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
              </Match>
            </Switch>
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
