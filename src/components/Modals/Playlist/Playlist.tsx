import { For, Match, Switch, createEffect, createSignal } from 'solid-js'
import styles from './Playlist.module.scss'
import { TabSwitcher } from '../../TabSwitcher/TabSwitcher'
import { MediaItemDetailed } from '../../MediaItemDetailed/MediaItemDetailed'
import { mkController } from '../../../api/mkController'
import { Utils } from '../../../util/util'
import { createModalPlaylistStore } from '../../../stores/api-store'
import { A } from '@solidjs/router'
import { store } from '../../../stores/store'
import { LoadingSpinner } from '../../LoadingSpinner/LoadingSpinner'

export const Playlist = () => {
  const [playlistId, setPlaylistId] = createSignal(store.app.modal.id)
  const modalPlaylistStore = createModalPlaylistStore()
  const playlistData = modalPlaylistStore({ id: store.app.modal.id })
  const [artworkUrls, setArtworkUrls] = createSignal(null)

  const [currentPlaylist, setCurrentPlaylist] = createSignal(null)

  createEffect(() => {
    setCurrentPlaylist(null)
    setPlaylistId(store.app.modal.id)
    const data = playlistData()
    if (data && data.data && data.data.length > 0) {
      setCurrentPlaylist(data.data[0])
      console.log(data.data[0])
      setArtworkUrls([
        data.data[0]?.attributes?.artwork.url && {
          name: 'Artwork',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.artwork.url,
            4320,
            4320,
            'webp',
            'none'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.artwork.url,
            4320 / 4,
            4320 / 4,
            'webp',
            'none'
          )
        },
        data.data[0]?.attributes?.editorialArtwork?.superHeroTall?.url && {
          name: 'Super Hero Tall',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.superHeroTall?.url,
            1680,
            2240,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.superHeroTall?.url,
            1680 / 4,
            2240 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialArtwork?.storeFlowcase?.url && {
          name: 'Store Flowcase',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.storeFlowcase?.url,
            4320,
            1080,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.storeFlowcase?.url,
            4320 / 4,
            1080 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialArtwork?.subscriptionHero?.url && {
          name: 'Subscription Hero',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.subscriptionHero?.url,
            4320,
            1080,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.subscriptionHero?.url,
            4320 / 4,
            1080 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialArtwork?.subscriptionCover?.url && {
          name: 'Subscription Cover',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.subscriptionCover?.url,
            4320,
            4320,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.subscriptionCover?.url,
            4320 / 4,
            4320 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.url && {
          name: 'Static Detail Square',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.url,
            3840,
            3840,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.url,
            3840 / 4,
            3840 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.url && {
          name: 'Static Detail Tall',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.url,
            2048,
            2732,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.url,
            2048 / 4,
            2732 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialArtwork?.brandLogo?.url && {
          name: 'Brand Logo',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.brandLogo?.url,
            1080,
            1080,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.brandLogo?.url,
            1080 / 4,
            1080 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialArtwork?.superHeroWide?.url && {
          name: 'Super Hero Wide',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.superHeroWide?.url,
            4320,
            1800,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialArtwork?.superHeroWide?.url,
            4320 / 4,
            1800 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialVideo?.motionSquareVideo1x1?.video && {
          name: 'Motion Square Video 1x1',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionSquareVideo1x1?.video,
            3840,
            3840,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionSquareVideo1x1?.previewFrame
              .url,
            3840 / 4,
            3840 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialVideo?.motionTallVideo3x4?.video && {
          name: 'Motion Tall Video 3x4',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionTallVideo3x4?.video,
            2048,
            2732,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionTallVideo3x4?.previewFrame
              .url,
            2048 / 4,
            2732 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialVideo?.motionWideVideo21x9?.video && {
          name: 'Motion Wide Video 21x9',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionWideVideo21x9?.video,
            3840,
            1646,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionWideVideo21x9?.previewFrame
              .url,
            3840 / 2,
            1646 / 2,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialVideo?.motionDetailTall?.video && {
          name: 'Motion Detail Tall',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionDetailTall?.video,
            2048,
            2732,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionDetailTall?.previewFrame.url,
            2048 / 4,
            2732 / 4,
            'webp',
            'sr'
          )
        },
        data.data[0]?.attributes?.editorialVideo?.motionDetailSquare?.video && {
          name: 'Motion Detail Square',
          url: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionDetailSquare?.video,
            3840,
            3840,
            'webp',
            'sr'
          ),
          thumbnailUrl: Utils.formatArtworkUrl(
            data.data[0]?.attributes?.editorialVideo?.motionDetailSquare?.previewFrame
              .url,
            3840 / 4,
            3840 / 4,
            'webp',
            'sr'
          )
        }
      ])
    }
  }, [playlistId, playlistData()])

  return (
    <Switch
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <Match when={playlistData.state === 'ready' && currentPlaylist()}>
        <div class={styles.playlist}>
          <div class={styles.playlist__header}>
            <MediaItemDetailed
              mediaItemId={playlistId}
              src={Utils.formatArtworkUrl(
                currentPlaylist()?.attributes?.artwork.url,
                100,
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
                      style={{ 'margin-bottom': '2rem' }}
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
                    <div class={styles.playlist__details__grouping}>
                      <h4 class={styles.playlist__details__subsubheader}>Id</h4>
                      <span class={styles.playlist__details__description}>
                        {currentPlaylist().id}
                      </span>
                    </div>
                    <div class={styles.playlist__details__grouping}>
                      <h4 class={styles.playlist__details__subsubheader}>Track Count</h4>
                      <span class={styles.playlist__details__description}>
                        {currentPlaylist().attributes.trackCount}
                      </span>
                    </div>
                  </div>
                ),
                index: 0
              },
              {
                name: 'Artwork',
                content: (
                  <div class={styles.playlist__artwork}>
                    <For each={artworkUrls()}>
                      {artwork =>
                        artwork?.thumbnailUrl &&
                        artwork?.url && (
                          <div class={styles.playlist__artwork__container}>
                            <h3 class={styles.playlist__artwork__header}>
                              {artwork.name}
                            </h3>
                            <A href={artwork.url} target="_blank">
                              <img src={artwork.thumbnailUrl} />
                            </A>
                          </div>
                        )
                      }
                    </For>
                  </div>
                ),
                index: 1
              }
            ]}
          />
        </div>
      </Match>
    </Switch>
  )
}
