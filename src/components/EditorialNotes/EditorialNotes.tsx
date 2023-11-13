import styles from './EditorialNotes.module.scss'

export const EditorialNotes = ({ data }) => {
  let expandedRef

  const handleEditorialNotesClick = () => {
    expandedRef.classList.toggle('expanded')
  }

  return (
    <div
      class={styles.editorialNotes}
      innerHTML={data.attributes.editorialNotes.standard.replace(/\n/g, '<br />')}
      onClick={handleEditorialNotesClick}
      ref={expandedRef}
    ></div>
  )
}
