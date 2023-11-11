export class Utils {
  static formatTime = (time: number) => {
    // format time to mm:ss from ms
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  static formatArtworkUrl = (
    url: string,
    size: number,
    format: 'png' | 'jpg' | 'webp' = 'png'
  ) => {
    return url.replace('{w}x{h}', `${size}x${size}`).replace('{f}', format)
  }
}
