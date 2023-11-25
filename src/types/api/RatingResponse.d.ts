interface RatingResponse {
  data: RatingData[]
}

interface RatingData {
  attributes: RatingAttributes
  id: string
  type: string
}

interface RatingAttributes {
  value: number
}
