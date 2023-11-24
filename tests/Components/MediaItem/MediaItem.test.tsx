import { render, screen, fireEvent } from '@solidjs/testing-library'
import '@testing-library/jest-dom'
import { MediaItem } from '../../../src/components/MediaItem/MediaItem'

// Mock any necessary modules and dependencies
jest.mock('../../../src/api/mkController', () => ({
  playMediaItem: jest.fn()
}))

jest.mock('@solidjs/router', () => ({}))

const mockCloseContextMenu = jest.fn()
jest.mock('../../../src/composables/useContextMenu', () => ({
  useContextMenuState: () => ({
    closeContextMenu: mockCloseContextMenu
  })
}))

const mockOpenContextMenu = jest.fn()
const mockSetContextMenuItems = jest.fn()
jest.mock('../../../src/composables/useContextMenu', () => ({
  useContextMenu: () => ({
    openContextMenu: mockOpenContextMenu,
    setContextMenuItems: mockSetContextMenuItems
  })
}))

describe('MediaItem', () => {
  const defaultProps = {
    src: 'test.jpg',
    title: 'Test Song',
    artists: ['Test Artist'],
    type: 'song',
    id: '1',
    artistId: 'artist1'
  }

  it('renders correctly', () => {
    render(() => <MediaItem {...defaultProps} />)
    expect(screen.getByText('Test Song')).toBeInTheDocument()
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
  })

  it('handles play button click', async () => {
    render(() => <MediaItem {...defaultProps} />)
    const playButton = screen.getByTestId('play-button')
    expect(playButton).toBeInTheDocument()

    // Simulate a click on the play button
    fireEvent.click(playButton)
  })
})
