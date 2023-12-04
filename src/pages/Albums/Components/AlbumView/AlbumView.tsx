import { Switch, Match, For } from 'solid-js'
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner'
import { MediaItem } from '../../../../components/MediaItem/MediaItem'
import { store } from '../../../../stores/store'
import { Utils } from '../../../../util/util'
import styles from './AlbumView.module.scss'
import { MediaList } from '../../../../components/MediaList/MediaList'
import { MediaListItem } from '../../../../components/MediaList/Components/MediaListItem/MediaListItem'

type AlbumViewProps = {
  currentView: () => string
  albums: () => MusicKit.Albums[]
  headers: string[]
}

export const AlbumView = ({ currentView, albums, headers }: AlbumViewProps) => {
  const renderMediaListItem = item => (
    <MediaListItem
      id={item.id}
      type={item.type}
      imageUrl={Utils.formatArtworkUrl(item.attributes.artwork.url, 50)}
      secondaryText={item.attributes.artistName}
      primaryText={item.attributes.name}
      additionalInfo={[
        Utils.formatDate(item.attributes.dateAdded.slice(0, -10)),
        Utils.formatDate(item.attributes.releaseDate)
      ]}
      url={`/media/albums/${item.id}`}
      secondaryUrl={`/media/artists/${item.relationships.artists.data[0].relationships.catalog.data[0].id}`}
    />
  )

  return (
    <div class={styles['album-view']}>
      <Switch>
        <Match when={store.library.albums.length === 0}>
          <LoadingSpinner />
        </Match>
        <Match when={currentView() === 'grid'}>
          <div class={styles['album-view-grid']}>
            <For each={albums()}>
              {album => {
                return (
                  <div class={styles['album-view-item']}>
                    <MediaItem
                      artistId={
                        album.relationships.artists.data[0].relationships.catalog.data[0]
                          .id
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
          <div class={styles['album-view-list']}>
            <MediaList
              headers={headers}
              items={albums}
              renderItem={renderMediaListItem}
            />
          </div>
        </Match>
      </Switch>
    </div>
  )
}
