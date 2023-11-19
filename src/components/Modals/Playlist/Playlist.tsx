import { Match, Switch, createEffect, createSignal } from 'solid-js'
import styles from './Playlist.module.scss'
import { TabSwitcher } from '../../TabSwitcher/TabSwitcher'
import { MediaItemDetailed } from '../../MediaItemDetailed/MediaItemDetailed'
import { mkController } from '../../../api/mkController'
import { Utils } from '../../../util/util'
import { createModalPlaylistStore } from '../../../stores/api-store'

export const Playlist = ({ playlistId }) => {
  const modalPlaylistStore = createModalPlaylistStore()
  const playlistData = modalPlaylistStore({ id: playlistId })

  const [currentPlaylist, setCurrentPlaylist] = createSignal(null)

  createEffect(() => {
    const data = playlistData()
    if (data && data.data && data.data.length > 0) {
      setCurrentPlaylist(data.data[0])
      console.log(data.data[0])
    }
  }, [playlistData])

  return (
    <Switch fallback={<div>Loading...</div>}>
      <Match when={playlistData.state === 'ready' && currentPlaylist()}>
        <div class={styles.playlist}>
          <div class={styles.playlist__header}>
            <MediaItemDetailed
              mediaItemId={playlistId}
              src={Utils.formatArtworkUrl(
                currentPlaylist()?.attributes?.artwork.url,
                100,
                'webp',
                'none'
              )}
              title={currentPlaylist()?.attributes?.name}
              artists={currentPlaylist().attributes?.curatorName}
            />
          </div>
          <TabSwitcher
            tabs={[
              {
                name: 'Details',
                content: (
                  <div class={styles.playlist__details}>
                    <h3 class={styles.playlist__details__header}>Info</h3>
                    <h4 class={styles.playlist__details__subheader}>Description</h4>
                    <h5 class={styles.playlist__details__subsubheader}>Short</h5>
                    <span
                      class={styles.playlist__details__description}
                      innerHTML={currentPlaylist().attributes?.description?.short}
                    />
                    <h5 class={styles.playlist__details__subsubheader}>Standard</h5>
                    <span
                      class={styles.playlist__details__description}
                      innerHTML={currentPlaylist().attributes?.description?.standard}
                    />
                    <div class={styles.playlist__details__grouping}>
                      <h4 class={styles.playlist__details__subsubheader}>
                        Has Collaboration
                      </h4>
                      <span class={styles.playlist__details__description}>
                        {currentPlaylist().attributes?.hasCollaboration ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.playlist__details__grouping}>
                      <h4 class={styles.playlist__details__subsubheader}>Is Chart</h4>
                      <span class={styles.playlist__details__description}>
                        {currentPlaylist().attributes?.isChart ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.playlist__details__grouping}>
                      <h4 class={styles.playlist__details__subsubheader}>
                        Last Modified Date
                      </h4>
                      <span class={styles.playlist__details__description}>
                        {currentPlaylist().attributes?.lastModifiedDate}
                      </span>
                    </div>
                    <div class={styles.playlist__details__grouping}>
                      <h4 class={styles.playlist__details__subsubheader}>
                        Supports Sing
                      </h4>
                      <span class={styles.playlist__details__description}>
                        {currentPlaylist().attributes?.supportsSing ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.playlist__details__grouping}>
                      <h4 class={styles.playlist__details__subsubheader}>
                        Playlist Type
                      </h4>
                      <span class={styles.playlist__details__description}>
                        {currentPlaylist().attributes?.playlistType}
                      </span>
                    </div>
                  </div>
                ),
                index: 0
              },
              {
                name: 'Artwork',
                content: <div>Artwork</div>,
                index: 1
              }
            ]}
          />
        </div>
      </Match>
    </Switch>
  )
}
