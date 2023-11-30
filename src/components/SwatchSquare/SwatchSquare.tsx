import Tooltip from '../Tooltip/Tooltip'
import styles from './SwatchSquare.module.scss'

type SwatchSquareProps = {
  color: string
  name: string
}

export const SwatchSquare = ({ color, name }: SwatchSquareProps) => {
  const handleSwatchClick = () => {
    navigator.clipboard
      .writeText(`#${color}`)
      .catch(() => console.log('Failed to copy color to clipboard'))
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
