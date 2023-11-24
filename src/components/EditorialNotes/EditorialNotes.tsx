import { createEffect } from 'solid-js'
import { store } from '../../stores/store'
import styles from './EditorialNotes.module.scss'

export const EditorialNotes = ({ data }) => {
  let expandedRef

  createEffect(() => {
    if (store.app.media.expandEditorialNotes) expandedRef.classList.add(styles.expanded)
  })

  const handleEditorialNotesClick = () => {
    expandedRef.classList.toggle(styles.expanded)
  }

  return (
    <div
      class={styles.editorialNotes}
      innerHTML={
        data().type.includes('library-')
          ? data().relationships.catalog.data[0].attributes.editorialNotes.standard.replace(
              /\n/g,
              '<br />'
            )
          : data().attributes?.editorialNotes?.standard?.replace(/\n/g, '<br />') ??
            data().attributes?.editorialNotes?.short?.replace(/\n/g, '<br />')
      }
      onClick={handleEditorialNotesClick}
      ref={expandedRef}
    ></div>
  )
}
