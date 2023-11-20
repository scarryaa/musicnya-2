import styles from './Chip.module.scss'

export const Chip = ({ text, backgroundColor, textColor }) => {
  return (
    <div
      class={styles.chip}
      style={{ 'background-color': backgroundColor, color: textColor }}
    >
      {text}
    </div>
  )
}
