import { render, screen } from '@solidjs/testing-library'
import { EditorialItem } from '../../../src/components/EditorialItem/EditorialItem'
import { Router } from '@solidjs/router'
jest.mock('lowdb', () => {
  // Mock implementation or return value
})

describe('EditorialItem', () => {
  const mockItem = {
    attributes: {
      artwork: {
        url: 'https://example.com/image.jpg'
      },
      editorialElementKind: '320',
      link: 'https://example.com'
    },
    relationships: {
      contents: {
        data: [
          {
            attributes: {
              editorialArtwork: {
                subscriptionHero: {
                  url: 'https://example.com/image.jpg'
                },
                superHeroWide: {
                  url: 'https://example.com/image.jpg'
                }
              }
            },
            type: 'apple-curators'
          }
        ]
      }
    }
  }

  test('renders correctly when item is of curator type', () => {
    render(() => (
      <Router>
        <EditorialItem item={mockItem} />
      </Router>
    ))

    // Assert that the item is rendered with the correct content
    expect(screen.getByText('Curator Type')).toBeInTheDocument()
  })
})
