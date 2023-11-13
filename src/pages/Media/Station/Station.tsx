import { Match, Switch, createEffect } from 'solid-js'
import styles from './Station.module.scss'
import { useParams } from '@solidjs/router'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { createStationStore } from '../../../stores/api-store'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'

export const Station = () => {
  // get params from router
  const params = useParams<{ id: string }>()
  const stationStore = createStationStore()
  const stationData = stationStore(params)

  createEffect(() => {
    console.log(stationData())
  })

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={stationData.state === 'ready'}>
        <div class={styles.station}>
          <MediaInfo media={stationData().data[0]} />
        </div>
      </Match>
    </Switch>
  )
}
