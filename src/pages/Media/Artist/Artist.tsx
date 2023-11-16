import { useParams } from '@solidjs/router'
import { For, Match, Switch, createEffect, createSignal } from 'solid-js'
import { createArtistStore } from '../../../stores/api-store'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'
import styles from './Artist.module.scss'
import { Utils } from '../../../util/util'
import Fa from 'solid-fa'
import { faEllipsisH, faPlay, faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-regular-svg-icons'
import { mkController } from '../../../api/mkController'
import { Shelf } from '../../../components/Shelf/Shelf'
import { MediaSelector } from '../../../components/MediaSelector/MediaSelector'
import { MediaItem } from '../../../components/MediaItem/MediaItem'
import { ViewSelector } from '../../../components/ViewSelector/ViewSelector'

export const Artist = () => {
  const params = useParams<{ id: string }>()
  const artistStore = createArtistStore()
  const artistData = artistStore(params)

  const [currentArtist, setCurrentArtist] = createSignal(null)
  const [isFavorited, setIsFavorited] = createSignal(false)

  createEffect(() => {
    const data = artistData()
    if (data && data.data && data.data.length > 0) {
      setCurrentArtist(data.data[0])
      setIsFavorited(data.data[0].attributes.inFavorites)

      sortViews()
    }
    console.log(artistData())
  })

  const sortViews = () => {
    const viewsOrder = currentArtist().meta.views.order
    const sortedViews = viewsOrder
      .map(orderKey => currentArtist().views[orderKey])
      .filter(Boolean)
      .filter(view => view.data.length > 0)
    return sortedViews
  }

  const handlePlayClick = () => {
    mkController.setQueue(currentArtist().id, 'artists', 0)
  }

  const handleFavoriteClick = () => {
    if (isFavorited()) {
      mkController.unfavoriteArtist(currentArtist().id).then(res => {
        if (res) {
          setIsFavorited(false)
        }
      })
    } else {
      mkController.favoriteArtist(currentArtist().id).then(res => {
        if (res) {
          setIsFavorited(true)
        }
      })
    }
  }

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={artistData.state === 'ready' && currentArtist()}>
        <div class={styles.artist}>
          <div class={styles.artist__artwork}>
            <div class={styles.artist__artwork__gradient}></div>
            <img
              class={styles.artist__artwork__image}
              src={Utils.formatArtworkUrl(
                currentArtist().attributes.editorialArtwork.url ||
                  currentArtist().attributes.artwork.url,
                500,
                'webp',
                'none'
              )}
              alt=""
            />
            <div class={styles.artist__artwork__info}>
              <button
                class={styles.artist__artwork__info__playButton}
                onClick={handlePlayClick}
              >
                <Fa icon={faPlay} size="lg" />
              </button>
              <h1 class={styles.artist__artwork__info__title}>
                {currentArtist().attributes.name}
              </h1>
              <div class={styles.artist__artwork__info__actions}>
                <button
                  class={styles.artist__artwork__info__actions__button}
                  onClick={handleFavoriteClick}
                >
                  <Fa icon={isFavorited() ? faStar : faStarSolid} size="1x" />
                </button>
                <button class={styles.artist__artwork__info__actions__button}>
                  <Fa icon={faEllipsisH} size="1x" />
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
        </div>
      </Match>
    </Switch>
  )
}
