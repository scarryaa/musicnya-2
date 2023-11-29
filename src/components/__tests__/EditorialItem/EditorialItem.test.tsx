import { Router } from '@solidjs/router'
import { render, screen } from '@solidjs/testing-library'
import '@testing-library/jest-dom'
import { EditorialItem } from '../../EditorialItem/EditorialItem'

const mockItem = {
  id: '123',
  attributes: {
    name: 'test',
    artwork: {
      url: 'test'
    }
  },
  relationships: {
    contents: {
      data: [
        {
          id: '123',
          type: 'test',
          attributes: {
            name: 'test',
            artwork: {
              url: 'test'
            },
            editorialArtwork: {
              subscriptionHero: {
                url: 'test'
              }
            }
          }
        }
      ]
    }
  }
}

describe('EditorialItem', () => {
  it('renders correctly', () => {
    render(() => (
      <Router>
        <EditorialItem item={mockItem} />
      </Router>
    ))
  })
})
