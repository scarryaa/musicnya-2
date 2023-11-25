import { Artwork, Contents, EditorialNotes } from './common'

export interface Recommendation {
  data: RecommendationData[]
}

export interface RecommendationRelationships {
  contents: Contents
  'primary-content': Contents
}

export interface RecommendationData {
  attributes: RecommendationAttributes
  relationships: RecommendationRelationships
  id: string
  type: string
}

export interface RecommendationAttributes {
  artwork: Artwork
  editorialNotes: EditorialNotes
  name: string
  url: string
}
