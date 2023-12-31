import { For, Match, Switch, createEffect, createSignal } from 'solid-js'
import styles from './Album.module.scss'
import { TabSwitcher } from '../../TabSwitcher/TabSwitcher'
import { MediaItemDetailed } from '../../MediaItemDetailed/MediaItemDetailed'
import { Utils } from '../../../util/util'
import { createModalAlbumStore } from '../../../stores/api-store'
import { A } from '@solidjs/router'
import { setStore, store } from '../../../stores/store'
import { LoadingSpinner } from '../../LoadingSpinner/LoadingSpinner'
import { SwatchSquare } from '../../SwatchSquare/SwatchSquare'
import { Chip } from '../../Chip/Chip'
import { mkApiManager } from '../../../api/MkApiManager'

export const Album = () => {
  const [albumId, setAlbumId] = createSignal(store.app.modal.id)
  const modalAlbumStore = createModalAlbumStore()
  const albumData = modalAlbumStore({ id: albumId() })
  const [artworkUrls, setArtworkUrls] = createSignal(null)

  const [currentAlbum, setCurrentAlbum] = createSignal(null)

  createEffect(async () => {
    setCurrentAlbum(null)
    if (store.app.modal.type.includes('library-') && store.app.modal.id[0] === 'l') {
      console.log('getting catalog from library')
      await mkApiManager
        .getCatalogItemFromLibrary(store.app.modal.id, store.app.modal.type)
        .then(
          res => {
            if (res) {
              setAlbumId(res.data[0].id)
              console.log(res)
            }
          },
          err => {
            console.error(err)
          }
        )
    } else {
      setAlbumId(store.app.modal.id)
    }
    const data = albumData()
    console.log(albumData())
    if (data && data.data && data.data.length > 0) {
      setCurrentAlbum(data.data[0])
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
          ),
          bgColor: data.data[0]?.attributes?.artwork?.bgColor,
          textColor1: data.data[0]?.attributes?.artwork?.textColor1,
          textColor2: data.data[0]?.attributes?.artwork?.textColor2,
          textColor3: data.data[0]?.attributes?.artwork?.textColor3,
          textColor4: data.data[0]?.attributes?.artwork?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialArtwork?.superHeroTall?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialArtwork?.superHeroTall?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialArtwork?.superHeroTall?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialArtwork?.superHeroTall?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialArtwork?.superHeroTall?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialArtwork?.storeFlowcase?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialArtwork?.storeFlowcase?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialArtwork?.storeFlowcase?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialArtwork?.storeFlowcase?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialArtwork?.storeFlowcase?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialArtwork?.subscriptionHero?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialArtwork?.subscriptionHero?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialArtwork?.subscriptionHero?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialArtwork?.subscriptionHero?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialArtwork?.subscriptionHero?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialArtwork?.subscriptionCover?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialArtwork?.subscriptionCover?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialArtwork?.subscriptionCover?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialArtwork?.subscriptionCover?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialArtwork?.subscriptionCover?.textColor4
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
          ),
          bgColor:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.textColor4
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
          ),
          bgColor:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialArtwork?.staticDetailSquare?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialArtwork?.brandLogo?.bgColor,
          textColor1: data.data[0]?.attributes?.editorialArtwork?.brandLogo?.textColor1,
          textColor2: data.data[0]?.attributes?.editorialArtwork?.brandLogo?.textColor2,
          textColor3: data.data[0]?.attributes?.editorialArtwork?.brandLogo?.textColor3,
          textColor4: data.data[0]?.attributes?.editorialArtwork?.brandLogo?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialArtwork?.superHeroWide?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialArtwork?.superHeroWide?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialArtwork?.superHeroWide?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialArtwork?.superHeroWide?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialArtwork?.superHeroWide?.textColor4
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
          ),
          bgColor:
            data.data[0]?.attributes?.editorialVideo?.motionSquareVideo1x1?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialVideo?.motionSquareVideo1x1?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialVideo?.motionSquareVideo1x1?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialVideo?.motionSquareVideo1x1?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialVideo?.motionSquareVideo1x1?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialVideo?.motionTallVideo3x4?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialVideo?.motionTallVideo3x4?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialVideo?.motionTallVideo3x4?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialVideo?.motionTallVideo3x4?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialVideo?.motionTallVideo3x4?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialVideo?.motionWideVideo21x9?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialVideo?.motionWideVideo21x9?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialVideo?.motionWideVideo21x9?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialVideo?.motionWideVideo21x9?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialVideo?.motionWideVideo21x9?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialVideo?.motionDetailTall?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialVideo?.motionDetailTall?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialVideo?.motionDetailTall?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialVideo?.motionDetailTall?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialVideo?.motionDetailTall?.textColor4
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
          ),
          bgColor: data.data[0]?.attributes?.editorialVideo?.motionDetailSquare?.bgColor,
          textColor1:
            data.data[0]?.attributes?.editorialVideo?.motionDetailSquare?.textColor1,
          textColor2:
            data.data[0]?.attributes?.editorialVideo?.motionDetailSquare?.textColor2,
          textColor3:
            data.data[0]?.attributes?.editorialVideo?.motionDetailSquare?.textColor3,
          textColor4:
            data.data[0]?.attributes?.editorialVideo?.motionDetailSquare?.textColor4
        }
      ])
    }
  }, [albumId, albumData])

  return (
    <Switch
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <Match when={albumData.state === 'ready' && currentAlbum()}>
        <div class={styles.album}>
          <div class={styles.album__header}>
            <MediaItemDetailed
              mediaItemId={albumId}
              src={Utils.formatArtworkUrl(
                currentAlbum()?.attributes?.artwork.url,
                100,
                100,
                'webp',
                'none'
              )}
              title={currentAlbum()?.attributes?.name}
              artists={currentAlbum().attributes?.artistName}
              releaseDate={currentAlbum().attributes?.releaseDate}
            />
          </div>
          <TabSwitcher
            tabs={[
              {
                name: 'Details',
                content: (
                  <div class={styles.album__details}>
                    <h3 class={styles.album__details__header}>Genres</h3>
                    <div
                      class={styles.album__details__groupingRegular}
                      style={{
                        'margin-bottom': '0.5rem'
                      }}
                    >
                      <For each={currentAlbum().attributes?.genreNames}>
                        {genre => (
                          <Chip
                            text={genre}
                            backgroundColor={'var(--color-primary)'}
                            textColor={'var(--color-white)'}
                          />
                        )}
                      </For>
                    </div>
                    <h3 class={styles.album__details__header}>Audio Traits</h3>
                    <div
                      class={styles.album__details__groupingRegular}
                      style={{
                        'margin-bottom': '0.5rem'
                      }}
                    >
                      <For each={currentAlbum().attributes?.audioTraits}>
                        {trait => (
                          <Chip
                            text={trait}
                            backgroundColor={'var(--color-primary)'}
                            textColor={'var(--color-white)'}
                          />
                        )}
                      </For>
                    </div>
                    <h3 class={styles.album__details__header}>Info</h3>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>Copyright</h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().attributes?.copyright}
                      </span>
                    </div>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>Upc</h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().attributes?.upc}
                      </span>
                    </div>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>Is Compilation</h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().attributes?.isCompilation ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>
                        Is Mastered For iTunes
                      </h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().attributes?.isMasteredForItunes ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>Is Complete</h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().attributes?.isComplete ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>Is Prerelease</h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().attributes?.isPreRelease ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>Is Single</h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().attributes?.isSingle ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>Id</h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().id}
                      </span>
                    </div>
                    <div class={styles.album__details__grouping}>
                      <h4 class={styles.album__details__subsubheader}>Track Count</h4>
                      <span class={styles.album__details__description}>
                        {currentAlbum().attributes.trackCount}
                      </span>
                    </div>
                  </div>
                ),
                index: 0
              },
              {
                name: 'Artists',
                content: (
                  <div class={styles.album__artists}>
                    <For each={currentAlbum().relationships.artists.data}>
                      {artist => (
                        <A
                          activeClass=""
                          onClick={() =>
                            // TODO add pop out animation
                            setStore('app', 'modal', {
                              id: null,
                              type: null,
                              open: false
                            })
                          }
                          class={styles.album__artists__artist}
                          href={`/media/artists/${artist.id}`}
                        >
                          {artist.attributes.artwork?.url && (
                            <img
                              src={Utils.formatArtworkUrl(
                                artist.attributes.artwork.url,
                                100,
                                100,
                                'webp',
                                'none'
                              )}
                            />
                          )}

                          {artist.attributes.name}
                        </A>
                      )}
                    </For>
                  </div>
                )
              },
              {
                name: 'Artwork',
                content: (
                  <div class={styles.album__artwork}>
                    <For each={artworkUrls()}>
                      {artwork =>
                        artwork?.thumbnailUrl &&
                        artwork?.url && (
                          <div class={styles.album__artwork__container}>
                            <h3 class={styles.album__artwork__header}>{artwork.name}</h3>
                            <A href={artwork.url} target="_blank">
                              <img src={artwork.thumbnailUrl} />
                            </A>
                            <div class={styles.album__artwork__colors}>
                              {artwork.bgColor && (
                                <SwatchSquare color={artwork.bgColor} name="bgColor" />
                              )}
                              {artwork.textColor1 && (
                                <SwatchSquare
                                  color={artwork.textColor1}
                                  name="textColor1"
                                />
                              )}
                              {artwork.textColor2 && (
                                <SwatchSquare
                                  color={artwork.textColor2}
                                  name="textColor2"
                                />
                              )}
                              {artwork.textColor3 && (
                                <SwatchSquare
                                  color={artwork.textColor3}
                                  name="textColor3"
                                />
                              )}
                              {artwork.textColor4 && (
                                <SwatchSquare
                                  color={artwork.textColor4}
                                  name="textColor4"
                                />
                              )}
                            </div>
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
