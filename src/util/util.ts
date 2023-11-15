export class Utils {
  static formatTime = (time: number) => {
    // format time to mm:ss from ms
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  static formatTimeHours = (time: number) => {
    // format time to from ms to x hours, xx minutes
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    return `${hours ? hours + ' hours, ' : ''}${minutes} minutes`
  }

  static formatDate = (date: string) => {
    // format date from yyyy-mm-dd to  mm dd, yyyy
    const [year, month, day] = date.split('-')
    return `${this.getMonth(month)} ${day}, ${year}`
  }

  static getMonth = (month: string) => {
    switch (month) {
      case '01':
        return 'Jan'
      case '02':
        return 'Feb'
      case '03':
        return 'Mar'
      case '04':
        return 'Apr'
      case '05':
        return 'May'
      case '06':
        return 'Jun'
      case '07':
        return 'Jul'
      case '08':
        return 'Aug'
      case '09':
        return 'Sep'
      case '10':
        return 'Oct'
      case '11':
        return 'Nov'
      case '12':
        return 'Dec'
      default:
        return ''
    }
  }

  static formatArtworkUrl = (
    url: string,
    size: number,
    format: 'png' | 'jpg' | 'webp' = 'webp',
    crop: 'sr' | 'cc' | 'none' = 'sr'
  ) => {
    return url
      .replace('{w}x{h}', `${size}x${size}`)
      .replace('{f}', format)
      .replace('sr', '')
      .replace('{c}', crop === 'none' ? '' : crop)
  }

  static setDarkMode = (darkMode: boolean) => {
    document.documentElement.setAttribute('theme', darkMode ? 'dark' : 'light')
  }

  static disableContextMenu = () => {
    document.addEventListener('contextmenu', event => event.preventDefault())
  }

  static parseSelectedDefaultPage = (selection: string) => {
    return selection.replace('Listen Now', 'listen').toLowerCase()
  }
}
