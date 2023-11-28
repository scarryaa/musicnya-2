import { Router, useLocation } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { fireEvent, render, screen } from '@solidjs/testing-library'
import '@testing-library/jest-dom'
import { ArtworkOverlay } from '../../ArtworkOverlay/ArtworkOverlay'
import { ArtworkOverlayType } from '../../ArtworkOverlay/Types'

describe('ArtworkOverlay', () => {
  it('renders with PLAY_AND_MORE type', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(screen.queryByTestId('play-button')).toBeInTheDocument()
    expect(screen.queryByTestId('more-button')).toBeInTheDocument()
  })

  it('renders with MORE type', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(screen.queryByTestId('play-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('more-button')).toBeInTheDocument()
  })

  it('renders with NONE type', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.NONE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(screen.queryByTestId('play-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('more-button')).not.toBeInTheDocument()
  })

  it('renders with link', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={true}
          link="/media/albums/1"
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(screen.queryByTestId('artwork-overlay-link')).toBeInTheDocument()
  })

  it('renders with children', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        >
          <div data-testid="children" />
        </ArtworkOverlay>
      </Router>
    ))

    expect(screen.queryByTestId('children')).toBeInTheDocument()
  })

  it('renders with roundBottomCorners', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
          roundBottomCorners={true}
        />
      </Router>
    ))

    expect(screen.queryByTestId('artwork-overlay-link')).toHaveClass(
      'artwork-overlay-link--round-bottom-corners'
    )
  })

  it('renders without roundBottomCorners', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
          roundBottomCorners={false}
        />
      </Router>
    ))

    expect(screen.queryByTestId('artwork-overlay-link')).not.toHaveClass(
      'artwork-overlay-link--round-bottom-corners'
    )
  })

  it('renders with rounded set to true', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
          rounded={true}
          roundBottomCorners={false}
        />
      </Router>
    ))

    expect(screen.queryByTestId('artwork-overlay-link')).toHaveStyle({
      'border-radius': '50%'
    })
  })

  it('renders with rounded set to false', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
          rounded={false}
          roundBottomCorners={false}
        />
      </Router>
    ))

    expect(screen.queryByTestId('artwork-overlay-link')).not.toHaveStyle({
      'border-radius': '50%'
    })
  })

  it('renders with isVisible set to false', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => false}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(screen.queryByTestId('artwork-overlay-link')).toHaveStyle({
      opacity: 0
    })
  })

  it('renders with isVisible set to true', () => {
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(screen.queryByTestId('artwork-overlay-link')).toHaveStyle({
      opacity: 1
    })
  })

  it('calls playClick when play button is clicked', () => {
    const playClick = jest.fn()
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={playClick}
          moreClick={() => {}}
        />
      </Router>
    ))

    screen.getByTestId('play-button').click()
    expect(playClick).toHaveBeenCalledTimes(1)
  })

  it('calls moreClick when more button is clicked', () => {
    const moreClick = jest.fn()
    render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={moreClick}
        />
      </Router>
    ))

    screen.getByTestId('more-button').click()
    expect(moreClick).toHaveBeenCalledTimes(1)
  })

  const TestComponent = () => {
    const location = useLocation()
    const [currentPath, setCurrentPath] = createSignal(location.pathname)

    // Update path on route change
    createEffect(() => {
      setCurrentPath(location.pathname)
    })

    return <div>{currentPath()}</div> // Displays the current path
  }

  it('navigates to /media/albums/1 when link is clicked', async () => {
    render(() => (
      <Router>
        <TestComponent />
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={true}
          link="/media/albums/1"
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    // Click the link
    fireEvent.click(screen.getByTestId('artwork-overlay-link'))

    // Wait for the state to update and the router to navigate
    await new Promise(r => setTimeout(r, 0))

    // Check if the path has changed
    expect(screen.getByText('/media/albums/1')).toBeInTheDocument()
  })

  it('does not navigate when link is clicked and isLink is false', async () => {
    render(() => (
      <Router>
        <TestComponent />
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link="/media/albums/1"
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    // Click the link
    fireEvent.click(screen.getByTestId('artwork-overlay-link'))

    // Wait for the state to update and the router to navigate
    await new Promise(r => setTimeout(r, 0))

    // Check if the path has changed
    expect(screen.getByText('/')).toBeInTheDocument()
  })
})

describe('ArtworkOverlay Snapshot', () => {
  it('matches snapshot with PLAY_AND_MORE type', () => {
    const { container } = render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with MORE type', () => {
    const { container } = render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with NONE type', () => {
    const { container } = render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.NONE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with link', () => {
    const { container } = render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={true}
          link="/media/albums/1"
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        />
      </Router>
    ))

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with children', () => {
    const { container } = render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
        >
          <div data-testid="children" />
        </ArtworkOverlay>
      </Router>
    ))

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with roundBottomCorners', () => {
    const { container } = render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
          roundBottomCorners={true}
        />
      </Router>
    ))

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot without roundBottomCorners', () => {
    const { container } = render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
          roundBottomCorners={false}
        />
      </Router>
    ))

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with rounded set to true', () => {
    const { container } = render(() => (
      <Router>
        <ArtworkOverlay
          type={ArtworkOverlayType.PLAY_AND_MORE}
          isLink={false}
          link=""
          isVisible={() => true}
          playClick={() => {}}
          moreClick={() => {}}
          rounded={true}
          roundBottomCorners={false}
        />
      </Router>
    ))

    expect(container).toMatchSnapshot()
  })
})
