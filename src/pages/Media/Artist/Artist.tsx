import { useParams } from '@solidjs/router'
import { For, Match, Switch, createEffect, createMemo, createSignal } from 'solid-js'
import { createArtistStore } from '../../../stores/api-store'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'
import styles from './Artist.module.scss'
import { Utils } from '../../../util/util'
import Fa from 'solid-fa'
import { faEllipsisH, faPlay, faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-regular-svg-icons'
import { Shelf } from '../../../components/Shelf/Shelf'
import { ViewSelector } from '../../../components/ViewSelector/ViewSelector'
import { RelatedArtistsPane } from '../../../components/RelatedArtistsPane/RelatedArtistsPane'
import { useContextMenu } from '../../../composables/useContextMenu'
import { ContextMenuType } from '../../../types/types'
import { ArtistInfoPane } from './Components/ArtistInfoPane/ArtistInfoPane'
import { mkManager } from '../../../api/MkManager'
import { mkApiManager } from '../../../api/MkApiManager'

export const Artist = () => {
  const params = useParams<{ id: string }>()
  const artistStore = createArtistStore()
  const [newId, setNewId] = createSignal(params.id)
  const artistData = createMemo(() => artistStore({ id: newId() }))

  const { openContextMenu } = useContextMenu()
  const [currentArtist, setCurrentArtist] = createSignal(null)
  const [isFavorited, setIsFavorited] = createSignal(false)
  const [currentArtistBanner, setCurrentArtistBanner] = createSignal(null)

  createEffect(async () => {
    if (params.id[0] === 'r') {
      const catalogId = await mkApiManager.getCatalogArtistFromLibrary(params.id)
      if (catalogId) {
        setNewId(catalogId.data[0].id)
      }
    }

    setCurrentArtistBanner(null)
    const data = artistData()()
    if (data && data.data && data.data.length > 0) {
      setCurrentArtist(data.data[0])
      setIsFavorited(data.data[0].attributes.inFavorites)
      setCurrentArtistBanner(
        Utils.formatArtworkUrl(
          data.data[0].attributes.editorialArtwork.url ||
            data.data[0].attributes.artwork.url,
          500,
          500,
          'webp',
          'none'
        )
      )

      sortViews()
    }
    console.log(artistData()())
  }, [newId])

  const sortViews = () => {
    const viewsOrder = currentArtist().meta.views.order
    const sortedViews = viewsOrder
      .map(orderKey => currentArtist().views[orderKey])
      .filter(Boolean)
      .filter(view => view.data.length > 0)
      .filter(view => view.attributes.title !== 'Similar Artists')
    return sortedViews
  }

  const handlePlayClick = () => {
    mkManager.setStationQueue(currentArtist().id, 'artists')
  }

  const handleFavoriteClick = async () => {
    if (isFavorited()) {
      const res = await mkApiManager.unfavoriteArtist(currentArtist().id)
      if (res) {
        setIsFavorited(false)
      }
    } else {
      const res = await mkApiManager.favoriteArtist(currentArtist().id)
      if (res) {
        setIsFavorited(true)
      }
    }
  }

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={artistData().state === 'ready' && currentArtist()}>
        <div
          class={styles.artist}
          onContextMenu={e =>
            openContextMenu(e, currentArtist().id, ContextMenuType.Artist, null)
          }
        >
          <div class={styles.artist__artwork}>
            <div class={styles.artist__artwork__gradient}></div>
            <img
              class={styles.artist__artwork__image}
              src={currentArtistBanner()}
              alt=""
              onload={e => {
                e.currentTarget.classList.add(styles.loaded)
              }}
            />
            <div class={styles.artist__artwork__info}>
              <button
                class={styles.artist__artwork__info__playButton}
                onClick={handlePlayClick}
              >
                <Fa icon={faPlay} size="lg" color="var(--color-white)" />
              </button>
              <h1 class={styles.artist__artwork__info__title}>
                {currentArtist().attributes.name}
              </h1>
              <div class={styles.artist__artwork__info__actions}>
                <button
                  class={styles.artist__artwork__info__actions__button}
                  onClick={handleFavoriteClick}
                >
                  <Fa
                    icon={isFavorited() ? faStar : faStarSolid}
                    size="1x"
                    color="var(--color-white)"
                  />
                </button>
                <button
                  class={styles.artist__artwork__info__actions__button}
                  onClick={e =>
                    openContextMenu(e, currentArtist().id, ContextMenuType.Artist, null)
                  }
                >
                  <Fa icon={faEllipsisH} size="1x" color="var(--color-white)" />
                </button>
              </div>
            </div>
          </div>

          <div class={styles.artist__content}>
            <For each={sortViews()}>
              {view => (
                <Shelf header={view.attributes.title} topMargin={true}>
                  <For each={view.data}>
                    {item => <ViewSelector item={item} title={view.attributes.title} />}
                  </For>
                </Shelf>
              )}
            </For>
          </div>

          <ArtistInfoPane artist={currentArtist} />
          <RelatedArtistsPane artist={currentArtist} />
        </div>
      </Match>
    </Switch>
  )
}
