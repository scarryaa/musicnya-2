import { Switch, Match, For } from 'solid-js'
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner'
import { MediaItem } from '../../../../components/MediaItem/MediaItem'
import { store } from '../../../../stores/store'
import { Utils } from '../../../../util/util'
import styles from './PlaylistView.module.scss'
import { MediaList } from '../../../../components/MediaList/MediaList'
import musicNote from '../../../../assets/music_note.png'
import { MediaListItem } from '../../../../components/MediaList/Components/MediaListItem/MediaListItem'

type PlaylistViewProps = {
  currentView: () => string
  playlists: () => MusicKit.LibraryPlaylists[]
  headers: string[]
}

export const PlaylistView = ({ currentView, playlists, headers }: PlaylistViewProps) => {
  console.log(playlists())
  const renderMediaListItem = item => (
    <MediaListItem
      id={item.id}
      type={item.type}
      artwork={Utils.formatArtworkUrl(item.attributes?.artwork?.url || musicNote, 50)}
      artistName={item.attributes.artistName}
      title={item.attributes.name}
      dateAdded={Utils.formatDate(item.attributes.dateAdded.slice(0, -10))}
      releaseDate={Utils.formatDate(item.attributes.lastModifiedDate.slice(0, -10))}
      artistId={null}
    />
  )

  return (
    <div class={styles['playlist-view']}>
      <Switch>
        <Match when={store.library.playlists.length === 0}>
          <LoadingSpinner />
        </Match>
        <Match when={currentView() === 'grid'}>
          <div class={styles['playlist-view-grid']}>
            <For each={playlists()}>
              {playlist => {
                return (
                  <div class={styles['playlist-view-item']}>
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
          <div class={styles['playlist-view-list']}>
            <MediaList
              headers={headers}
              items={playlists}
              renderItem={renderMediaListItem}
            />
          </div>
        </Match>
      </Switch>
    </div>
  )
}
