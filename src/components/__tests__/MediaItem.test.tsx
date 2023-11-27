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

jest.mock('../../composables/useContextMenu')
jest.mock('../../api/MkApiManager.ts')
jest.mock('../../api/MkManager.ts')

useContextMenu.mockReturnValue({
  openContextMenu: jest.fn()
})

useContextMenuState.mockReturnValue({
  closeContextMenu: jest.fn()
})

mkApiManager.getCatalogArtistFromLibrary.mockResolvedValue({
  data: [
    {
      id: '1'
    }
  ]
})

mkManager.processItemAndPlay.mockResolvedValue({
  data: [
    {
      id: '1'
    }
  ]
})

import { MediaItem } from '../MediaItem/MediaItem'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@solidjs/testing-library'
import { Router } from '@solidjs/router'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import { useContextMenu, useContextMenuState } from '../../composables/useContextMenu'
import { mkApiManager } from '../../api/MkApiManager'
import { mkManager } from '../../api/MkManager'

describe('MediaItem', () => {
  test('renders MediaItem component correctly', () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="album"
          id="1"
          artistId="1"
        />
      </Router>
    ))
    expect(screen.getByTestId('play-button')).toBeInTheDocument()
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
  })

  test('renders MediaItem component correctly when isAppleCurator is true', () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="apple-curators"
          id="1"
          artistId="1"
        />
      </Router>
    ))
    const playButton = screen.queryByTestId('play-button')
    expect(playButton).not.toBeInTheDocument()
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
  })

  test('renders MediaItem component correctly when curator and curatorId are present', () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="album"
          id="1"
          artistId="1"
          curator="Curator 1"
          curatorId="1"
        />
      </Router>
    ))
    expect(screen.getByText('Curator 1')).toBeInTheDocument()
  })

  test('renders MediaItem component correctly when releaseYear is present', () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="album"
          id="1"
          artistId="1"
          releaseYear={2021}
        />
      </Router>
    ))
    expect(screen.getByText('2021')).toBeInTheDocument()
  })

  test('renders MediaItem component correctly when releaseYear is not present', () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="album"
          id="1"
          artistId="1"
        />
      </Router>
    ))
    expect(screen.queryByText('2021')).not.toBeInTheDocument()
  })

  test('renders MediaItem component correctly when artistId is present', () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="library-albums"
          id="1"
          artistId="1"
        />
      </Router>
    ))
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
  })

  test('renders MediaItem component correctly when optional props are missing', () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="album"
          id="1"
          artistId="1"
        />
      </Router>
    ))
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
  })

  // style test
  test('adds correct class when isAppleCurator is true', () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="apple-curators"
          id="1"
          artistId="1"
        />
      </Router>
    ))
    const mediaItemLink = screen.getByTestId('media-item-link')
    expect(mediaItemLink).toHaveClass(
      'media-item__inner__artwork__overlay__apple-curator'
    )
  })

  test('right click on media item opens context menu', async () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="album"
          id="1"
          artistId="1"
        />
        <ContextMenu />
      </Router>
    ))

    const mediaItem = screen.getByTestId('media-item')
    fireEvent.contextMenu(mediaItem)

    const { openContextMenu } = useContextMenu()

    await waitFor(() => {
      expect(openContextMenu).toHaveBeenCalledWith(
        expect.anything(),
        '1',
        'mediaItem',
        'album'
      )
    })
  })

  test('click on more button opens context menu', async () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="album"
          id="1"
          artistId="1"
        />
        <ContextMenu />
      </Router>
    ))

    const moreButton = screen.getByTestId('more-button')
    fireEvent.click(moreButton)

    const { openContextMenu } = useContextMenu()

    await waitFor(() => {
      expect(openContextMenu).toHaveBeenCalledWith(
        expect.anything(),
        '1',
        'mediaItem',
        'album'
      )
    })
  })

  test('click on media item opens media item page', async () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="albums"
          id="1"
          artistId="1"
        />
      </Router>
    ))

    const mediaItemLink = screen.getByTestId('media-item-link')
    fireEvent.click(mediaItemLink)

    await waitFor(() => {
      expect(screen.getByText('Artist 1')).toBeInTheDocument()
    })
  })

  test('click on play button calls processItemAndPlay', async () => {
    render(() => (
      <Router>
        <MediaItem
          src="test.jpg"
          artists={['Artist 1']}
          type="album"
          id="1"
          artistId="1"
        />
        <ContextMenu />
      </Router>
    ))

    const playButton = screen.getByTestId('play-button')
    fireEvent.click(playButton)

    await waitFor(() => {
      expect(mkManager.processItemAndPlay).toHaveBeenCalledWith('1', 'album')
    })
  })
})
