import { For, Match, Switch, createEffect, createSignal } from 'solid-js'
import styles from './Song.module.scss'
import { TabSwitcher } from '../../TabSwitcher/TabSwitcher'
import { MediaItemDetailed } from '../../MediaItemDetailed/MediaItemDetailed'
import { Utils } from '../../../util/util'
import { createModalSongStore } from '../../../stores/api-store'
import { A } from '@solidjs/router'
import { setStore, store } from '../../../stores/store'
import { LoadingSpinner } from '../../LoadingSpinner/LoadingSpinner'
import { SwatchSquare } from '../../SwatchSquare/SwatchSquare'
import { Chip } from '../../Chip/Chip'
import { mkController } from '../../../api/mkController'
import { getDB } from '../../../db/db'
import { mkApiManager } from '../../../api/MkApiManager'

export const Song = () => {
  const [songId, setSongId] = createSignal(store.app.modal.id)
  const modalSongStore = createModalSongStore()
  const songData = modalSongStore({ id: store.app.modal.id })
  const [songCredits, setSongCredits] = createSignal(null)
  const [audioAnalysis, setAudioAnalysis] = createSignal(null)
  const [artworkUrls, setArtworkUrls] = createSignal(null)
  const [playCount, setPlayCount] = createSignal(null)
  const [currentSong, setCurrentSong] = createSignal(null)

  const resetPlayCount = async (id: string) => {
    const db = await getDB()
    const song = db.data.songs.filter(song => song.id === id)[0]
    if (song) {
      song.playCount = 0
    }
    db.write()
  }

  createEffect(async () => {
    setCurrentSong(null)
    if (store.app.modal.type.includes('library-')) {
      const res = await mkApiManager.getCatalogItemFromLibrary(
        store.app.modal.id,
        store.app.modal.type
      )
      setSongId(res.data[0].id)
    } else {
      setSongId(store.app.modal.id)
    }
    const data = songData()
    const db = await getDB()
    if (data && data.data && data.data.length > 0) {
      setCurrentSong(data.data[0])
      setAudioAnalysis(data.data[0]?.relationships?.['audio-analysis'].data[0])
      setSongCredits(
        await mkApiManager.getSongCredits(data.data[0].id).then(
          res => {
            if (res) {
              return res.data
            }
          },
          err => {
            console.error(err)
          }
        )
      )
      console.log(data.data[0])
      console.log(db)
      setPlayCount(
        db.data.songs.filter(song => song.id === data.data[0].id)[0]?.playCount
      )
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
  }, [songId, songData])

  return (
    <Switch
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <Match when={songData.state === 'ready' && currentSong()}>
        <div class={styles.song}>
          <div class={styles.song__header}>
            <MediaItemDetailed
              mediaItemId={songId}
              src={Utils.formatArtworkUrl(
                currentSong()?.attributes?.artwork.url,
                100,
                100,
                'webp',
                'none'
              )}
              title={currentSong()?.attributes?.name}
              artists={currentSong().attributes?.artistName}
              albums={currentSong().attributes?.albumName}
              releaseDate={currentSong().attributes?.releaseDate}
            />
          </div>
          <TabSwitcher
            tabs={[
              {
                name: 'Details',
                content: (
                  <div class={styles.song__details}>
                    <h3 class={styles.song__details__header}>Genres</h3>
                    <div
                      class={styles.song__details__groupingRegular}
                      style={{
                        'margin-bottom': '0.5rem'
                      }}
                    >
                      <For each={currentSong().attributes?.genreNames}>
                        {genre => (
                          <Chip
                            text={genre}
                            backgroundColor={'var(--color-primary)'}
                            textColor={'var(--color-white)'}
                          />
                        )}
                      </For>
                    </div>
                    <h3 class={styles.song__details__header}>Audio Traits</h3>
                    <div
                      class={styles.song__details__groupingRegular}
                      style={{
                        'margin-bottom': '0.5rem'
                      }}
                    >
                      <For each={currentSong().attributes?.audioTraits}>
                        {trait => (
                          <Chip
                            text={trait}
                            backgroundColor={'var(--color-primary)'}
                            textColor={'var(--color-white)'}
                          />
                        )}
                      </For>
                    </div>
                    <h3 class={styles.song__details__header}>Info</h3>
                    <div class={styles.song__details__grouping}>
                      <div
                        id={styles.playCount}
                        class={styles.song__details__grouping__header}
                      >
                        <h4 class={styles.song__details__subsubheader}>Play Count</h4>
                        <button
                          class={styles.song__details__grouping__button}
                          onClick={() => {
                            resetPlayCount(currentSong().id)
                            setPlayCount(0)
                          }}
                        >
                          Reset
                        </button>
                      </div>
                      <span class={styles.song__details__description}>
                        {playCount() || 0}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>
                        Has Time Synced Lyrics
                      </h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.hasTimeSyncedLyrics ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>Track Number</h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.trackNumber}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>
                        Is Vocal Attenuation Allowed
                      </h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.isVocalAttenuationAllowed
                          ? 'Yes'
                          : 'No'}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>Isrc</h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.isrc}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>Audio Locale</h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.audioLocale}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>Composer Name</h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.composerName}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>Disc Number</h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.discNumber}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>Has Credits</h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.hasCredits ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>Has Lyrics</h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.hasLyrics ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>ID</h4>
                      <span class={styles.song__details__description}>
                        {currentSong().id}
                      </span>
                    </div>
                    <div class={styles.song__details__grouping}>
                      <h4 class={styles.song__details__subsubheader}>
                        Is Apple Digital Master
                      </h4>
                      <span class={styles.song__details__description}>
                        {currentSong().attributes?.isAppleDigitalMaster ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                ),
                index: 0
              },
              {
                name: 'Credits',
                content: (
                  <div class={styles.song__credits}>
                    <For each={songCredits()}>
                      {credit => (
                        <div class={styles.song__credits__credit}>
                          <h3 class={styles.song__credits__credit__header}>
                            {credit.attributes.title}
                          </h3>
                          <div class={styles.song__credits__credit__content}>
                            <For each={credit.relationships?.['credit-artists'].data}>
                              {artist => (
                                <div
                                  class={styles.song__credits__credit__content__artist}
                                >
                                  <div
                                    class={
                                      styles.song__credits__credit__content__artist__artwork
                                    }
                                  >
                                    <img
                                      src={Utils.formatArtworkUrl(
                                        artist.attributes.artwork.url,
                                        100,
                                        100,
                                        'webp',
                                        'none'
                                      )}
                                    />
                                  </div>
                                  <div
                                    class={
                                      styles.song__credits__credit__content__artist__info
                                    }
                                  >
                                    <span
                                      class={
                                        styles.song__credits__credit__content__artist__info__name
                                      }
                                    >
                                      {artist.attributes.name}
                                    </span>
                                    <div
                                      class={
                                        styles.song__credits__credit__content__artist__info__role
                                      }
                                    >
                                      <div
                                        class={
                                          styles.song__credits__credit__content__artist__info__role__roles
                                        }
                                      >
                                        <For each={artist.attributes.roleNames}>
                                          {role => (
                                            <Chip
                                              text={role}
                                              backgroundColor={'var(--color-primary)'}
                                              textColor={'var(--color-white)'}
                                            />
                                          )}
                                        </For>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </For>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                )
              },
              {
                name: 'Artists',
                content: (
                  <div class={styles.song__artists}>
                    <For each={currentSong().relationships.artists.data}>
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
                          class={styles.song__artists__artist}
                          href={`/media/artists/${artist.id}`}
                        >
                          <img
                            src={Utils.formatArtworkUrl(
                              artist.attributes.artwork.url,
                              100,
                              100,
                              'webp',
                              'none'
                            )}
                          />

                          {artist.attributes.name}
                        </A>
                      )}
                    </For>
                  </div>
                )
              },
              {
                name: 'Albums',
                content: (
                  <div class={styles.song__albums}>
                    <For each={currentSong().relationships.albums.data}>
                      {album => (
                        <A
                          activeClass=""
                          onClick={() =>
                            setStore('app', 'modal', {
                              id: null,
                              type: null,
                              open: false
                            })
                          }
                          class={styles.song__albums__album}
                          href={`/media/albums/${album.id}`}
                        >
                          <img
                            src={Utils.formatArtworkUrl(
                              album.attributes.artwork.url,
                              100,
                              100,
                              'webp',
                              'none'
                            )}
                          />

                          {album.attributes.name}
                        </A>
                      )}
                    </For>
                  </div>
                )
              },
              {
                name: 'Artwork',
                content: (
                  <div class={styles.song__artwork}>
                    <For each={artworkUrls()}>
                      {artwork =>
                        artwork?.thumbnailUrl &&
                        artwork?.url && (
                          <div class={styles.song__artwork__container}>
                            <h3 class={styles.song__artwork__header}>{artwork.name}</h3>
                            <A href={artwork.url} target="_blank">
                              <img src={artwork.thumbnailUrl} />
                            </A>
                            <div class={styles.song__artwork__colors}>
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
              },
              {
                name: 'Audio Analysis',
                content: (
                  <div class={styles.song__audioAnalysis}>
                    <For
                      each={
                        audioAnalysis() &&
                        Object.entries(audioAnalysis().attributes).filter(
                          key => key[0] !== 'beats'
                        )
                      }
                    >
                      {([key, value]) => (
                        <div class={styles.song__audioAnalysis__grouping}>
                          <h4 class={styles.song__audioAnalysis__subsubheader}>
                            {key.toLocaleUpperCase()}
                          </h4>
                          <span class={styles.song__audioAnalysis__description}>
                            <For each={Object.entries(value)}>
                              {([key, value]) =>
                                Object.entries(value).length > 0 ? (
                                  <div class={styles.song__audioAnalysis__grouping}>
                                    <h4 class={styles.song__audioAnalysis__subsubheader}>
                                      {key.toLocaleUpperCase()}
                                    </h4>
                                    <span class={styles.song__audioAnalysis__description}>
                                      <For each={Object.entries(value)}>
                                        {([key, value]) => (
                                          <div
                                            class={styles.song__audioAnalysis__grouping}
                                          >
                                            <h4
                                              class={
                                                styles.song__audioAnalysis__subsubheader
                                              }
                                            >
                                              {key.toLocaleUpperCase()}
                                            </h4>
                                            <span
                                              class={
                                                styles.song__audioAnalysis__description
                                              }
                                            >
                                              {value}
                                            </span>
                                          </div>
                                        )}
                                      </For>
                                    </span>
                                  </div>
                                ) : (
                                  <div class={styles.song__audioAnalysis__grouping}>
                                    <h4 class={styles.song__audioAnalysis__subsubheader}>
                                      {key.toLocaleUpperCase()}
                                    </h4>
                                    <span class={styles.song__audioAnalysis__description}>
                                      {value}
                                    </span>
                                  </div>
                                )
                              }
                            </For>
                          </span>
                        </div>
                      )}
                    </For>
                  </div>
                )
              }
            ]}
          />
        </div>
      </Match>
    </Switch>
  )
}
