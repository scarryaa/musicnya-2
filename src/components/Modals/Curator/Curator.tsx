import { For, Match, Switch, createEffect, createSignal } from 'solid-js'
import styles from './Curator.module.scss'
import { TabSwitcher } from '../../TabSwitcher/TabSwitcher'
import { MediaItemDetailed } from '../../MediaItemDetailed/MediaItemDetailed'
import { Utils } from '../../../util/util'
import { createModalCuratorStore } from '../../../stores/api-store'
import { A } from '@solidjs/router'
import { store } from '../../../stores/store'
import { LoadingSpinner } from '../../LoadingSpinner/LoadingSpinner'
import { SwatchSquare } from '../../SwatchSquare/SwatchSquare'

export const Curator = () => {
  const [curatorId, setCuratorId] = createSignal(store.app.modal.id)
  const modalCuratorStore = createModalCuratorStore()
  const curatorData = modalCuratorStore({ id: store.app.modal.id })
  const [artworkUrls, setArtworkUrls] = createSignal(null)

  const [currentCurator, setCurrentCurator] = createSignal(null)

  createEffect(() => {
    setCurrentCurator(null)
    setCuratorId(store.app.modal.id)
    const data = curatorData()
    if (data && data.data && data.data.length > 0) {
      setCurrentCurator(data.data[0])
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
  }, [curatorId, curatorData()])

  return (
    <Switch
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <Match when={curatorData.state === 'ready' && currentCurator()}>
        <div class={styles.curator}>
          <div class={styles.curator__header}>
            <MediaItemDetailed
              releaseDate={null}
              mediaItemId={curatorId}
              src={Utils.formatArtworkUrl(
                currentCurator()?.attributes?.artwork.url,
                100,
                100,
                'webp',
                'none'
              )}
              title={currentCurator()?.attributes?.name}
              artists={currentCurator().attributes?.curatorName}
            />
          </div>
          <TabSwitcher
            tabs={[
              {
                name: 'Details',
                content: (
                  <div class={styles.curator__details}>
                    <h3 class={styles.curator__details__header}>Info</h3>
                    <div class={styles.curator__details__grouping}>
                      <h4 class={styles.curator__details__subsubheader}>Kind</h4>
                      <span class={styles.curator__details__description}>
                        {currentCurator().attributes?.kind}
                      </span>
                    </div>
                    <div class={styles.curator__details__grouping}>
                      <h4 class={styles.curator__details__subsubheader}>
                        Show Host Name
                      </h4>
                      <span class={styles.curator__details__description}>
                        {currentCurator().attributes?.showHostName}
                      </span>
                    </div>
                    <div class={styles.curator__details__grouping}>
                      <h4 class={styles.curator__details__subsubheader}>Short Name</h4>
                      <span class={styles.curator__details__description}>
                        {currentCurator().attributes?.shortName}
                      </span>
                    </div>
                    <div class={styles.curator__details__grouping}>
                      <h4 class={styles.curator__details__subsubheader}>Id</h4>
                      <span class={styles.curator__details__description}>
                        {currentCurator().id}
                      </span>
                    </div>
                  </div>
                ),
                index: 0
              },
              {
                name: 'Artwork',
                content: (
                  <div class={styles.curator__artwork}>
                    <For each={artworkUrls()}>
                      {artwork =>
                        artwork?.thumbnailUrl &&
                        artwork?.url && (
                          <div class={styles.curator__artwork__container}>
                            <h3 class={styles.curator__artwork__header}>
                              {artwork.name}
                            </h3>
                            <A href={artwork.url} target="_blank">
                              <img src={artwork.thumbnailUrl} />
                            </A>
                            <div class={styles.curator__artwork__colors}>
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
