import { useParams } from '@solidjs/router'
import { Match, Switch, createEffect, createSignal } from 'solid-js'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { createStationStore, createVideoStore } from '../../../stores/api-store'
import styles from './Video.module.scss'

export const Video = () => {
  const params = useParams<{ id: string }>()
  const videoStore = createVideoStore()
  const videoData = videoStore(params)

  const [currentVideo, setCurrentVideo] = createSignal(null)

  createEffect(() => {
    const data = videoData()
    if (data && data.data && data.data.length > 0) {
      setCurrentVideo(data.data[0])
    }
  })

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={videoData.state === 'ready' && currentVideo()}>
        <div class={styles.station}>
          <MediaInfo media={currentVideo} />
        </div>
      </Match>
    </Switch>
  )
}
