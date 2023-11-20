import Tooltip from '../Tooltip/Tooltip'
import styles from './SwatchSquare.module.scss'

export const SwatchSquare = ({ color, name }) => {
  const handleSwatchClick = () => {
    navigator.clipboard.writeText(`#${color}`)
  }

  return (
    <div
      use:Tooltip={['bottom', `#${color} ${name}`, true, 0]}
      class={styles.swatchSquare}
      style={{ 'background-color': `#${color}` }}
      onClick={handleSwatchClick}
    >
      <div class={styles.swatchSquare__overlay} />
    </div>
  )
}
