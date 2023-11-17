import { For } from 'solid-js'
import { Shelf } from '../Shelf/Shelf'
import { ViewSelector } from '../ViewSelector/ViewSelector'
import styles from './RelatedArtistsPane.module.scss'

export const RelatedArtistsPane = ({ artist }) => {
  return (
    <div class={styles.relatedArtistsPane}>
      <Shelf header={artist().views['similar-artists'].attributes.title} topMargin={true}>
        <For each={artist().views['similar-artists'].data}>
          {item => (
            <ViewSelector
              item={item}
              title={artist().views['similar-artists'].attributes.title}
            />
          )}
        </For>
      </Shelf>
    </div>
  )
}
