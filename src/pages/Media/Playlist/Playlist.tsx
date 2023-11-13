import { Match, Switch, createEffect } from 'solid-js'
import styles from './Playlist.module.scss'
import { useParams } from '@solidjs/router'
import { createPlaylistStore } from '../../../stores/api-store'
import { SongTable } from '../../../components/SongTable/SongTable'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { EditorialNotes } from '../../../components/EditorialNotes/EditorialNotes'
import { store } from '../../../stores/store'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'

export const Playlist = () => {
  // get params from router
  const params = useParams<{ id: string }>()
  const playlistStore = createPlaylistStore()
  const playlistData = playlistStore(params)

  createEffect(() => {
    console.log(playlistData())
  })

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={playlistData.state === 'ready'}>
        <div class={styles.playlist}>
          <MediaInfo media={playlistData().data[0]} />
        </div>

        {playlistData().data[0].attributes.editorialNotes?.standard &&
          !store.app.media.hideEditorialNotes && (
            <EditorialNotes data={playlistData().data[0]} />
          )}

        <SongTable
          tracks={playlistData().data[0].relationships.tracks.data}
          type={playlistData().data[0].type}
        />
      </Match>
    </Switch>
  )
}
