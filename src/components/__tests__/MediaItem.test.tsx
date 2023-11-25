jest.mock('../../stores/store', () => ({
  setStore: jest.fn(),
  store: {
    app: {
      contextMenu: {
        open: false,
        x: 0,
        y: 0,
        id: '',
        type: null,
        items: [],
        subType: null,
        display: 'none'
      },
      subContextMenu: {
        x: 0,
        y: 0,
        items: [],
        open: false,
        id: '',
        type: ''
      }
    }
  }
}))

jest.mock('../../composables/useContextMenu', () => ({
  useContextMenu: () => ({
    openContextMenu: jest.fn(),
    setContextMenuItems: jest.fn()
  }),
  useContextMenuState: () => ({
    closeContextMenu: jest.fn()
  })
}))

import { MediaItem } from '../MediaItem/MediaItem'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@solidjs/testing-library'
import { Router } from '@solidjs/router'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import { useContextMenu } from '../../composables/useContextMenu'

test('renders MediaItem component correctly', () => {
  render(() => (
    <Router>
      <MediaItem src="test.jpg" artists={['Artist 1']} type="album" id="1" artistId="1" />
    </Router>
  ))
  expect(screen.getByTestId('play-button')).toBeInTheDocument()
  expect(screen.getByText('Artist 1')).toBeInTheDocument()
})

test('right click on media item opens context menu', async () => {
  render(() => (
    <Router>
      <MediaItem src="test.jpg" artists={['Artist 1']} type="album" id="1" artistId="1" />
      <ContextMenu />
    </Router>
  ))

  const mediaItem = screen.getByTestId('media-item')
  fireEvent.contextMenu(mediaItem) // Simulate right-click

  const { openContextMenu } = useContextMenu()

  await waitFor(() => {
    expect(openContextMenu).toHaveBeenCalledWith(
      expect.anything(), // The event object
      '1', // ID
      'album', // Type
      undefined // SubType (if not applicable)
    )
  })
})
