import { useParams } from '@solidjs/router'
import { Match, Switch, createEffect, createSignal } from 'solid-js'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { createStationStore } from '../../../stores/api-store'
import styles from './Station.module.scss'

export const Station = () => {
  const params = useParams<{ id: string }>()
  const stationStore = createStationStore()
  const stationData = stationStore(params)

  const [currentStation, setCurrentStation] = createSignal(null)

  createEffect(() => {
    const data = stationData()
    if (data && data.data && data.data.length > 0) {
      setCurrentStation(data.data[0])
    }
  })

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={stationData.state === 'ready' && currentStation()}>
        <div class={styles.station}>
          <MediaInfo media={currentStation} />
        </div>
      </Match>
    </Switch>
  )
}
