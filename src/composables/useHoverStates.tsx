import { createSignal } from 'solid-js'

const useHoverStates = () => {
  const [isHovered, setIsHovered] = createSignal(false)
  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  return { isHovered, onMouseEnter, onMouseLeave }
}

export default useHoverStates
