import styles from './Chip.module.scss'

type ChipProps = {
  text: string
  backgroundColor: string
  textColor: string
}

export const Chip = ({ text, backgroundColor, textColor }: ChipProps) => {
  return (
    <div
      class={styles.chip}
      style={{ 'background-color': backgroundColor, color: textColor }}
    >
      {text}
    </div>
  )
}
