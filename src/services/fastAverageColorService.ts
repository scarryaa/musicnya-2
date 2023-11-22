import { FastAverageColor } from 'fast-average-color'

const fac = new FastAverageColor()

export const fastAverageColorService = {
  getColorFromImage(image, options) {
    return fac.getColor(image, options)
  },

  getColorFromURL(url, options) {
    return fac.getColorAsync(url, options)
  }
}
