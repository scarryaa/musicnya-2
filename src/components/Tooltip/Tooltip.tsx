//credit https://github.com/titoBouzout/solid-tooltip/tree/master

import { createMutable } from 'solid-js/store'
import { onCleanup, onMount } from 'solid-js'
import { insert } from 'solid-js/web'
import styles from './Tooltip.module.scss'

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      Tooltip: [string, string | (() => string), (boolean | (() => boolean))?, number?]
    }
  }
}

// state
let local = createMutable({
  open: false,
  position: 'top',
  content: null,
  currentTitle: null
})

// create container
let tooltipDelay = 0
let openTimeoutId
let tooltip
let portal = (
  <div
    ref={tooltip}
    role="tooltip"
    aria-label="tooltip text"
    onMouseOver={() => {
      local.open = true
      tooltip.style.setProperty('display', 'block')
    }}
    class={styles.tooltip}
    onMouseOut={close}
  >
    {local.content}
  </div>
)

queueMicrotask(() => {
  insert(document.body, portal)
})

// for when a tooltip style is not defined
// it reuses the div
let defaultTooltipStyle = <div class={styles.defaultTooltip}>{local.currentTitle}</div>

// directive
export default function Tooltip(related, at, wrap) {
  let title
  let showTooltip

  at = at ? at() : ''
  onMount(() => {
    if (Array.isArray(at)) {
      if (at.length === 1) {
        title = at[0]
        at = 'top'
      } else {
        title = at[1]
        showTooltip = at[2]
        tooltipDelay =
          typeof at[3] === 'number'
            ? at[3]
            : typeof at[4] === 'number'
            ? at[4]
            : tooltipDelay
        at = at[0]
      }
    } else {
      title = related.title || related.getAttribute('title') || ''
    }
    related.removeAttribute('title')
  })

  function open() {
    openTimeoutId = setTimeout(() => {
      update(related, at, title, wrap, showTooltip)
      if (typeof showTooltip === 'function' ? showTooltip() : true) {
        local.open = true
        tooltip.style.setProperty('display', 'block')
        tooltip.style.setProperty('opacity', '1')
        tooltip.style.setProperty('transform', 'translateY(0)')
      }
    }, tooltipDelay)
  }

  related.addEventListener('mouseover', open)
  related.addEventListener('mouseout', close)

  onCleanup(() => {
    close()
    related.removeEventListener('mouseover', open)
    related.removeEventListener('mouseout', close)
  })
}

// close tooltip when switching tabs
function closeListener(e) {
  if (e.target == e.currentTarget) {
    close()
  }
}
addEventListener('blur', closeListener)

function close() {
  clearTimeout(openTimeoutId)
  local.open = false
  tooltip.style.setProperty('opacity', '0')
  tooltip.style.setProperty('transform', 'translateY(-10px)')
  tooltip.style.setProperty('display', 'none')
}

// update when opening
function update(related, at, title, wrapper, showTooltip) {
  if (!local.open) {
    let position = at || 'top'

    // the current title may have changed
    let currentTitle =
      typeof title === 'function'
        ? title()
        : related.title || related.getAttribute('title') || title
    related.removeAttribute('title')

    // if theres no wrapper, provide a default
    if (wrapper !== undefined) {
      local.content = wrapper(currentTitle, position)
    } else {
      local.currentTitle = currentTitle
      local.content = defaultTooltipStyle
    }

    local.position = position

    local.open = typeof showTooltip === 'function' ? showTooltip() : true
    tooltip.style.setProperty(
      'display',
      typeof showTooltip === 'function' ? (showTooltip() ? 'block' : 'none') : 'block'
    )

    // get coordinates
    let t = tooltip.getBoundingClientRect()
    let r = related.getBoundingClientRect()

    let x, y

    switch (position) {
      case 'bottom': {
        x = r.left + (r.width / 2 - t.width / 2)
        y = r.bottom
        break
      }
      case 'bottom-left': {
        x = r.left - t.width
        y = r.bottom
        break
      }
      case 'bottom-left-overlap': {
        x = r.width + r.left - t.width
        y = r.bottom
        break
      }
      case 'bottom-right': {
        x = r.right
        y = r.bottom
        break
      }
      case 'bottom-right-overlap': {
        x = r.right - r.width
        y = r.bottom
        break
      }
      case 'top-left': {
        x = r.left - t.width
        y = r.top - t.height
        break
      }
      case 'top-left-overlap': {
        x = r.width + r.left - t.width
        y = r.top - t.height
        break
      }
      case 'top-right': {
        x = r.right
        y = r.top - t.height
        break
      }
      case 'top-right-overlap': {
        x = r.right - r.width
        y = r.top - t.height
        break
      }
      case 'left': {
        x = r.left - t.width - 10
        y = r.top + (r.height / 2 - t.height / 2)
        break
      }
      case 'right': {
        x = r.right + 10
        y = r.top + (r.height / 2 - t.height / 2)
        break
      }
      case 'top':
      default: {
        x = r.left + (r.width / 2 - t.width / 2)
        y = r.top - t.height
        break
      }
    }

    // overflow, dont let the tooltip go out of the page
    // margin controls how close to the border it can be
    let margin = 5
    if (x < margin) {
      x = margin
    } else if (x + t.width + margin >= document.body.clientWidth) {
      x = document.body.clientWidth - t.width - margin
    }

    if (y < margin) {
      y = margin
    } else if (y + t.height + margin >= document.body.clientHeight) {
      y = document.body.clientHeight - t.height - margin
    }

    // when it overlaps the element move it from the way
    const overlaps = !(
      x + t.width <= r.left ||
      x >= r.right ||
      y + t.height <= r.top ||
      y >= r.bottom
    )

    if (overlaps) {
      // put it on top
      y = r.top - t.height
      if (y < margin) {
        // if overflows put it on bottom
        y = r.bottom
      }

      // put it on left
      x = r.left
      if (x < margin) {
        // if overflows put it on the right
        x = r.right - t.width
      }
    }
    tooltip.style.setProperty('--x', (x | 0) + 'px')
    tooltip.style.setProperty('--y', (y | 0) + 'px')
  }
}
