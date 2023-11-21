import { useParams } from '@solidjs/router'
import { Match, Switch, createEffect, createSignal } from 'solid-js'
import { EditorialNotes } from '../../../components/EditorialNotes/EditorialNotes'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { SongTable } from '../../../components/SongTable/SongTable'
import { createPlaylistStore } from '../../../stores/api-store'
import { store } from '../../../stores/store'
import styles from './Playlist.module.scss'

export const Playlist = () => {
  const params = useParams<{ id: string }>()
  const playlistStore = createPlaylistStore()
  const playlistData = playlistStore(params)

  const [currentPlaylist, setCurrentPlaylist] = createSignal(null)

  createEffect(() => {
    const data = playlistData()
    if (data && data.data && data.data.length > 0) {
      setCurrentPlaylist(data.data[0])
    }
    console.log(params.id)
  }, [params.id, playlistData()])

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={playlistData.state === 'ready' && currentPlaylist()}>
        <div class={styles.playlist}>
          <MediaInfo artistId={null} media={currentPlaylist} />
        </div>

        {currentPlaylist().attributes.editorialNotes?.standard &&
          !store.app.media.hideEditorialNotes && (
            <EditorialNotes data={currentPlaylist} />
          )}

        <SongTable data={currentPlaylist} />
      </Match>
    </Switch>
  )
}
